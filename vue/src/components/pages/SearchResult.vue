<template>
  <div class="search-result">

    <div v-if="search" class="seach-by-name">
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

    <div v-if="includeIngredients || excludeIngredients" class="search-by-ingredients">
      <h2>Результаты поиска по ингредиентам</h2>
      <p v-if="includeIngredients.length > 0">Включить: |
        <span v-for="(plus, indx) in includeIngredients" :key="indx">
          {{ getIngredientById(plus).name }} |
        </span>
      </p>
      <p v-if="excludeIngredients.length > 0">Исключить: |
        <span v-for="(minus, indx) in excludeIngredients" :key="indx">
          {{ getIngredientById(minus).name }} |
        </span>
      </p>

      <div class="recipes" v-for="(recipe, indx) in recipes" :key="indx">
        <span v-if="showRecipeFlag(recipe.ingredients)">
          <div class="recipe-card">
            <nav>
              <RouterLink :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }">{{ recipe.name }}</RouterLink>
            </nav>
            <RouterView />
          </div>
          {{ recipe.ingredients }}
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex';

export default {
  name: 'SearchResultPage',
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
    ])
  },
  data() {
    return {
      found: false
    }
  },
  methods: {
    foundTrue() {
      this.found = true
    },
    showRecipeFlag(ingredients) {
      if (this.includeIngredients.length == 0 && this.excludeIngredients.length == 0) {
        return true
      }

      var flagInclude = false
      if (this.includeIngredients.length > 0) {
        for (var i = 0; i < ingredients.length; i++) {
          if (this.includeIngredients.includes(ingredients[i].ingredient_id)) {
            flagInclude = true
          }
        }
      } else {
        flagInclude = true
      }

      var flagExclude = false
      if (this.excludeIngredients.length > 0) {
        for (i = 0; i < ingredients.length; i++) {
          if (this.excludeIngredients.includes(ingredients[i].ingredient_id)) {
            flagExclude = true
          }
        }
      }

      return flagInclude && !flagExclude
    }

  }
}
</script>

<style lang="less" scoped></style>