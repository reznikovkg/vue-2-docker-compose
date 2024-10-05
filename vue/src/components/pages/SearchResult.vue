<template>
  <div class="search-result">

    <div v-if="search" class="search-result__seach-by-name">
      <h2>Результаты поиска по запросу {{ search }}</h2>
      <div class="recipes" v-for="(recipe, indx) in recipes" :key="indx">
        <span v-if="recipe.name.includes(search)">
          <div class="recipe-card">
            <nav>
              <RouterLink :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }">{{ recipe.name }}</RouterLink>
            </nav>
            <RouterView />
          </div>
          {{ foundTrue() }}
        </span>
      </div>
      <h2 v-if="!found">Нет совпадений</h2>
    </div>

    <div v-if="includeIngredients || excludeIngredients" class="search-result__search-by-ingredients">
      <h2>Результаты поиска по ингредиентам</h2>
      <p v-if="includeIngredients.length > 0">Включить: |
        <span v-for="(plus, indx) in includeIngredients" :key="indx">
          {{ getIngredientName(plus) }} |
        </span>
      </p>
      <p v-if="excludeIngredients.length > 0">Исключить: |
        <span v-for="(minus, indx) in excludeIngredients" :key="indx">
          {{ getIngredientName(minus) }} |
        </span>
      </p>

      <span v-if="getRecipesByIngredientLists().length > 0">
        <div class="recipes" v-for="(recipe, indx) in filteredRecipes" :key="indx">
          {{ recipe.name }}
          {{ recipe.ingredients }}
        </div>
      </span>
      <span v-else>Результаты не найдены</span>
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex';

export default {
  name: 'SearchResultPage',
  data() {
    return {
      found: false,
      filteredRecipes: []
    }
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    search() {
      return this.$route.query.search
    },
    includeIngredients() {
      return this.$route.query.include
    },
    excludeIngredients() {
      return this.$route.query.exclude
    },
    ...mapGetters('recipes', {
      recipes: 'getRecipes'
    }),
    ...mapGetters('ingredients', [
      'getIngredientById'
    ]),
    ...mapGetters('recipes', [
      'getRecipesByIngredients'
    ]),

  },
  methods: {
    foundTrue() {
      this.found = true
    },
    getRecipesByIngredientLists() {
      this.filteredRecipes = this.getRecipesByIngredients({
        includeList: this.includeIngredients,
        excludeList: this.excludeIngredients
      })
      return this.filteredRecipes
    },
    getIngredientName(id) {
      return this.getIngredientById(id).name
    },
  }
}
</script>

<style lang="less" scoped></style>
