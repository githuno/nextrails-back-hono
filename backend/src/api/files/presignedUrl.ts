import { Hono } from "hono";
import { Bindings } from "@/schema/prismaClient";
import { AwsClient } from "aws4fetch";
import { extensionToContentType } from "@/types";

const app = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    // ownerIdとfileExtensionを取得
    const { ownerId, fileExtension } = c.req.query();
    if (!ownerId || !fileExtension) {
      return c.json({ error: "ownerId and fileExtension are required" }, 400);
    }
    // 拡張子に合わせてcontentTypeを設定
    const contentTypeInfo = extensionToContentType[fileExtension];
    if (!contentTypeInfo) {
      return c.json({ error: "Invalid fileExtension" }, 400);
    }

    const endpoint = `https://${c.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${c.env.R2_BUCKET_NAME}`;
    const filename = `${Date.now()}.${fileExtension}`;
    const url = new URL(`${endpoint}/${ownerId}/${contentTypeInfo.type}/${filename}`);

    // 有効期限を1時間に設定
    url.searchParams.set("X-Amz-Expires", "3600");

    const r2 = new AwsClient({
      accessKeyId: c.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: c.env.AWS_SECRET_ACCESS_KEY,
    });

    const signed = await r2.sign(
      new Request(url, {
        method: "PUT",
        headers: {
          "Content-Type": contentTypeInfo.mimeType,
        },
      }),
      {
        aws: { signQuery: true },
      }
    );
    return c.json({ url: signed.url });
  });

export default app;

// -----------------------------------------------------------------------------
// 参考1↓ : car-web-platform
// -----------------------------------------------------------------------------
// export const GET = async (request: NextRequest) =>
//   requireClient(async (user) => {
//     const paths = request.nextUrl.searchParams.get("paths")?.split(",") || []
//     const presignedUrls: string[] = []

//     for (let i = 0; i < paths.length; i++) {
//       const path = paths[i]
//       const extension = path.split(".").pop() || ""
//       const presignedUrl = await generatePresignedUrlToUpload(path, getContentType(extension))
//       presignedUrls.push(presignedUrl)
//     }

//     return NextResponse.json({ presignedUrls: presignedUrls })
//   }, request)

// -----------------------------------------------------------------------------
// 参考2↓ ：https://developers.cloudflare.com/r2/api/s3/presigned-urls/#presigned-url-alternative-with-workers
// -----------------------------------------------------------------------------
// import { AwsClient } from "aws4fetch";

// const r2 = new AwsClient({
//   accessKeyId: "",
//   secretAccessKey: "",
// });

// export default {
//   async fetch(req): Promise<Response> {
//     // This is just an example to demonstrating using aws4fetch to generate a presigned URL.
//     // This Worker should not be used as-is as it does not authenticate the request, meaning
//     // that anyone can upload to your bucket.
//     //
//     // Consider implementing authorization, such as a preshared secret in a request header.
//     const requestPath = new URL(req.url).pathname;

//     // Cannot upload to the root of a bucket
//     if (requestPath === "/") {
//       return new Response("Missing a filepath", { status: 400 });
//     }

//     const bucketName = "";
//     const accountId = "";

//     const url = new URL(
//       `https://${bucketName}.${accountId}.r2.cloudflarestorage.com`
//     );

//     // preserve the original path
//     url.pathname = requestPath;

//     // Specify a custom expiry for the presigned URL, in seconds
//     url.searchParams.set("X-Amz-Expires", "3600");

//     const signed = await r2.sign(
//       new Request(url, {
//         method: "PUT",
//       }),
//       {
//         aws: { signQuery: true },
//       }
//     );

//     // Caller can now use this URL to upload to that object.
//     return new Response(signed.url, { status: 200 });
//   },

//   // ... handle other kinds of requests
// } satisfies ExportedHandler;
