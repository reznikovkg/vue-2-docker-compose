<template>
  <div class="recipe">
    <div class="recipe__image">
      <img :src="cover"/>
    </div>
    <div class="recipe__content">
      <div class="recipe__content__name">
        <RouterLink :to="{ name: ROUTES.RECIPE, params: { id: id } }">
          {{name}}
        </RouterLink>
      </div>
      <div class="recipe__content__description">
        {{ description }}
      </div>
      <div class="recipe__content__ingredients">
        <div>
          <span> Продукты: </span>
            {{ makeIngredientsList(ingredients) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: "RecipeComponent",
  props: {
    id: Number,
    name: String,
    description: String,
    ingredients: Array,
    cover: String
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    ...mapGetters('ingredients', [
      'getIngredientById'
    ])
  },
  methods: {
    getIngredientName(id) {
      return this.getIngredientById(id).name
    },
    makeIngredientsList(ingredients) {
      var ingredientsString = ""
      var countOfIngredients = ingredients.length-1
      
      for (var i = 0; i < countOfIngredients; i++){
        ingredientsString += this.getIngredientName(ingredients[i].ingredient_id) + ", "
      }

      ingredientsString += this.getIngredientName(ingredients[ingredients.length-1].ingredient_id) + "."

      return ingredientsString;
    }
  },
}
</script>
  
<style lang="less" scoped>
.recipe {
  margin-left: 20px;
  margin-top: 20px;
  border: 1px solid #f5f5f5;
  border-radius: 5px;
  display: flex;
  width: 600px;

  &__image {
    width: 150px;
    height: 120px;
    background-position: center;
    border-radius: 5px 5px 0 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    text-align: start;

    &__name {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &__description {
      font-size: 14px;
      margin-bottom: 10px;
      height: 50px;
    }

    &__ingredients {
      font-size: 14px;
    }
  }
}
</style>
  