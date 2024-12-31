import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // ユーザーの確認
  const users = await prisma.user.findMany()
  console.log("Users:", users)

  // 画像セットの確認
  const imageSets = await prisma.imageSet.findMany()
  console.log("ImageSets:", imageSets)

  // ファイルの確認
  const files = await prisma.file.findMany()
  console.log("Files:", files)

  // ファイル添付の確認
  const fileAttachments = await prisma.fileAttachment.findMany()
  console.log("FileAttachments:", fileAttachments)
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