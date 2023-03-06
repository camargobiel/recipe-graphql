import prisma from '@constants/prisma'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './utils/merge-types-and-resolvers'
import express from 'express'
import 'dotenv/config'

const app = express()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      prisma,
      user: async ({ req }) => {
        const user = req?.headers?.user
        return user
      }
    }
  })
  await server.start()

  server.applyMiddleware({ app })

  if (process.env.NODE_ENV === 'test') { return }

  const port = process.env.PORT ?? 3000
  app.listen(port, () => {
    console.log(`🚀 Server ready at localhost:${port}/graphql`)
  })
}

startServer()

export default app
