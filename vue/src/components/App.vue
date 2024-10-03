<template>
  <div id="app">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.." @keyup.enter="() => submit()" />
      <button @click="() => submit()">Найти
      </button>
    </div>
    <nav>
      <RouterLink :to="{ name: ROUTES.HOME }">Главная</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_RECIPES }">Все рецепты</RouterLink> |
      <RouterLink :to="{ name: ROUTES.ALL_INGREDIENTS }">Все ингредиенты</RouterLink> |
    </nav>
    <RouterView />
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes'

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
    submit() {
      router.push({ name: ROUTES.SEARCH_RESULT, params: { search: this.search } })
    }
  }

}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
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

  input {
    padding: 4px 12px;
    color: rgba(0, 0, 0, .70);
    border: 1px solid rgba(0, 0, 0, .12);
    transition: .15s all ease-in-out;
    background: white;
    line-height: 18px;

    &:focus {
      outline: none;
      transform: scale(1.05);
    }

    &::-webkit-input-placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, .50);
      font-weight: 100;
    }
  }
}
</style>
