<template>
    <div class="all-ingredients">
      <nav>
        <RouterLink :to="{ name: ROUTES.CREATE_INGREDIENT }">Добавить новый ингредиент</RouterLink>
      </nav>
      <RouterView/>
      <h2>Страница со всеми ингредиентами</h2>
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
  }
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>