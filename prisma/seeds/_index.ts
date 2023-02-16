import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seed = async (data: any, type: string) => {
  await prisma.recipes.createMany({ data })
  console.log(`🍲 -> Seeded ${type}`)
}

export default seed
