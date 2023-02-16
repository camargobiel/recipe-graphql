import Validators from '@src/validators/validators'

describe('validateInput', () => {
  describe('Valid', () => {
    it('Given a valid string input should return valid', async () => {
      const isValidInput = new Validators().validateInput('this is a valid input')
      expect(isValidInput).toBe(true)
    })

    it('Given a valid number input should return valid', async () => {
      const isValidInput = new Validators().validateInput(10)
      expect(isValidInput).toBe(true)
    })

    it('Given a invalid input should return valid', async () => {
      const isValidInput = new Validators().validateInput(null)
      expect(isValidInput).toBe(false)
    })
  })

  describe('Invalid', () => {
    it('[0] -> Given a invalid input should return invalid', async () => {
      const isValidInput = new Validators().validateInput(null)
      expect(isValidInput).toBe(false)
    })

    it('[1] -> Given a invalid input should return invalid', async () => {
      const isValidInput = new Validators().validateInput(undefined)
      expect(isValidInput).toBe(false)
    })

    it('[2] -> Given a invalid input should return invalid', async () => {
      const isValidInput = new Validators().validateInput('')
      expect(isValidInput).toBe(false)
    })
  })
})

describe('validateManyInputs', () => {
  describe('Valid', () => {
    it('Given a valid input should return valid', async () => {
      const isValidInput = new Validators().validateManyInputs({ title: 'teste', description: 'uhu' })
      expect(isValidInput).toEqual([])
    })
  })

  describe('Invalid', () => {
    it('[0] -> Given a invalid input should return the invalid inputs', async () => {
      const isValidInput = new Validators().validateManyInputs({ title: null, description: 'uhu' })
      expect(isValidInput).toEqual(['title'])
    })

    it('[1] -> Given a invalid input should return the invalid inputs', async () => {
      const isValidInput = new Validators().validateManyInputs({ title: 'uhu', description: null })
      expect(isValidInput).toEqual(['description'])
    })

    it('[0] -> Given both invalid input should return invalid inputs', async () => {
      const isValidInput = new Validators().validateManyInputs({ title: null, description: null })
      expect(isValidInput).toEqual(['title', 'description'])
    })

    it('[1] -> Given both invalid input should return invalid inputs', async () => {
      const isValidInput = new Validators().validateManyInputs({ title: undefined, description: undefined })
      expect(isValidInput).toEqual(['title', 'description'])
    })
  })
})
