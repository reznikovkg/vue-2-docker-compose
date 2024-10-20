<template>
<div class="create-recipe">
  <h2>Страница добавления нового рецепта</h2>
  
  
  <!-- Блок с информацией о рецепте: название и описание -->
  <div class = "recipe-information"> 

    <div class="recipe-name">
      <label class="recipe-name__title">Название рецепта*</label>
      <input class="recipe-name__input" v-model="newRecipe.name" type="text" placeholder="Например: лимонный пирог"/>
    </div>

    <div class="recipe-description">
      <label class="recipe-description__text">Описание рецепта*</label>
      <textarea class="recipe-description__input" v-model="newRecipe.description" type="text" placeholder="Кратко опишите особенность Вашего рецепта, каким будет готовое блюдо?"></textarea>
    </div>
  </div>



  <!-- Блок с инофрмацией о блюде: категория, название, кухня -->
  <label class="dish-classification-title">Классификация блюда</label>

  <div class = "dish-classification"> 

    <div class="dish-category">
      <label class="dish-category__title">Категория блюда*</label>
      <input class="dish-category__input" v-model="inputCategory" type="text" placeholder="Например: Салаты"
      @input="() => formCategoryList()" 
      @click="() => selectCategory()" />
      <transition-group class="select" name="staggered-fade" tag="ul">
        <li class="select__selected" 
        v-for="(dishSelect, i) in categoryList" 
        :key="i" 
        @click="selectCategory(dishSelect), inputCategory = dishSelect">
          {{ dishSelect }}
        </li> 
      </transition-group>
    </div>
    
    <div class="dish-name">
      <label class="dish-name__title">Название блюда*</label>
      <input class="dish-name__input" v-model="inputName"  type="text" placeholder="Например: Паста"
      @input="() => formNameList()" 
      @click="() => selectName()" />
      <transition-group class="select" name="staggered-fade" tag="ul">
        <li class="select__selected" 
        v-for="(dishSelect, i) in nameList" 
        :key="i" 
        @click="selectName(dishSelect), inputName = dishSelect">
          {{ dishSelect }}
        </li>
      </transition-group>
    </div>

    <div class="dish-cuisine">
      <label class="dish-cuisine__title">Национальная кухня</label>
      <input class="dish-cuisine__input" v-model="inputCuisine" type="text" placeholder="Например: Английская кухня"
      @input="() => fromCuisineList()" 
      @click="() => selectCuisine()" />
      <transition-group class="select" name="staggered-fade" tag="ul">
        <li class="select__selected" 
        v-for="(dishSelect, i) in cuisineList" 
        :key="i" 
        @click="selectCuisine(dishSelect), inputCuisine = dishSelect">
          {{ dishSelect }}
        </li> 
      </transition-group>
    </div>
  </div>
   
  <!-- Блок с ингридиентами -->
  <label class="ingridients-title">Ингредиенты</label>
  <div class="ingridients">
    <input class="ingridients__input" v-model="inputIngridients" type="text" placeholder="Например: яблоко или рис" 
    @input="() => formIncludedList()" 
    @click="() => include()" />
    
    <transition-group class="select" name="staggered-fade" tag="ul">
      <li class="select__selected" 
      v-for="select in formedIncludedList" 
      :key="select.id" 
      @click="() => include(select)">
        {{ select.name }}
      </li>
    </transition-group>
      
    <div class="ingridients-output" v-if="newRecipe.ingredients.length > 0">
      <label class="ingridients-output__element" v-for="(plus, indx) in newRecipe.ingredients" 
      :key="indx">
        {{ getIngredientName(plus) }} 
        <button class="ingridients-output__element__delete" @click="removeIngredientName(indx)" type="button">Удалить ингредиент</button> <br>
      </label>
    </div>
  </div>


  <!-- Блок c шагами -->
  <label class = "cooking-instructions-title">Инструкция приготовления</label>
  
  <div>
    <div class="cooking-instructions-block" v-for="counter in stepRows" :key="counter">
      <div class="cooking-instructions">
        <label class="cooking-instructions__text">Шаг {{ counter }}</label>
        <textarea class="cooking-instructions__input" v-model="newRecipe.steps[counter - 1]" placeholder="Например: Почистите овощи, вскипятите воду"></textarea>
      </div>
    </div>
    <button class="cooking-instructions-batton" @click="addNewStep">Добавить шаг</button>
  </div>

  

  <!-- Кноака создания рецепта -->
   <button class="add-batton" @click="addRecipe">Создать рецепт</button>
  

  <!-- вывод -->
  <div v-for="(recipe, n) in recipes" :key="recipe.id">
    <p>
      <span class="Рецепты">{{ recipe }}</span>
      <button @click="removeRecipe(n)">Remove</button>
    </p>
  </div>
