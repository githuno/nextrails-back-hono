// src/index.ts
import { Hono } from "hono";
import users from "@/api/users";
import imagesets from "@/api/imagesets";
import files from "@/api/files";
import { getPrismaClient, Bindings } from "@/schema/prismaClient";

const app = new Hono<{ Bindings: Bindings }>()
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
  })
  ;

export default app;
