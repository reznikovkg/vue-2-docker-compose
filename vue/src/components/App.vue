<template>
  <div id="app">
    <div class="search-wrapper">
      <input 
        v-model="search" 
        class="search-input" 
        type="text" 
        placeholder="Искать рецепт..."
        @keyup.enter="() => findByName()" />

      <button class="search-button" @click="() => findByName()">Найти</button>
    </div>
    <nav class="top-nav">
      <RouterLink :to="{ name: ROUTES.HOME }">Главная</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_RECIPES }">Все рецепты</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_INGREDIENTS }">Все ингредиенты</RouterLink> |
    </nav>
    <RouterView />
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes';

export default {
  computed: {
    ROUTES() {
      return ROUTES
    }
  },
  data() {
    return {
      search: ''
    }
  },
  methods: {
    findByName() {
      router.push({ name: ROUTES.SEARCH_RESULT, query: { search: this.search } })
    }
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.top-nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.search-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  width: 630px;
  margin: auto;
}

.search-input {
  padding: 4px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, .12);
  transition: .15s all ease-in-out;
  background: white;
  line-height: 22px;
  font-size: 18px;
  min-width: 500px;

  &:focus {
    outline: none;
  }

  &::-webkit-input-placeholder {
    font-size: 18px;
    color: rgba(0, 0, 0, .50);
    font-weight: 100;
  }
}

.search-button {
  background-color: #9bdfc0;
  border: 1px solid #82b9a0;
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: "Inter var", ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 1rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-color: #7dc7a6;
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }

  &:focus-visible {
    box-shadow: none;
  }
}
</style>
