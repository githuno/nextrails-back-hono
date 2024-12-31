import { Hono } from "hono";
import fileById from "@/api/files/[id]";
import { getPrismaClient, Bindings } from "@/schema/prismaClient";
import presignedUrl from "@/api/files/presignedUrl";

const app = new Hono<{ Bindings: Bindings }>()
  .route("/presignedUrl", presignedUrl)
  .route("/:id", fileById)

  // GET（管理者用）
  .get("/", async (c) => {
    const prisma = getPrismaClient(c.env);
    const files = await prisma.file.findMany();
    return c.json(files);
  })

  // POST
  .post("/", async (c) => {
    const prisma = getPrismaClient(c.env);
    const { key, filename, contentType, size, metadata } = await c.req.json();
  
    const file = await prisma.file.create({
      data: {
        key,
        filename,
        contentType,
        size,
        metadata,
      },
    });
  
    return c.json(file, 201);
  })


export default app;