</div>

</template>

<script>
import Vue from "vue";
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: 'CreateRecipePage',
    data() {
    return {

      //ингредиенты
      inputIngridients: '',
      formedIncludedList: [],
      stepRows: 1,

      //категория блюда, название блюда и кухня
      inputCategory: '',
      inputName: '',
      inputCuisine: '',
      categoryList: [],
      nameList: [],
      cuisineList: [],

      //новый рецепт
      newRecipe: {
        name: "",
        cover: "",
        description: "",
        dishCategory: "",
        dishName: "",
        nationalCuisine: "",
        ingredients: [],
        steps: []
      }
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
    ]),

    ...mapGetters('dishes', [
      'getDishNamesByCategory'
    ]),
    ...mapGetters('dishes', {
      dishCategories: 'getDishCategories',
      dishNames: 'getDishNames',
      dishCuisines: 'getDishCuisines'
    }),

    ...mapGetters('recipes', {
      recipes: 'getRecipes'
  })
  },

  methods: {
    //методы для добавления рецепта
    addRecipe() {
      if (!this.newRecipe) {
        return;
      }
      console.log(this.newRecipe)
      this.recipes.push(Vue.util.extend({}, this.newRecipe));
      this.saveRecipe();
    },

    removeIngredientName(x) {
      this.newRecipe.ingredients.splice(x, 1);
    },
    
    removeRecipe(x) {
      this.recipes.splice(x, 1);
      this.saveRecipe();
    },

    saveRecipe() {
      const parsed = JSON.stringify(this.recipes);
      localStorage.setItem('recipes', parsed);
    },

    addNewStep() {
      this.stepRows++;
    },

    //методы для получения ингредиентов
    formIncludedList() {
      this.formedIncludedList = this.ingredients.filter(item => {
        return item.name.toLowerCase().indexOf(this.inputIngridients.toLowerCase()) !== -1
      })

      this.formedIncludedList = this.formedIncludedList.filter(item => {
        return !this.newRecipe.ingredients.includes(item.id)
      })
    },

    include(option = null) {
      if (option) {
        this.newRecipe.ingredients.push(Number(option.id))
      }

      else {
        this.formIncludedList()

        if (this.formedIncludedList.length == 1) {
          this.newRecipe.ingredients.push(Number(this.formedIncludedList[0].id))
        }
      }
    },

    getIngredientName(id) {
      return this.getIngredientById(id).name
    },

    //методы для получения категории блюда, названия блюда и национальной кухни
    formCategoryList() {
      this.categoryList = this.dishCategories.filter(item => {
        return item.toLowerCase().indexOf(this.inputCategory.toLowerCase()) !== -1
      })
    },

    formNameList() {
      this.nameList = this.dishNames.filter(item => {
        return item.toLowerCase().indexOf(this.inputName.toLowerCase()) !== -1
      })
    },

    fromCuisineList(){
      this.cuisineList = this.dishCuisines.filter(item => {
        return item.toLowerCase().indexOf(this.inputCuisine.toLowerCase()) !== -1
      })
    },

    selectCategory(option = null) {
      if (option) {
        this.newRecipe.dishCategory = option
      }
      else {
        this.formCategoryList()
        if (this.categoryList.length == 1) {
          this.newRecipe.dishCategory = this.categoryList[0]
        }
      }
    },

    selectName(option = null) {
      if (option) {
        this.newRecipe.dishName = option
      }
      else {
        this.formNameList()
        if (this.nameList.length == 1) {
          this.newRecipe.dishName = this.nameList[0]
        }
      }
    },

    selectCuisine(option = null) {
      if (option) {
        this.newRecipe.nationalCuisine = option
      }
      else {
        this.fromCuisineList()
        if (this.cuisineList.length == 1) {
          this.newRecipe.nationalCuisine = this.cuisineList[0]
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>

.recipe-information {
  box-sizing: content-box;
  padding: 24px 32px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:30px;
  
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  
  .recipe-name {
    width: 511px;
    height: auto;
    
    &__title {
      position: center;
      width: 167.14px;
      height: 19px;
      left: 32px;
      top: 24px;
      margin-bottom:10px;
      
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }

    &__input{
      padding: 8px 24px;
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 55px;
      margin-bottom:15px;
      
      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }

  }
  
  .recipe-description {
    width: 511px;
    height: auto;
    
    &__text {
      position: center;
      width: 330.02px;
      height: 19px;
      left: 32px;
      top: 112px;
      margin-bottom:10px;

      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }
    
    &__input {
      padding: 8px 24px;

      resize: none;
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 143px;

      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }
  }
}

.dish-classification-title {
  width: 980px;
  height: 18px;
  
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  align-items: center;
  
  color: #000000;
}

.dish-classification {
  box-sizing: content-box;
  padding: 24px 32px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:30px;
  margin-top: 10px;
  
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  .dish-category {
    width: 511px;
    height: auto;

    &__title {
      position: center;
      width: 167.14px;
      height: 19px;
      left: 32px;
      top: 24px;
      margin-bottom:10px;
      
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }

    &__input {
      padding: 8px 24px;
      
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 55px;
      
      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }
  }
  
  .dish-name {
    width: 511px;
    height: auto;
    
    &__title {
      position: center;
      width: 167.14px;
      height: 19px;
      left: 32px;
      top: 24px;
      margin-bottom:10px;
      
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }
    
    &__input {
      padding: 8px 24px;
      
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 55px;
      
      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }
  }

  .dish-cuisine {
    width: 511px;
    height: auto;
    
    &__title {
      position: center;
      width: 167.14px;
      height: 19px;
      left: 32px;
      top: 24px;
      margin-bottom: 10px;
      
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }
    
    &__input {
      padding: 8px 24px;
      
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 55px;
      
      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }
  }
}

.ingridients-title {
  width: 980px;
  height: 18px;
  
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  align-items: center;
  
  color: #000000;
}

.ingridients {
  box-sizing: content-box;
  padding: 24px 32px;
  gap: 24px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:30px;
  margin-top: 10px;
  
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  &__input {
    padding: 8px 24px;

    position: center;
    width: 511px;
    height: auto;
    left: 32px;
    top: 55px;
      
    background: #ECECEC;
    border-radius: 8px;
    border-style: none;
  }

  .ingridients-output {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    width: 511px;
    height: auto;

    &__element {
      &__delete {
        background: #ECECEC;
        border-radius: 100px;
        border-style: none;
      }
    }
  }
}

.cooking-instructions-title {
  width: 980px;
  height: 18px;
  
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  align-items: center;
  
  color: #000000;
}

.cooking-instructions-block {
  box-sizing: content-box;
  padding: 24px 32px;

  margin-left: auto;
  margin-right: auto;
  width: 575px;
  height: auto;
  margin-bottom:20px;
  margin-top: 10px;
  
  border: 1px solid #D9D9D9;
  border-radius: 8px;

  .cooking-instructions {

    width: 511px;
    height: auto;

    &__text {
      position: center;
      width: 330.02px;
      height: 19px;
      left: 32px;
      top: 112px;
      margin-bottom:10px;

      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      display: flex;
      align-items: center;
      color: #000000;
    }
    
    &__input {
      padding: 8px 24px;

      resize: none;
      position: center;
      width: 511px;
      height: auto;
      left: 32px;
      top: 143px;

      background: #ECECEC;
      border-radius: 8px;
      border-style: none;
    }

  }
}

.cooking-instructions-batton {
  width: 575px;
  height: auto;
  margin-bottom:30px;
  padding: 8px 26px;
  border-style: none;
  
  background: #ECECEC;
  border-radius: 100px;
}

.add-batton {
  padding: 8px 26px;
  border-style: none;
  background: #ECECEC;
  border-radius: 100px;
}

.select {
  margin-top: 0;
  width: 561px;
  right: 0;
  left: 0;
  max-height: 10rem;
  border: none;
  padding: 0;
  border-radius: 8px;
  list-style: none;

  &__selected {
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
