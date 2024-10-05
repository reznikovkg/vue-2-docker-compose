<template>
  <div class="search-by-details">
    <div class="search-by-details__details">
      <div class="search-by-details__details__detail">
        <label>Включить ингредиенты </label>
        <input 
          v-model="included"
          class="search-input" 
          type="text"  
          placeholder="+ Ингредиент"
          @input="() => formIncludedList()" 
          @keyup.enter="() => include()" 
        />

        <transition-group class="options" name="staggered-fade" tag="ul">
          <li class="options__option" v-for="option in formedIncludedList" :key="option.id" @click="() => include(option)">
            {{ option.name }}
          </li>
        </transition-group>

        <div v-if="includeList.length > 0"> |
          <span v-for="(plus, indx) in includeList" :key="indx">
            {{ getIngredientName(plus) }} |
          </span>
        </div>
      </div>

      <div class="search-by-details__details__detail">
        <label>Исключить ингредиенты </label>
        <input 
          v-model="excluded"
          class="search-input" 
          type="text"  
          placeholder="- Ингредиент"
          @input="() => formExcludedList()" 
          @keyup.enter="() => exclude()" 
        />

        <transition-group class="options" name="staggered-fade" tag="ul">
          <li class="options__option" v-for="option in formedExcludedList" :key="option.id" @click="() => exclude(option)">
            {{ option.name }}
          </li>
        </transition-group>

        <div v-if="excludeList.length > 0"> |
          <span v-for="(minus, indx) in excludeList" :key="indx">
            {{ getIngredientName(minus) }} |
          </span>
        </div>
      </div>
    </div>
    
    <div class="search-by-details__find-button">
      <button class="search-button" @click="() => findByIngredients()">Подобрать рецепты</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: "DetailSearch",
  data() {
    return {
      included: '',
      excluded: '',
      includeList: [],
      excludeList: [],
      formedIncludedList: [],
      formedExcludedList: []
    }
  },
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
  methods: {
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
    getIngredientName(id) {
      return this.getIngredientById(id).name
    }
  }
}
</script>

<style lang="less" scoped>
.search-by-details {
  width: 650px;
  position: relative;
  margin: auto;

  &__details {
    display: flex;
    align-items: flex-start;
    justify-content: center;

    &__detail {
      display: flex;
      flex-direction: column;
      min-width: 300px;
      padding: 20px 20px 0px 20px;

      .search-input {
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
}

.options {
  margin-top: 0;
  right: 0;
  left: 0;
  max-height: 10rem;
  border: 1px solid #f5f5f5;
  padding: 0;
  list-style: none;

  &__option {
    padding: 0.375rem 0.75rem;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}

.staggered-fade {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  &-leave-active {
    position: absolute;
  }
}

</style>
