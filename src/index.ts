import prisma from '@constants/prisma'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './merge-types-and-resolvers'
import express from 'express'
import 'dotenv/config'

const app = express()

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: prisma
  })
  await server.start()

  server.applyMiddleware({ app })

  const port = process.env.PORT ?? 4000
  app.listen(port, () => {
    console.log(`🚀 Server ready at localhost:${port}/graphql`)
  })
}

startServer()

export default app
