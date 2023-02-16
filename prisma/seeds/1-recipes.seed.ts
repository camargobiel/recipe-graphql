import seed from './_index'

const recipeSeed = async () => {
  const recipes = [
    {
      title: 'first recipe',
      description: 'this is a recipe'
    },
    {
      title: 'recipe to update',
      description: 'this is a recipe to update'
    },
    {
      title: 'recipe to delete',
      description: 'this is a recipe to delete'
    }
  ]

  await seed(recipes, 'recipes')
}

export default recipeSeed
