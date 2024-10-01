<template>
  <div class="all-recipes">
    <nav>
      <RouterLink :to="{ name: ROUTES.CREATE_RECIPE }">Добавить новый рецепт</RouterLink>
    </nav>
    <RouterView />
    <h2>Страница со всеми рецептами</h2>
    <div class="recipe-card">
      <nav>
        <RouterLink :to="{ name: ROUTES.RECIPE, params: { id: recipe.id } }">{{ recipe.name }}</RouterLink>
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: 'AllRecipesPage',
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('recipes', [
      'getRecipeById'
    ]),
    recipe() {
      return this.getRecipeById(1) || null
    }
  }

}
</script>

<style lang="less" scoped></style>