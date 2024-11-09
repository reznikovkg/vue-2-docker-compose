<template>
  <div class="create-recipe">
    <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    
    <h2>Редактор нового рецепта</h2>
  
    <!-- Блок с загрузгой обложки -->
    <div class = block-cover>
      <img class="preview-img" v-bind:src="previewCover"/>
      <input id="image-btn" @change="loadCoverImage" type="file" hidden accept="image/png, image/jpeg, image/jpg">
      <label class="load-image-btn" for="image-btn">Загрузить обложку рецепта</label>
      <p class="block-cover__text">Допустимые форматы фотографий для загрузки: JPEG, JPG, PNG</p>
    </div>
  
  
    <!-- Блок с информацией о рецепте: название и описание -->
    <div class = "block"> 
      <label class="inner-block-title">Название рецепта *</label>
        <input class="block__name-input" v-model="newRecipe.name" type="text" placeholder="Например: Лимонный пирог"/>
  
        <label class="inner-block-title">Описание рецепта *</label>
        <textarea class="block__description-textarea" v-model="newRecipe.description" type="text" placeholder="Кратко опишите особенность Вашего рецепта, каким будет готовое блюдо?"></textarea>
    </div>
  
  
    <!-- Блок с инофрмацией о блюде: категория, название, кухня -->
    <h3 class="block-title">Классификация блюда</h3>
    <div class = "block"> 
      <label class="inner-block-title">Категория блюда *</label>
      <CustomSelect :button_class="'block__select'" :dropdown_class="'block__dropdown'" :options="dishCategories" :selected-default="'Выберете одно'" v-model="newRecipe.dish_category_id"/>
  
      <label class="inner-block-title">Вид приёма пищи</label>
      <CustomSelect :button_class="'block__select'" :dropdown_class="'block__dropdown'" :options="dishTime" :selected-default="'Выберете одно'" v-model="newRecipe.dish_time_id"/>
  
      <label class="inner-block-title">Национальная кухня</label>
      <CustomSelect :button_class="'block__select'" :dropdown_class="'block__dropdown'" :options="dishCuisine" :selected-default="'Выберете одно'" v-model="newRecipe.dish_cuisine_id"/>
    </div>
     
  
    <!-- Блок с параметрами блюда -->
    <h3 class="block-title">Параметры блюда</h3>
    <div class = "block-parameters">
      <div>
        <label class="inner-block-title">Порции *</label>
        <button class="portions-btn-minus" @click="minusPortions">-</button>
        <input class="portions-input" v-model="newRecipe.portions" type="text" disabled/>
        <button class="portions-btn-plus" @click="addPortions">+</button>
      </div>
      <div>
        <label class="inner-block-title">Время на приготовление *</label>
      <div class="time">
        <input class="time-input" v-model="hours" type="text"/>
        <p class="time-text">Часы</p>
        <input class="time-input" v-model="minutes" type="text"/>
        <p class="time-text">Минуты</p>
      </div>
      </div>
      
    </div>
  
  
    <!-- Блок с ингридиентами -->
    <h3 class="block-title">Ингредиенты*</h3>
    <div class="block">
      <SearchList :input_class="'search-list'" 
      :full-list="getIngredients"
      :exclude-list="alreadyPickedList" 
      :placeholder="'Например: яблоко'"
      @enter="(v) => include(v)"/>
      
      <div v-if="formedIngridientList.length > 0">
        <label class="ingredient-title" v-for="(included_ingredient, indx) in formedIngridientList" 
        :key="indx">
          {{ getIngredientName(included_ingredient) }}
          <div class="spacing"></div>
          <input class="ingredient-amount" v-model="amountIngridientList[indx]" type="text"/>
          {{ getIngredientMeasureUnit(included_ingredient) }}
          <button class="remove-ingredient" @click="removeIngredientName(indx)" type="button"><i class="fa fa-trash"></i></button> <br>
        </label>
      </div>
    </div>
  
  
    <!-- Блок c шагами -->
    <h3 class = "block-title">Инструкция приготовления *</h3>
    <!-- Подготовительный шаг -->
     <div class="step-block">
      <label class="inner-block-header">Подготовительный шаг</label>
      <label class="inner-block-title">Описание шага</label>
      <textarea class="block__description-textarea" v-model="newRecipe.preparation_step" placeholder="Например: Почистите овощи, вскипятите воду"></textarea>
     </div>
  
     <!-- Основные шаги -->
    <div>
      <div class="step-block" v-for="counter in stepRows" :key="counter">
        <div class="time">
          <label class="inner-block-header">Шаг {{ counter }}</label>
        <div v-if="counter > 1">
          <button class="remove-step-btn" @click="removeStep(counter - 1)">Удалить шаг</button>
        </div>
        </div>
        <img class="preview-step-img" v-bind:src="previewSteps[counter - 1]" />
        <input id="image-btn-step" @change="loadStepImage" type="file" hidden accept="image/png, image/jpeg, image/jpg"/>
        <label class="load-image-step-btn" for="image-btn-step">Загрузить фото</label>
        <label class="inner-block-title">Описание шага</label>
        <textarea class="block__description-textarea" v-model="descriptionList[counter - 1]" placeholder="Например: Почистите овощи, вскипятите воду"></textarea>
      </div>
      <button class="step-btn" @click="addNewStep">Добавить шаг</button>
    </div>
  
    <!-- Подача -->
    <div class="step-block">
      <label class="inner-block-header">Подача</label>
      <img class="preview-step-img" v-bind:src="previewPresentation_step"/>
      <input id="image-btn-presentation-step" @change="loadPresentationStepImage" type="file" hidden accept="image/png, image/jpeg, image/jpg"/>
      <label class="load-image-step-btn" for="image-btn-presentation-step">Загрузить фото</label>
      <label class="inner-block-title">Описание шага</label>
      <textarea class="block__description-textarea" v-model="newRecipe.presentation_step.description" placeholder="Например: Подавайте в глубокой тарелке со сметаной"></textarea>
     </div>
    
     <hr class="dashed">
    <!-- Кнопка создания рецепта -->
     <button class="add-btn"  @click="addRecipe">Создать рецепт</button>
    
  
    <!-- вывод -->
    <!-- <div v-for="(recipe, n) in recipes" :key="recipe.id">
      <p>
        <span class="Рецепты">{{ recipe }}</span>
        <button @click="removeRecipe(n)">Remove</button>
      </p>
    </div> -->
  </div>
  
  </template>
  
  <script>
  import Vue from "vue";
  import { ROUTES } from '@/router/routes';
  import { mapGetters } from 'vuex';
  import SearchList from '../customComponents/SearchList.vue';
  import CustomSelect from '../customComponents/CustomSelect.vue'
  
  export default {
    name: 'CreateRecipePage',
      data() {
      return {
  
        isShowDropdown: false,
        submited: false,
        alreadyPickedList: this.includeList.concat(this.excludeList),
        formedIngridientList: this.includeList,
        amountIngridientList: [],
  
        stepRows: 1,
        hours: 0,
        minutes: 0,
        descriptionList: [],
        imgList: [],
        previewSteps: [],
        previewCover: null,
        previewPresentation_step: null,
  
        //новый рецепт
        newRecipe: {
          id: 0,
          name: "",
          dish_category_id: null,
          dish_time_id: null,
          dish_cuisine_id: null,
          cover: null,
          description: "",
          portions: 1,
          time: 0,
          ingredients: [],
          preparation_step: null,
          steps: [],
          presentation_step: 
          {
            img: "",
            description: ""
          }
        }
      }
    },
  
    components: {
      CustomSelect,
      SearchList
    },
  
    props: {
      includeList: {
        type: Array,
        default: () => ([])
      }
    },
  
    computed: {
      ROUTES() {
        return ROUTES
      },
      ...mapGetters('ingredients', [
        'getIngredients',
        'getIngredientName',
        'getIngredientById'
      ]),
      ...mapGetters('dish_categories', {
        dishCategories: 'getDishCategories'
      }),
      ...mapGetters('dish_time', {
        dishTime: 'getDishTime'
      }),
      ...mapGetters('dish_cuisine', {
        dishCuisine: 'getDishCuisine'
      }),
      ...mapGetters('recipes', {
        recipes: 'getRecipes'
      }),
      ...mapGetters('recipes', [
        'getRecipeById'
      ])
    },
  
    methods: {
  
      //добавить новый рецепт
      addRecipe() {
        if (!this.newRecipe) {
          return;
        }
        this.setRecipeId()
        this.timeConvert()
        this.setRecipeIngridients()
        this.setRecipeSteps()
        console.log(this.newRecipe)
        this.recipes.push(Vue.util.extend({}, this.newRecipe));
        this.saveRecipe();
      },
      
      removeRecipe(x) {
        this.recipes.splice(x, 1);
        this.saveRecipe();
      },
  
      //сохранить рецепт
      saveRecipe() {
        const parsed = JSON.stringify(this.recipes);
        localStorage.setItem('recipes', parsed);
      },
  
      //установить id текущего рецепта
      setRecipeId() {
        while (this.getRecipeById(this.newRecipe.id) != null)
        {
          this.newRecipe.id++;
        }
        return this.newRecipe.id;
      },
  
      //добавить новый шаг рецепта
      addNewStep() {
        this.stepRows++;
      },
  
      //удалит шаг рецепта
      removeStep(x)
      {
        this.previewSteps.splice(x, 1);
        this.imgList.splice(x, 1);
        this.descriptionList.splice(x, 1);
        this.stepRows--;
      },
  
      //установить количество шагов текущего рецепта
      setRecipeSteps() {
        if (this.newRecipe.preparation_step == "")
      {
        this.newRecipe.preparation_step = null;
      }
  
      if (this.newRecipe.presentation_step.description == "")
      {
        this.newRecipe.presentation_step = null;
      }
  
        for (var i = 0; i < this.stepRows; i++)
      {
        this.newRecipe.steps.push({
          img: this.imgList[i],
          description: this.descriptionList[i]
        })
      }
      },
  
      //загрузка изображения для обложки
      loadCoverImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = (e) => {
          this.newRecipe.cover = e.target.result;
          this.previewCover = e.target.result;
        }
        
        reader.readAsDataURL(file);
      },
  
      //загрузка изображения для шага
      loadStepImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (this.imgList[this.counter - 1] && this.imgList[this.counter - 2])
      {
        this.previewSteps.splice(this.counter - 1, 1);
        this.imgList.splice(this.counter - 1, 1);
  
        reader.onload = (e) => {
          this.imgList.push(this.counter - 1, e.target.result);
          this.previewSteps.push(this.counter - 1, e.target.result);
        }
      }
      else {
        reader.onload = (e) => {
          this.imgList.push(e.target.result);
          this.previewSteps.push(e.target.result);
        }
      }
        reader.readAsDataURL(file);
      },
      
      //загрузка изображения для подачи
      loadPresentationStepImage(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = (e) => {
          this.newRecipe.presentation_step.img = e.target.result;
          this.previewPresentation_step = e.target.result;
        }
        reader.readAsDataURL(file);
      },
      
      //увеличения количества порций
      addPortions() {
        this.newRecipe.portions += 1;
      },
  
      //уменьшения количества порций
      minusPortions() {
        if (this.newRecipe.portions > 1) {
          this.newRecipe.portions -= 1;
        }
      },
  
      //подсчёт времени
      timeConvert() {
        if (this.minutes >= 0 && this.hours >= 0) {
          this.newRecipe.time = 60 * Number(this.hours) + Number(this.minutes);
        }
      },
  
      //методы для получения ингредиентов
      include(option) {
        if (option) {
          this.formedIngridientList.push(Number(option.id))
          this.alreadyPickedList.push(Number(option.id))
        }
      },
  
      //получит меру измерения ингредиента
      getIngredientMeasureUnit(id) {
        return this.getIngredientById(id).measure_unit
      },
  
      //удалить ингредиент
      removeIngredientName(option) {
        this.formedIngridientList.splice(option, 1);
        this.amountIngridientList.splice(option, 1);
        this.alreadyPickedList.splice(option)
      },
      
      //установить ингредиенты текущего рецепта
      setRecipeIngridients() {
        for (var i = 0; i < this.formedIngridientList.length; i++)
        {
          this.newRecipe.ingredients.push({
            ingredient_id: this.formedIngridientList[i],
            amount: Number(this.amountIngridientList[i])
          })
        }
      }
    }
  }
  </script>
  
  <style lang="less">
  
  .block-cover {
    box-sizing: border-box;
    width: 575px;
    margin-bottom: 20px;
    padding: 24px 32px;
    border: 1.5px dashed #D9D9D9;
    border-radius: 8px;
    
    &__text {
      margin-bottom:10px;
      font-family: 'Inter';
      font-size: 12px;
      display: flex;
      color: #7D7D7D;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .load-image-btn {
    display: flex;
    font-weight: 600;
    margin-left: 20%;
    margin-right: 20%;
    justify-content: center;
    align-items: center;
    background-color: #ECECEC;;
    color: #7D7D7D;
    padding: 8px 26px;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .load-image-step-btn {
    display: flex;
    font-weight: 600;
    margin-right: 65%;
    margin-bottom: 15px;
    align-items: center;
    background-color: none;
    color: #7D7D7D;
    padding: 8px 26px;
    border: 1.5px solid #7D7D7D;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .step-btn {
    font-weight: 600;
    width: 181px;
    height: 50px;
    margin-bottom: 40px;
    align-items: center;
    background-color: #ECECEC;;
    color: #7D7D7D;
    padding: 8px 26px;
    border-radius: 100px;
    cursor: pointer;
    border-style: none;
  }

  .remove-step-btn {
    font-weight: 600;
    width: 181px;
    height: 50px;
    margin-left: 155%;
    margin-bottom: 40px;
    align-items: center;
    background-color: #ECECEC;;
    color: #7D7D7D;
    padding: 8px 26px;
    border-radius: 100px;
    cursor: pointer;
    border-style: none;
  }
  
  .preview-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    height: 80%;
    border-radius: 8px;
  }
  
  .preview-step-img {
    display: block;
    width: 80%;
    height: 80%;
    border-radius: 8px;
  }

  .block-parameters {
    display: flex;
    width: 510px;
    padding: 24px 32px;
    margin-bottom: 40px;
    border: 1.5px solid #D9D9D9;
    border-radius: 8px;
  }
  
  .step-block {
    box-sizing: border-box;
    width: 575px;
    padding: 24px 32px;
    margin-bottom: 20px;
    border: 1.5px solid #D9D9D9;
    border-radius: 8px;
  }
  
  .block {
    box-sizing: border-box;
    width: 575px;
    padding: 24px 32px;
    margin-bottom: 40px;
    border: 1.5px solid #D9D9D9;
    border-radius: 8px;
    
    &__name-input {
      padding: 8px 24px;
      font-family: 'Inter';
      position: center;
      width: 90%;
      margin-bottom: 15px;
      background: #ECECEC;
      color: #646464;
      border-radius: 8px;
      border-style: none;
      
      &:focus {
        outline: 2px solid #dfdfdf;
        outline-offset: -2px;
        border-radius: 8px;
      }
    }
    
    &__description-textarea {
      padding: 8px 24px;
      resize: none;
      position: center;
      width: 90%;
      font-family: 'Inter';
      background: #ECECEC;
      color: #646464;
      border-radius: 8px;
      border-style: none;
      
      &:focus {
        outline: 2px solid #dfdfdf;
        outline-offset: -2px;
        border-radius: 8px;
      }
    }
    
    &__select {
      padding: 8px 24px;
      position: relative;
      font-family: 'Inter';
      width: 100%;
      margin-bottom: 15px;
      background: #ECECEC;
      color: #646464;
      border-radius: 8px;
      border-style: none;
      text-align: left;
      overflow: hidden;
      
      &::after {
        position: absolute;
        content: url(../../assets/chevron_down.png);
        right: 1.5rem;
        pointer-events: none;
      }
      
      &:focus {
        outline: 2px solid #dfdfdf;
        outline-offset: -2px;
        border-radius: 8px;
      }
    }
    
    &__dropdown {
      display: block;
      position: absolute;
      background-color: white;
      width: 465px;
      height: fit-content;
      z-index: 1;
      margin-top: 3px;
      border: 1px solid #ECECEC;
      border-radius: 8px;
      padding: 20px;
      list-style-type: none;
    }
  }

  .inner-block-header {
    margin-bottom: 20px;
    font-weight: 700;
    font-family: 'Inter';
    font-size: 16px;
    line-height: 19px;
    display: flex;
    color: #000000;
  }
  
  .inner-block-title {
      margin-bottom: 10px;
      font-family: 'Inter';
      font-size: 16px;
      line-height: 19px;
      display: flex;
      color: #000000;
    }
  
  .block-title {
      width: 980px;
      height: 18px;
      font-weight: 700;
      font-size: 20px;
      line-height: 24px;
      align-items: center;
      margin-bottom: 20px;
      color: #000000;
  }
  
  .portions-btn-plus {
    border-radius: 50%;
    font-weight: 700;
    width: 20px;
    height: 20px;
    padding-left: 1px;
    padding-right: 1px;
    padding-top: 1px;
    padding-bottom: 1px;
    border-color: #000000;
    border: solid 2px black;
    background: none;
  }
  
  .portions-btn-minus {
    border-radius: 50%;
    font-weight: 700;
    width: 20px;
    height: 20px;
    padding-left: 0.5px;
    padding-right: 0.5px;
    padding-top: 0.5px;
    padding-bottom: 0.5px;
    border-color: #000000;
    border: solid 2px black;
    background: none;
  }
  
  .portions-input {
    padding: 8px 24px;
    font-family: 'Inter';
    font-weight: 600;
    text-align: center;
    width: 5%;
    margin-left: 10px;
    margin-right: 10px;
    background: #ECECEC;
    color: #646464;
    border-radius: 8px;
    border-style: none;
  }
  
  .time-input {
    padding: 8px 24px;
    font-weight: 600;
    text-align: center;
    font-family: 'Inter';
    width: 5%;
    margin-right: 10px;
    background: #ECECEC;
    color: #646464;
    border-radius: 8px;
    border-style: none;
    
    &:focus {
      outline: 2px solid #dfdfdf;
      outline-offset: -2px;
      border-radius: 8px;
    }
  }
  
  .time {
    display: flex;
  }
  
  .time-text {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    margin-right: 10px;
    color: #646464;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  hr.dashed {
    margin-top: 40px;
    margin-bottom: 20px;
    border-top: 2px dashed;
    border-bottom: none;
    color: #D9D9D9;
}

.add-btn {
  font-weight: 600;
  display: flex;
  margin-left: 40%;
    justify-content: center;
    align-items: center;
  width: 181px;
  height: 50px;
  margin-bottom: 40px;
  align-items: center;
  background-color: #ECECEC;;
  color: #7D7D7D;
  padding: 8px 26px;
  border-radius: 100px;
  cursor: pointer;
  border-style: none;
}

.search-list {
  padding: 8px 24px;
  position: relative;
  font-family: 'Inter';
  width: 90%;
  margin-bottom: 15px;
  background: #ECECEC;
  color: #646464;
  border-radius: 8px;
  border-style: none;
  text-align: left;
  overflow: hidden;

  &:focus {
    outline: 2px solid #dfdfdf;
    outline-offset: -2px;
    border-radius: 8px;
  }
}

.ingredient-title {
      margin-bottom: 10px;
      margin-right: 10px;
      font-family: 'Inter';
      font-size: 16px;
      line-height: 19px;
      display: flex;
      color: #000000;
    }

    .remove-ingredient {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: none;
    background: none;
  }

  .spacing {
    flex-grow: 1;
    overflow: hidden;
    height: 15px;
    border-bottom: dotted 2px;
    color: #D9D9D9;
  }

  .ingredient-amount {
    padding: 8px 24px;
    font-family: 'Inter';
    font-weight: 600;
    text-align: center;
    width: 5%;
    margin-left: 10px;
    margin-right: 10px;
    background: #ECECEC;
    color: #646464;
    border-radius: 8px;
    border-style: none;
  }
  
  </style>
  
  