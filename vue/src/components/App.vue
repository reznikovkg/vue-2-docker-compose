<template>
  <div id="app">
    <div class="search-wrapper">
      <input class="head-input" type="text" v-model="search" placeholder="Искать рецепт..."
        @keyup.enter="() => findByName()" />
      <button @click="() => findByName()">Найти
      </button>
    </div>
    <div class="search-by-ingredient">
      <div class="search-by-ingredient--items">
        <div class="search-by-ingredient--item">
          <label>Включить ингредиенты </label>

          <input class="head-input" type="text" v-model="included" placeholder="+ Ингредиент"
            @input="() => formIncludedList()" @keyup.enter="() => include()" />

          <transition-group name="staggered-fade" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter"
            @leave="leave">
            <li v-for="option in formedIncludedList" :key="option.id" @click="() => include(option)">
              {{ option.name }}
            </li>
          </transition-group>

          <div v-if="includeList.length > 0"> |
            <span v-for="(plus, indx) in includeList" :key="indx">
              {{ getIngredientById(plus).name }} |
            </span>
          </div>
        </div>

        <div class="search-by-ingredient--item">
          <label>Исключить ингредиенты </label>

          <input class="head-input" type="text" v-model="excluded" placeholder="- Ингредиент"
            @input="() => formExcludedList()" @keyup.enter="() => exclude()" />

          <transition-group name="staggered-fade" tag="ul" :css="false" @before-enter="beforeEnter" @enter="enter"
            @leave="leave">
            <li v-for="option in formedExcludedList" :key="option.id" @click="() => exclude(option)">
              {{ option.name }}
            </li>
          </transition-group>

          <div v-if="excludeList.length > 0"> |
            <span v-for="(minus, indx) in excludeList" :key="indx">
              {{ getIngredientById(minus).name }} |
            </span>
          </div>
        </div>
      </div>
      <button @click="() => findByIngredients()">Подобрать рецепты</button>
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
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';
import { gsap } from 'gsap';

export default {
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('ingredients', {
      ingredients: 'getIngredients'
    }),
    ...mapGetters('ingredients', [
      'getIngredientById'
    ])
  },
  data() {
    return {
      search: '',
      included: '',
      excluded: '',
      includeList: [],
      excludeList: [],
      formedIncludedList: [],
      formedExcludedList: []
    }
  },
  methods: {
    findByName() {
      router.push({ name: ROUTES.SEARCH_RESULT, query: { search: this.search } })
    },
    formIncludedList() {
      this.formedIncludedList = this.ingredients.filter(item => {
        return item.name.toLowerCase().indexOf(this.included.toLowerCase()) !== -1
      })
      this.formedIncludedList = this.formedIncludedList.filter(item => {
        return !this.excludeList.includes(item.id) && !this.includeList.includes(item.id)
      })
    },
    formExcludedList() {
      this.formedExcludedList = this.ingredients.filter(item => {
        return item.name.toLowerCase().indexOf(this.excluded.toLowerCase()) !== -1
      })
      this.formedExcludedList = this.formedExcludedList.filter(item => {
        return !this.excludeList.includes(item.id) && !this.includeList.includes(item.id)
      })
    },
    include(option = null) {
      if (option) {
        this.includeList.push(Number(option.id))
      }
      else {
        this.formIncludedList()
        if (this.formedIncludedList.length == 1) {
          this.includeList.push(Number(this.formedIncludedList[0].id))
        }
      }
      console.log(this.includeList)
      this.included = ''
    },
    exclude(option = null) {
      if (option) {
        this.excludeList.push(Number(option.id))
      }
      else {
        this.formExcludedList()
        if (this.formedExcludedList.length == 1) {
          this.excludeList.push(Number(this.formedExcludedList[0].id))
        }
      }
      console.log(this.excludeList)
      this.excluded = ''
    },
    findByIngredients() {
      router.push({
        name: ROUTES.SEARCH_RESULT,
        query: { include: this.includeList, exclude: this.excludeList }
      })
      this.includeList = []
      this.excludeList = []
    },
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done
      })
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
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-around;
  width: 630px;
  margin: auto;
}

.head-input {
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

button {
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

.search-by-ingredient {
  width: 650px;
  position: relative;
  margin: auto;

  &--items {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  &--item {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    padding: 20px 20px 0px 20px;

    .head-input {
      line-height: 18px;
      min-width: 250px;

      &:focus {
        transform: scale(1.05);
      }

      &::-webkit-input-placeholder {
        font-size: 14px;
      }
    }
  }
}
</style>
