<template>
<div class="create-recipe">
  <h2>Страница добавления нового рецепта</h2>
  
  
  <!-- Блок с информацией о рецепте: название и описание -->
  <div class = "nameGroup"> 
    <div>
      <label>Название рецепта*</label>
      <div class="name">
        <input v-model="newRecipe.name" type="text" placeholder="Например: лимонный пирог"/>
      </div>
    </div>

    <div>
      <label>Описание рецепта*</label>
      <div class="description">
        <textarea v-model="newRecipe.description" placeholder="Кратко опишите особенность Вашего рецепта, каким будет готовое блюдо?"></textarea>
      </div>
    </div>
  </div>


  <!-- Блок с инофрмацией о блюде: категория, название, кухня -->
  <div class = "cuisineGroup"> 
    <div>
      <label>Категория блюда*</label>
      <div class="dishCategory">
            <input v-model="inputCategory" type="text" placeholder="Например: Салаты"
            @input="() => formCategoryList()" @click="() => selectCategory()" />

            <transition-group class="dishCategorySelect" tag="ul">
              <li class="dishCategorySelected" v-for="(dishSelect, i) in categoryList" :key="i" @click="selectCategory(dishSelect), inputCategory = dishSelect">
                {{ dishSelect }}
              </li> 
            </transition-group>
      </div>
  </div>
    
    <div>
      <label>Название блюда*</label>
      <div class="dishName">
        <input v-model="inputName" type="text" placeholder="Например: Паста"
        @input="() => formNameList()" @click="() => selectName()" />

      <transition-group class="dishNameSelect" tag="ul">
        <li class="dishNameSelected" v-for="(dishSelect, i) in nameList" :key="i" @click="selectName(dishSelect), inputName = dishSelect">
          {{ dishSelect }}
        </li>
      </transition-group>
      </div>
    </div>
    
    <div>
      <label>Национальная кухня</label>
      <div class="Cuisine">
        <input v-model="inputCuisine" type="text" placeholder="Например: Английская"
            @input="() => fromCuisineList()" @click="() => selectCuisine()" />

            <transition-group class="dishCuisineSelect" tag="ul">
              <li class="dishCuisineSelected" v-for="(dishSelect, i) in cuisineList" :key="i" @click="selectCuisine(dishSelect), inputCuisine = dishSelect">
                {{ dishSelect }}
              </li> 
            </transition-group>
      </div>
    </div>
  </div>


  <!-- Блок с ингридиентами -->
  <div class = "ingridientsGroup">
    <label>Ингредиенты</label>
    <div class="ingridients">

      <input v-model="included" type="text" placeholder="Например: яблоко или рис" 
      @input="() => formIncludedList()" @click="() => include()" />
        
      <TransitionGroup class="ingridientsSelect" tag="ul">
        <li class="ingridientsSelected" v-for="select in formedIncludedList" :key="select.id" @click="() => include(select)">
          {{ select.name }}
        </li>
      </TransitionGroup>

      <div v-if="includeList.length > 0">
        <label v-for="(plus, indx) in includeList" :key="indx">
          {{ getIngredientName(plus) }} <button @click="removeIngredientName(indx)" type="button">Удалить ингредиент</button> <br>
        </label>
      </div>

    </div>
  </div>


  <!-- Блок c шагами -->
  <div class = "cookingInstructionsGroup">
    <label>Инструкция приготовления</label>
    <div class="steps" v-for="counter in stepRows" :key="counter">
      <div>
        <label>Шаг {{ counter }}</label>
      </div>
      <textarea v-model="newRecipe.steps[counter - 1]" placeholder="Например: Почистите овощи, вскипятите воду"></textarea>
    </div>
    <button @click="addNewStep">Добавить шаг</button>
  </div>
  

  <!-- Кноака создания рецепта -->
   <button @click="addRecipe">Создать рецепт</button>
  

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

      included: '',
      includeList: [],
      formedIncludedList: [],
      stepRows: 1,

      inputCategory: '',
      inputName: '',
      inputCuisine: '',
      selectedCategory: '',
      selectedName: '',
      selectedCuisine: '',
      categoryList: [],
      nameList: [],
      cuisineList: [],

      // recipes: [],
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
      dishCategories: 'getDishCategories'
    }),
    ...mapGetters('dishes', {
      dishNames: 'getDishNames'
    }),
    ...mapGetters('dishes', {
      dishCuisines: 'getDishCuisines'
    }),

    ...mapGetters('recipes', {
      recipes: 'getRecipes'
  })
  },

  // mounted() {
  //   console.log(localStorage.key(0))
  //   if (localStorage.getItem('recipes')) {
  //     try {
  //       this.recipes = JSON.parse(localStorage.getItem('recipes'));
  //     } catch(e) {
  //       localStorage.removeItem('recipes');
  //     }
  //   }
  //   console.log(this.recipes)
  // },

  methods: {

    //методы для добавления рецепта
    addRecipe() {
      if (!this.newRecipe) {
        return;
      }
      this.newRecipe.nationalCuisine = this.selectedCuisine;
      this.newRecipe.dishName = this.selectedName;
      this.newRecipe.dishCategory = this.selectedCategory;
      this.newRecipe.ingredients = this.includeList;
      console.log(this.newRecipe)
      this.recipes.push(Vue.util.extend({}, this.newRecipe));
      this.saveRecipe();
    },

    removeIngredientName(x){
      this.includeList.splice(x, 1);
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
        return item.name.toLowerCase().indexOf(this.included.toLowerCase()) !== -1
      })

      this.formedIncludedList = this.formedIncludedList.filter(item => {
        return !this.includeList.includes(item.id)
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
        this.selectedCategory = option
      }
      else {
        this.formCategoryList()
        if (this.categoryList.length == 1) {
          this.selectedCategory = this.categoryList[0]
        }
      }
    },

    selectName(option = null) {
      if (option) {
        this.selectedName = option
      }
      else {
        this.formNameList()
        if (this.nameList.length == 1) {
          this.selectedName = this.nameList[0]
        }
      }
    },

    selectCuisine(option = null) {
      if (option) {
        this.selectedCuisine = option
      }
      else {
        this.fromCuisineList()
        if (this.cuisineList.length == 1) {
          this.selectedCuisine = this.cuisineList[0]
        }
      }
    },
  }
}
</script>

<style lang="less" scoped></style>
