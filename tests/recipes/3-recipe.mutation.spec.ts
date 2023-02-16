import request from 'supertest'
import app from '@src/index'

describe('Recipes - Mutations', () => {
  describe('createRecipe', () => {
    describe('Success', () => {
      it('Given the correct input should create a recipe', async () => {
        const response = await request(app)
          .post('/graphql')
          .send({
            query: `#graphql
            mutation Mutation($input: CreateRecipeInput!) {
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
          id: 3,
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
            mutation Mutation($input: CreateRecipeInput!) {
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

  describe('updateRecipe', () => {
    describe('Success', () => {
      it('Given the correct input should update a recipe', async () => {
        const response = await request(app)
          .post('/graphql')
          .send({
            query: `#graphql
            mutation Mutation($input: UpdateRecipeInput!) {
              updateRecipe(input: $input) {
                id
                description
                title
              }
            }`,
            variables: {
              input: {
                id: 1,
                title: 'updated recipe',
                description: 'this recipe was updated by a test'
              }
            }
          })
          .set('Accept', 'application/json')

        expect(response.body.errors).toBe(undefined)
        expect(response.body.data.updateRecipe).toStrictEqual({
          id: 1,
          title: 'updated recipe',
          description: 'this recipe was updated by a test'
        })
      })

      it('Given only the title input should update just the title', async () => {
        const response = await request(app)
          .post('/graphql')
          .send({
            query: `#graphql
            mutation Mutation($input: UpdateRecipeInput!) {
              updateRecipe(input: $input) {
                id
                description
                title
              }
            }`,
            variables: {
              input: {
                id: 2,
                title: 'updated recipe'
              }
            }
          })
          .set('Accept', 'application/json')

        expect(response.body.errors).toBe(undefined)
        expect(response.body.data.updateRecipe).toStrictEqual({
          id: 2,
          title: 'updated recipe',
          description: 'this is a recipe to update'
        })
      })

      it('Given only the description input should update just the title', async () => {
        const response = await request(app)
          .post('/graphql')
          .send({
            query: `#graphql
            mutation Mutation($input: UpdateRecipeInput!) {
              updateRecipe(input: $input) {
                id
                description
                title
              }
            }`,
            variables: {
              input: {
                id: 2,
                description: 'only the description'
              }
            }
          })
          .set('Accept', 'application/json')

        expect(response.body.errors).toBe(undefined)
        expect(response.body.data.updateRecipe).toStrictEqual({
          id: 2,
          title: 'updated recipe',
          description: 'only the description'
        })
      })
    })

    describe('Errors', () => {
      it('Given a inexistent recipe id should throw error', async () => {
        const response = await request(app)
          .post('/graphql')
          .send({
            query: `#graphql
            mutation Mutation($input: UpdateRecipeInput!) {
              updateRecipe(input: $input) {
                id
                description
                title
              }
            }`,
            variables: {
              input: {
                id: 999,
                title: 'this id doesn\'t exists',
                description: 'this id doesn\'t exists'
              }
            }
          })
          .set('Accept', 'application/json')

        expect(response.body.errors[0].extensions.code).toBe('INTERNAL_SERVER_ERROR')
        expect(response.body.errors[0].message).toBe('No recipes found')
        expect(response.body?.data?.updateRecipe).toBe(undefined)
      })
    })
  })
})
