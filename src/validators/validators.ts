export default class Validators {
  validateInput (input: any) {
    if (Array.isArray(input) || typeof (input) === 'object') { return false }
    return (input && input !== '') || !!input
  }

  validateManyInputs (input: object) {
    const invalidInputs = Object.entries(input).filter((entry) => {
      const value = entry[1]
      const isValid = this.validateInput(value)
      return !isValid
    }).map((value) => value[0])
    return invalidInputs
  }
}
