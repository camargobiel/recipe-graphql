import prisma from '@constants/prisma'

const Query = {
  recipes: async () => {
    const recipes = await prisma.recipes.findMany()
    return recipes
  }
}

export default {
  Query
}
