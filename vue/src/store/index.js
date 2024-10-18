import dishes from './dishes'
import ingredients from './ingredients'
import recipes from './recipes'

export default{
  namespaced: true,
  modules: {
    recipes,
    ingredients,
    dishes
  }
}
