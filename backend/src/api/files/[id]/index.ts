import { Hono } from "hono";
import { getPrismaClient, Bindings } from "@/schema/prismaClient";

const app = new Hono<{ Bindings: Bindings & { BUCKET: R2Bucket } }>()
  // GET
  .get("/", async (c) => {
    const prisma = getPrismaClient(c.env);
    const id = c.req.param("id");

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return c.json({ error: "File not found" }, 404);
    }

    return c.json(file);
  })
  // SOFT DELETE
  .delete("/s", async (c) => {
    const prisma = getPrismaClient(c.env);
    const id = c.req.param("id");

    const file = await prisma.file.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return c.json(file);
  })
  // HARD DELETE（管理者用）
  .delete("/h", async (c) => {
    const prisma = getPrismaClient(c.env);
    const id = c.req.param("id");

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return c.json({ error: "File not found" }, 404);
    }

    // R2バケットからオブジェクトを削除
    const bucket = c.env.BUCKET;
    try {
      await bucket.delete(file.key);
    } catch (error) {
      return c.json({ error: "Failed to delete object from R2" }, 500);
    }

    // データベースからレコードを削除
    await prisma.file.delete({
      where: { id },
    });

    return c.json({ message: "File deleted successfully" });
  });

export default app;
