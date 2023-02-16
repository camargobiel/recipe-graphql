import { Recipe } from '@interfaces/recipe.interface'
import seed from './_index'

const recipeSeed = async () => {
  const recipes: Recipe[] = [
    {
      title: 'first recipe',
      description: 'this is a recipe'
    },
    {
      title: 'recipe to update',
      description: 'this is a recipe to update'
    }
  ]

  await seed(recipes, 'recipes')
}

export default recipeSeed
