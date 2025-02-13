<template>
  <div class="recipe-list">
    <h3 class="recipe-list__title">Доступные рецепты:</h3>
    <ul>
      <li v-for="(recipe, index) in recipes" :key="index">
        {{ recipe.ingredients.join(" + ") }} = {{ recipe.result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecipeList",
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-list {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  width: 80%;
}

.recipe-list__title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}
</style>
