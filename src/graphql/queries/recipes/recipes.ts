import { PrismaClient } from '@prisma/client'

const Query = {
  recipes: async (_, __, { prisma }: { prisma: PrismaClient }) => {
    const recipes = await prisma.recipes.findMany()
    return recipes
  },
  recipe: async (_, { input }, { prisma }: { prisma: PrismaClient }) => {
    const recipe = await prisma.recipes.findUniqueOrThrow({ where: { id: input.id } })
    return recipe
  }
}

export default {
  Query
}
