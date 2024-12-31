import { PrismaClient } from "@prisma/client"
// import { faker } from "@faker-js/faker"
// import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // const password = "hutzper"
  // const size = 12
  // const salt = await bcrypt.genSalt(size)
  // const hashedPassword = await bcrypt.hash(password, salt)

  // ユーザーの作成
  const user1 = await prisma.user.create({
    data: {
      id: "11111111-1111-1111-1111-111111111111", // あえて固定値を設定（指定しなければ自動生成される）
      email: "user1@example.com",
      name: "User One",
    },
  })

  const user2 = await prisma.user.create({
    data: {
      id: "22222222-2222-2222-2222-222222222222",
      email: "user2@example.com",
      name: "User Two",
    },
  })

  // 画像セットの作成
  const imageSet1 = await prisma.imageSet.create({
    data: {
      id: "33333333-3333-3333-3333-333333333333",
      name: "ImageSet One",
      ownerId: user1.id,
      status: "DRAFT",
    },
  })

  const imageSet2 = await prisma.imageSet.create({
    data: {
      id: "44444444-4444-4444-4444-444444444444",
      name: "ImageSet Two",
      ownerId: user1.id,
      status: "DRAFT",
    },
  })
      
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
