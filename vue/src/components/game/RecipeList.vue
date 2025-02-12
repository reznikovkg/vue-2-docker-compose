<template>
  <div class="recipe-list">
    <h3>Доступные рецепты:</h3>
    <ul>
      <li v-for="(recipe, index) in recipes" :key="index">
        {{ recipe.ingredients.join(" + ") }} = {{ recipe.result }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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

h3 {
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
