import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'

const typesArray = loadFilesSync(path.join(__dirname, './graphql/*/**'), { extensions: ['graphql'], recursive: true })
const typeDefs = mergeTypeDefs(typesArray)

const resolversArray = loadFilesSync(path.join(__dirname, './graphql/*/**'), { extensions: ['ts'], recursive: true })
const resolvers = mergeResolvers(resolversArray)

export { typeDefs, resolvers }
