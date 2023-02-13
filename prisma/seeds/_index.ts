import { Recipe } from './../../src/interfaces/recipe.interface'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const seed = async (data: Recipe[], type: string) => {
  await prisma.recipes.deleteMany()
  await prisma.recipes.createMany({ data })
  console.log(`🍲 -> Seeded ${type}`)
}

export default seed
