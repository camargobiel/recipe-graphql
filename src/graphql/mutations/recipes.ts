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
  },

  deleteRecipe: async (_, { input }, prisma: PrismaClient) => {
    const isValidInput = validator.validateInput(input?.id)
    if (!isValidInput) {
      throw new ApolloError('Invalid input for recipe id', 'INVALID_INPUT')
    }
    await prisma.recipes.findUniqueOrThrow({ where: { id: input.id } })

    const deletedRecipe = await prisma.recipes.delete({ where: { id: input.id } })
    return deletedRecipe
  }
}

export default {
  Mutation
}
