interface BaseBindings {
  BUCKET: R2Bucket;

  // 署名付きURL生成用
  R2_ACCOUNT_ID: string;
  R2_BUCKET_NAME: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;

  // CORS設定用
  CORS_ORIGINS: string;

  // その他のバインディングを追加する
}

type Dir = "images" | "videos" | "threes" | "docs";
const extensionToContentType: Record<string, { mime: string; class: Dir }> = {
  png: { mime: "image/png", class: "images" },
  jpg: { mime: "image/jpeg", class: "images" },
  jpeg: { mime: "image/jpeg", class: "images" },
  mp4: { mime: "video/mp4", class: "videos" },
  webm: { mime: "video/webm", class: "videos" },
  mov: { mime: "video/quicktime", class: "videos" },
  avi: { mime: "video/x-msvideo", class: "videos" },
  obj: { mime: "application/octet-stream", class: "threes" },
  fbx: { mime: "application/octet-stream", class: "threes" },
  glb: { mime: "model/gltf-binary", class: "threes" },
  pdf: { mime: "application/pdf", class: "docs" },
  doc: { mime: "application/msword", class: "docs" },
  docx: {
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    class: "docs",
  },
  txt: { mime: "text/plain", class: "docs" },
};

export { type BaseBindings, extensionToContentType };
