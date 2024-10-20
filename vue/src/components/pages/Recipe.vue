<template>
  <div v-if="recipe" class="recipe">

    <div class="recipe-header">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
    </div>

    <div class="recipe-card">
        <img 
        class="recipe-card__pic"
          v-bind:src="recipe.cover" 
          v-bind:alt="recipe.name"
        >

      <div class="recipe-card__description">
        <p>{{ recipe.time }} мин</p>
        <h3>Ингредиенты</h3>
        
        <div class="portions">
          <p> Порции </p>

          <div class="recount-element">
            <button 
              class="recount-element__button"
              @click="() => subPortion()"
            > 
              – 
            </button>

            <form>
              <output class="recount-element__output">{{ portionCounter }}</output> 
            </form> 

            <button 
              class="recount-element__button"
              @click="() => addPortion()"
            > 
              + 
            </button>
          </div>
          
        </div>

        <div class="ingredients-info">
          <ul v-for="itemInfo in recipe.ingredients" :key="itemInfo.ingredient_id">
            <li>{{ getIngredientName(itemInfo) }} ..... {{ calcAmount(itemInfo) }} {{ getIngredientMeasureUnit(itemInfo) }}</li>
          </ul>
        </div>

      </div>
    </div>

    <h2>Инструкция приготовления</h2>

    <div class="preparation-info">
      <h4>Подготовка</h4>
      <p>{{ recipe.preparation_step }}</p>
    </div>

    <div class="recipe-steps">

      <div class="step-card" v-for="(step, index) in recipe.steps" :key="index">

        <img class="step-card__pic" v-bind:src="step.img">

        <div class="step-card__text">
          <h4> Шаг {{ index + 1 }} из {{ recipe.steps.length }}</h4>
          <p>{{ step.description }}</p>
        </div>

      </div>

    </div>

  </div>

  <h2 v-else> Указанный рецепт отсутствует :c</h2>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RecipePage',
  data() {
    return {
      portionCounter: 1
    }
  },
  created() {
    this.portionCounter = this.recipe.portions
  },
  computed: {
    ...mapGetters('recipes', [
      'getRecipeById'
    ]),
    ...mapGetters('ingredients', [
      'getIngredientById'
    ]),
    recipe() {
      return this.getRecipeById(this.$route.params.id) || null
    }
  },
  methods: {
    getIngredientName(ingredientInfo) {
      return this.getIngredientById(ingredientInfo.ingredient_id).name
    },
    getIngredientMeasureUnit(ingredientInfo) {
      return this.getIngredientById(ingredientInfo.ingredient_id).measure_unit
    },
    calcAmount(ingredientInfo) {
      return Math.round(ingredientInfo.amount * this.portionCounter * 100) / 100
    },
    addPortion() {
      this.portionCounter += 1
    },
    subPortion() {
      if (this.portionCounter > 1) {
        this.portionCounter -= 1
      }
    }
  }
}
</script>

<style lang="less" scoped>
.recipe {
  text-align: left;
  padding: 5%;
}

.recipe-card {
  width: 100%;
  display: inline-flex;

  &__pic {
    width: 255px;
    height: 255px;
    border-radius: 4%;
    object-fit: cover;
  }

  &__description {
    margin: 0px 7px 0px 7px;
    padding: 0px 10px 0px 20px; 
  }
}

.portions {
  display: flex;
  max-width: 170px;
  min-width: 160px;
  justify-content: space-between;
}

.recount-element {
  display: inline-flex;
  align-items: center;

  &__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  font-size: 20px;
  font-weight: 600;
  background-color: white;
  border: solid 2px black;
  border-radius: 100%;
  }

  &__output {
  display: block;
  margin: 0px 5px 0px 5px;
  width: 45px;
  height: 30px;
  background-color: #ececec;
  border-radius: 6px;
  text-align: center;
  line-height: 30px;
  font-weight: 600;
  }
}

.recipe-steps {
  width: 100%;
  display: grid;
  margin-bottom: 1%;
}

.step-card {
  display: flex;
  margin-top: 5px;
  margin-bottom: 5px;

  &__pic {
    width: 310px;
    height: 310px;
    border-radius: 4%;
    object-fit: cover;
  }

  &__text {
    margin: 0px 7px 0px 7px;
    padding: 0px 10px 0px 20px; 
  }
}
</style>
