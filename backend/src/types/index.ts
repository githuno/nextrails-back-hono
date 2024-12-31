interface BaseBindings {
  BUCKET: R2Bucket;

  // 署名付きURL生成用
  R2_ACCOUNT_ID: string;
  R2_BUCKET_NAME: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;

  // その他のバインディングを追加する
}

type ContentType = "Image" | "Video" | "ThreeD" | "Docs";
const extensionToContentType: Record<string, { mimeType: string, type: ContentType }> = {
  png: { mimeType: "image/png", type: "Image" },
  jpg: { mimeType: "image/jpeg", type: "Image" },
  jpeg: { mimeType: "image/jpeg", type: "Image" },
  mp4: { mimeType: "video/mp4", type: "Video" },
  mov: { mimeType: "video/quicktime", type: "Video" },
  avi: { mimeType: "video/x-msvideo", type: "Video" },
  obj: { mimeType: "application/octet-stream", type: "ThreeD" },
  fbx: { mimeType: "application/octet-stream", type: "ThreeD" },
  glb: { mimeType: "model/gltf-binary", type: "ThreeD" },
  pdf: { mimeType: "application/pdf", type: "Docs" },
  doc: { mimeType: "application/msword", type: "Docs" },
  docx: { mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", type: "Docs" },
  txt: { mimeType: "text/plain", type: "Docs" },
};

export { type BaseBindings, extensionToContentType };
