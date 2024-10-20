<template>
  <div class="create-ingredient">
    <h2>Ингредиенты</h2>
<!--    <div v-for="(ingredient, n) in ingredients" :key="ingredient.id">-->
<!--      <p>-->
<!--        <span class="Ингредиенты">-->
<!--          {{ ingredient.name }}<br>-->
<!--          {{ ingredient.description }}<br>-->
<!--          {{ ingredient.measure_units }}<br>-->
<!--          <img :src="`${ingredient.cover}`"-->
<!--               alt="missing"-->
<!--               height="200px"-->
<!--               width="300px">-->
<!--        </span>-->
<!--        <button @click="removeIngredient(n)">Remove</button>-->
<!--      </p>-->
    <CreateIngredientForm/>
  </div>
</template>

<script>

import CreateIngredientForm from "@/components/parts/CreateIngredientForm.vue";

export default {
  components: {CreateIngredientForm}

}

</script>

<style lang="less" scoped>

</style>
