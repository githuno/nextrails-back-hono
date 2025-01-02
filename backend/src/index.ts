import { Hono } from "hono";
import { cors } from "hono/cors";
import users from "@/api/users";
import imagesets from "@/api/imagesets";
import files from "@/api/files";
import { getPrismaClient, Bindings } from "@/schema/prismaClient";

const app = new Hono<{ Bindings: Bindings }>()
  .use(
    "/api/*",
    cors({
      origin: (origin, c) => {
        const corsOrigins = c.env.CORS_ORIGINS;
        const allowedOrigins = [
          ...corsOrigins.split(",").map((origin: string) => origin.trim()),
        ];
        if (allowedOrigins.includes(origin)) {
          return origin;
        }
        return null;
      },
      allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
      allowMethods: ["POST", "GET", "PUT", "PATCH", "DELETE", "OPTIONS"],
      exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
      maxAge: 600,
      credentials: true,
    })
  )
  .route("/api/users", users)
  .route("/api/imagesets", imagesets)
  .route("/api/files", files)
  .get("/", (c) => c.json({ message: "Hello, Hono!" }))
  .get("/db", async (c) => {
    const prisma = getPrismaClient(c.env);

    const users = await prisma.user.findMany();
    return c.json(users);
  })
  .get("/r2", async (c) => {
    const bucket = c.env.BUCKET;
    try {
      const objects = await bucket.list();
      return c.json(objects);
    } catch (error: any) {
      return c.json({ error: error.message }, 500);
    }
  });
export default app;
