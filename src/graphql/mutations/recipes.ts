import { PrismaClient } from '@prisma/client'
import Validators from '../../validators/validators'
import { ApolloError } from 'apollo-server-express'
const validator = new Validators()

const Mutation = {
  createRecipe: async (_, { input }, prisma: PrismaClient) => {
    const invalidInputs = validator.validateManyInputs(input)
    if (invalidInputs?.length) {
      throw new ApolloError(`Invalid inputs for fields: ${invalidInputs}`, 'INVALID_INPUT')
    }

    const recipe = await prisma.recipes.create({
      data: {
        title: input.title,
        description: input.description
      }
    })
    return recipe
  },

  updateRecipe: async (_, { input }, prisma: PrismaClient) => {
    const invalidInputs = validator.validateManyInputs(input)
    if (invalidInputs?.length) {
      throw new ApolloError(`Invalid inputs for fields: ${invalidInputs}`, 'INVALID_INPUT')
    }
    await prisma.recipes.findUniqueOrThrow({ where: { id: input.id } })

    const updatedRecipe = await prisma.recipes.update({
      data: {
        title: input?.title,
        description: input?.description
      },
      where: {
        id: input.id
      }
    })
    return updatedRecipe
  }
}

export default {
  Mutation
}
