import request from 'supertest'
import app from '@src/index'

describe('Recipes - Mutations', () => {
  describe('Success', () => {
    it('Given the correct input should create a recipe', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `#graphql
          mutation Mutation($input: RecipeCreateInput!) {
            createRecipe(input: $input) {
              id
              description
              title
            }
          }`,
          variables: {
            input: {
              title: 'test recipe',
              description: 'this recipe is created by a test'
            }
          }
        })
        .set('Accept', 'application/json')

      expect(response.body.errors).toBe(undefined)
      expect(response.body.data.createRecipe).toStrictEqual({
        description: 'this recipe is created by a test',
        id: 2,
        title: 'test recipe'
      })
    })
  })

  describe('Errors', () => {
    it('Given the incorrect input should throw a error', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `#graphql
          mutation Mutation($input: RecipeCreateInput!) {
            createRecipe(input: $input) {
              id
              description
              title
            }
          }`,
          variables: {
            input: {
              title: '',
              description: 'this recipe is created by a test'
            }
          }
        })
        .set('Accept', 'application/json')

      expect(response.body.errors[0].extensions.code).toBe('INVALID_INPUT')
      expect(response.body.errors[0].message).toBe('Invalid inputs for fields: title')
      expect(response.body?.data?.createRecipe).toBe(undefined)
    })
  })
})
