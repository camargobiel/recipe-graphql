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
          id: 1,
          description: 'this is a recipe',
          title: 'first recipe'
        }
      ])
    })
  })
})
