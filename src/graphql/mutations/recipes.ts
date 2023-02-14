import { PrismaClient } from '@prisma/client'

const Mutation = {
  createRecipe: async (_, { input }, prisma: PrismaClient) => {
    const recipe = await prisma.recipes.create({
      data: {
        title: input.title,
        description: input.description
      }
    })
    return recipe
  }
}

export default {
  Mutation
}
