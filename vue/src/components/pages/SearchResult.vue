<template>
  <div class="search-result">
    <h2>Результаты поиска по запросу {{ search }}</h2>
    <div class="recipes" v-for="(recipe, indx) in recipes" :key="indx">
      <span v-if="recipe.name.includes(search)">
        <img :src="recipe.steps[0].img"/>
        {{ recipe.name }}
      </span>
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes'
import { mapGetters } from 'vuex';

export default {
  name: 'SearchResultPage',
  computed: {
    ROUTES() {
      return ROUTES
    },
    search() {
      return this.$route.params.search
    },
    ...mapGetters('recipes', {
      recipes: 'getRecipes'
    }),
  },
}
</script>

<style lang="less" scoped></style>