<template>
    <div class="search-result">
      <h2>Страница с результатами поиска</h2>
    </div>
  </template>
  
  <script>
  import { ROUTES } from '@/router/routes';

  export default {
    name: 'SearchResultPage',
    computed: {
    ROUTES () {
      return ROUTES
    },
  }
  }
  </script>
  
  <style lang="less" scoped>
  
  </style>