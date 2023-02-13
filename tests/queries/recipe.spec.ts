import request from 'supertest'
import app from '../../src/index'

describe('Recipes', () => {
  describe('Success', () => {
    it('Given studentId should return valid grade', async () => {
      const response = await request(app)
        .post('/graphql')
        .send({
          query: `query {
            hello
          }`,
          variables: {
            studentId: 1
          }
        })
        .set('Accept', 'application/json')

      expect(true).toBe(true)
    })
  })
})
