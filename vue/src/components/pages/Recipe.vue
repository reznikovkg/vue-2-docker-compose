<template>
  <div v-if="recipe" class="recipe">
    <div>
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
    </div>

    <div class="recipe-info">
      <div>
        <img class="recipe-pic" v-bind:src="recipe.cover" v-bind:alt="recipe.name">
      </div>      
      <div class="text-container">
        <p>{{ recipe.time }} мин</p>
        <h3>Ингредиенты</h3>
        <ul v-for="itemInfo in recipe.ingredients" :key="itemInfo.ingredient_id">
          <li>{{ getIngredientName(itemInfo) }} ..... {{ itemInfo.amount }} {{ getIngredientMeasureUnit(itemInfo) }}</li>
        </ul>
      </div>
    </div>

    <h2>Инструкция приготовления</h2>
    <div>
      <h4>Подготовка</h4>
      <p>{{ recipe.preparation_step }}</p>
    </div>

    <div class="recipe-steps">
      <div class="step" v-for="(step, index) in recipe.steps" :key="index">
        <div>
          <img class="step-pic" v-bind:src="step.img">
        </div>
        <div class="text-container">
          <h4> Шаг {{ index + 1 }} из {{ recipe.steps.length }}</h4>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <h2 v-else> Указанный рецепт отсутствует :c</h2>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RecipePage',
  computed: {
    ...mapGetters('recipes', [
      'getRecipeById'
    ]),
    ...mapGetters('ingredients', [
      'getIngredientById'
    ]),
    recipe() {
      return this.getRecipeById(this.$route.params.id) || null
    }
  },
  methods: {
    getIngredientName(ingredientInfo) {
      return this.getIngredientById(ingredientInfo.ingredient_id).name
    },
    getIngredientMeasureUnit(ingredientInfo) {
      return this.getIngredientById(ingredientInfo.ingredient_id).measure_unit
    }
  }
}
</script>

<style lang="less" scoped>
.recipe {
  text-align: left;
  padding: 5%;
}

.recipe-info {
  width: 100%;
  display: flex;
}

.recipe-pic {
  width: 280px;
  height: 280px;
  border-radius: 4%;
  object-fit: cover;
}

.ingredients {
  display: inline-block;
}

.recipe-steps {
  width: 100%;
  display: grid;
}

.step {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;
}

.step-pic {
  width: 330px;
  height: 330px;
  border-radius: 4%;
  object-fit: cover;
}

.text-container {
  margin: 0px 7px 0px 7px;
  padding: 0px 10px 0px 20px; 
}
</style>