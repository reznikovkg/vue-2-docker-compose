import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/pages/Home.vue'
import RecipePage from '@/components/pages/Recipe.vue'
import AllRecipesPage from '@/components/pages/AllRecipes.vue'
import AllIngredientsPage from '@/components/pages/AllIngredients.vue'
import CreateRecipePage from '@/components/pages/CreateRecipe.vue'
import CreateIngredientPage from '@/components/pages/CreateIngredient.vue'
import SearchResultPage from '@/components/pages/SearchResult.vue'

import { ROUTES } from './routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: ROUTES.HOME,
    component: HomePage
  },
  {
    path: '/all-recipes/:id',
    name: ROUTES.RECIPE,
    component: RecipePage
  },
  {
    path: '/all-recipes',
    name: ROUTES.ALL_RECIPES,
    component: AllRecipesPage
  },
  {
    path: '/all-ingredients',
    name: ROUTES.ALL_INGREDIENTS,
    component: AllIngredientsPage
  },
  {
    path: '/all-recipes/create-recipe',
    name: ROUTES.CREATE_RECIPE,
    component: CreateRecipePage
  },
  {
    path: '/all-ingredients/create-ingredient',
    name: ROUTES.CREATE_INGREDIENT,
    component: CreateIngredientPage
  },
  {
    path: '/search/:search',
    name: ROUTES.SEARCH_RESULT,
    component: SearchResultPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
