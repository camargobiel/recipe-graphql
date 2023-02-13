import request from 'supertest'
import app from '../../src/index'

describe('Recipes', () => {
  describe('Success', () => {
    it('Query for all recipes', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `query Recipes {
            recipes {
              id
              description
              title
            }
          }`
        })
        .set('Accept', 'application/json')

      expect(response.body.errors).toBe(undefined)
      expect(response.body.data.recipes).toStrictEqual([
        {
          id: 5,
          description: 'this is a recipe',
          title: 'first recipe'
        }
      ])
    })

    it('Query for one recipe', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `query Recipes($input: RecipeInput!) {
            recipe(input: $input) {
              description
              id
              title
            }
          }`,
          variables: {
            input: {
              id: 5
            }
          }
        })
        .set('Accept', 'application/json')

      expect(response.body.errors).toBe(undefined)
      expect(response.body.data.recipe).toStrictEqual({
        id: 5,
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
          query: `query Recipes($input: RecipeInput!) {
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
