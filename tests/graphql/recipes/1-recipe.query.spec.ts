import request from 'supertest'
import app from '../../../src/index'

describe('Recipes', () => {
  describe('Success', () => {
    it('Query for one recipe', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `#graphql
          query Recipes($input: RecipeInput!) {
            recipe(input: $input) {
              description
              id
              title
            }
          }`,
          variables: {
            input: {
              id: 1
            }
          }
        })
        .set('Accept', 'application/json')

      expect(response.body.errors).toBe(undefined)
      expect(response.body.data.recipe).toStrictEqual({
        id: 1,
        description: 'this is a recipe',
        title: 'first recipe'
      })
    })
  })

  describe('Errors', () => {
    it('Query for one recipe with invalid ID should return error', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `#graphql
          query Recipes($input: RecipeInput!) {
            recipe(input: $input) {
              description
              id
              title
            }
          }`,
          variables: {
            input: {
              id: 0
            }
          }
        })
        .set('Accept', 'application/json')

      expect(response.body.errors[0].message).toBe('No recipes found')
      expect(response.body.errors[0].extensions.exception.name).toBe('NotFoundError')
    })
  })
})
