<template>
  <div class="create-ingredient">
    <h2>Ингредиенты</h2>
    <div v-for="(ingredient, n) in ingredients" :key="ingredient.id">
      <p>
        <span class="Ингредиенты">{{ ingredient }}</span>
        <button @click="removeIngredient(n)">Remove</button>
      </p>
    </div>

    <div>
      <input v-model="newIngredient.name">
      <input v-model="newIngredient.cover">
      <input v-model="newIngredient.description">
      <input v-model="newIngredient.measure_units">
      <button @click="addIngredient">Добавить Ингредиент</button>
    </div>
  </div>
</template>

<script>

import Vue from "vue";

export default {
  name: 'CreateIngredientPage',
  data() {
    return {
      ingredients: [],
      newIngredient: {
        name: "",
        cover: "",
        description: "",
        measure_units: "",
      }
    }
  },
  mounted() {
    console.log(localStorage.key(0))
    if (localStorage.getItem('ingredients')) {
      try {
        this.ingredients = JSON.parse(localStorage.getItem('ingredients'));
      } catch(e) {
        localStorage.removeItem('ingredients');
      }
    }
  },
  methods: {
    addIngredient() {
      // ensure they actually typed something
      if (!this.newIngredient) {
        return;
      }

      this.ingredients.push(Vue.util.extend({}, this.newIngredient));
      this.saveIngredient();
    },
    removeIngredient(x) {
      this.ingredients.splice(x, 1);
      this.saveIngredient();
    },
    saveIngredient() {
      const parsed = JSON.stringify(this.ingredients);
      localStorage.setItem('ingredients', parsed);
    }
  }

}
</script>

<style lang="less" scoped></style>