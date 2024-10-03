<template>
    <div class="all-ingredients">
      <nav>
        <RouterLink :to="{ name: ROUTES.CREATE_INGREDIENT }">Добавить новый ингредиент</RouterLink>
      </nav>
      <RouterView/>
      <h2>Страница со всеми ингредиентами</h2>
      <div v-for="(ingredient) in ingredients" :key="ingredient.id">
        <p>
          <span class="Ингредиенты">{{ ingredient }}</span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ROUTES } from '@/router/routes';
  export default {
    name: 'AllIngredientsPage',
    computed: {
    ROUTES () {
      return ROUTES
      },
    },
    data() {
      return {
        ingredients: [],
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
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>