import { PrismaClient } from "@prisma/client/edge";
import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { withAccelerate } from "@prisma/extension-accelerate";

interface BaseBindings {
  DB: PrismaClient;
  // その他のバインディングを追加する
}

let prisma: PrismaClient;

// D1
interface D1Bindings {
  DB: D1Database;
}

// COCKROACHDB | Neon | PostgreSQL
interface OtherBindings extends BaseBindings {
  DB: PrismaClient;
}

type Bindings = D1Bindings | OtherBindings;

const getPrismaClient = (env: any) => {
  if (!prisma) {
    if (env.DB_TYPE === "D1") {
      const adapter = new PrismaD1(env.DB);
      prisma = new PrismaClient({ adapter });
    } else if (env.DB_TYPE === "COCKROACHDB") {
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL,
          },
        },
      }).$extends(withAccelerate());
    } else {
      // postgresql ： 未検証
      const adapter = new PrismaPg(
        new Pool({ connectionString: env.DATABASE_URL })
      );
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: env.DATABASE_URL,
          },
        },
        adapter,
      });
    }
  }
  return prisma;
};

export { Bindings, getPrismaClient };
