<template>
  <div class="create-ingredient">
    <h2>Ингредиенты</h2>
    <div v-for="(ingredient, n) in ingredients" :key="ingredient.id">
      <p>
        <span class="Ингредиенты">
          {{ ingredient.name }}<br>
          {{ ingredient.description }}<br>
          {{ ingredient.measure_units }}<br>
          <img :src="`${ingredient.cover}`"
               alt="missing"
               height="200px"
               width="300px">
        </span>
        <button @click="removeIngredient(n)">Remove</button>
      </p>
    </div>
    <div class="add-ingredient">
      <form>
        <label>Name:</label>
        <input type="text" v-model="newIngredient.name"><br>
        <label>Description:</label>
        <input type="text" v-model="newIngredient.description"><br>
        <label>Measure units:</label>
        <input type="text" v-model="newIngredient.measure_units"><br>
        <label>Cover:</label>
        <input @change="loadTextFromFile" class="custom-input" type="file" accept="image/*"><br><br>
        <button type="submit" @click="addIngredient">Добавить Ингредиент</button>
      </form>
    </div>
  </div>
</template>

<script>

import Vue from "vue";

export default {
  name: 'CreateIngredientPage',
  data() {
    return {
      text: "",
      ingredients: [],
      images: [],
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
    },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = e => this.newIngredient.cover = e.target.result;
      reader.readAsDataURL(file);
    },
  }
}

</script>

<style lang="less" scoped>

.add-ingredient {
  margin: auto;
  width: 50%;
  clear: both;
}

.add-ingredient input {
  margin: auto;
  width: 100%;
  clear: both;
}

</style>
