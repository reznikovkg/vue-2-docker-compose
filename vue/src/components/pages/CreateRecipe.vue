<template>
  <div class="create-recipe">
    <h2>Страница добавления нового рецепта</h2>
    <RecipeComponentsSearch/>
  </div>
</template>

<script>
import RecipeComponentsSearch from '../parts/RecipeComponentsSearch.vue';

export default {
  name: 'CreateRecipePage',
  components: {
    RecipeComponentsSearch
  }

}
</script>

<style lang="less" scoped></style>
