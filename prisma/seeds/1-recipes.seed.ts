import { Recipe } from './../../src/interfaces/recipe.interface'
import seed from './_index'

const recipeSeed = async () => {
  const recipes: Recipe[] = [
    {
      title: 'first recipe',
      description: 'this is a recipe'
    }
  ]

  await seed(recipes, 'recipes')
}

export default recipeSeed
