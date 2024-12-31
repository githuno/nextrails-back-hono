// src/index.ts
import { Hono } from "hono";
import users from "@/api/users";
import imagesets from "@/api/imagesets";
import { getPrismaClient, Bindings } from "@/schema/prismaClient";

const app = new Hono<{ Bindings: Bindings }>()
  .route("/api/users", users)
  .route("/api/imagesets", imagesets)
  .get("/hello", async (c) => {
    const prisma = getPrismaClient(c.env);

    const users = await prisma.user.findMany();
    return c.json(users);
  });

export default app;
