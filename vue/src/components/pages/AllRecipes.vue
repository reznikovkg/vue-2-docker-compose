<template>
  <div class="recipes">
    <nav>
      <RouterLink :to="{ name: ROUTES.CREATE_RECIPE }">Добавить новый рецепт</RouterLink>
    </nav>
    <RouterView />
    <h2>Страница со всеми рецептами</h2>
    <div class="recipes-container">
      <RecipeComponent 
        v-for="recipe in recipesToShow" 
        :key="recipe.id"
        :recipe="recipe"
      />
      <RouterView />
    </div>
    <PaginationComponent 
      :items="recipes" 
      :maxVisiblePages="5" 
      :maxItemsPerPage="this.maxItemsPerPage"
      @changePage="(page) => changePage(page)" 
    />
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';
import RecipeComponent from '../parts/RecipeComponent.vue';
import PaginationComponent from '../parts/PaginationComponent.vue';

export default {
  name: 'AllRecipesPage',
  components: {
    RecipeComponent,
    PaginationComponent
  },
  data() {
    return {
      maxItemsPerPage: 5,
      recipesOnPage: [],
    }
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('recipes', {
      recipes: 'getRecipes'
    }),
    recipesToShow() {
      let recipesToReturn = this.recipesOnPage

      if(this.recipesOnPage.length == 0) {
        recipesToReturn = this.recipes.slice(0, this.maxItemsPerPage)
      }

      return recipesToReturn
    }
  },
  methods: {
    changePage(page) {
      this.recipesOnPage = this.recipes.slice((page - 1) * this.maxItemsPerPage, page * this.maxItemsPerPage)
    },
    getRecipesForPage(page) {
      this.recipesToShow = this.recipes.slice((page - 1) * this.maxItemsPerPage, this.maxItemsPerPage)

      return this.recipesToShow
    }
  }
}
</script>

<style lang="less" scoped>
.recipes {
  display: flex;
  flex-direction: column;

  &-container {
    display: flex;
    flex-direction: column;
    border-radius: 5px 5px 0 0;
    align-items: center;
  }
}
</style>
