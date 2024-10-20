<template>
  <div class="ingredient">
    <div class="ingredient__content">
      <div class="ingredient__content__image">
        <img :src="ingredient.cover"/>
      </div>
      <div class="ingredient__content__name">
        <RouterLink :to="{ name: ROUTES.RECIPE, params: { id:ingredient.ingredient_id } }">{{ ingredient.name }}</RouterLink>
      </div>
    </div>
  </div>
</template>
  
<script>
import { ROUTES } from '@/router/routes';

export default {
  name: "IngredientComponent",
  props: {
    ingredient: Object
  },
  computed: {
    ROUTES() {
      return ROUTES
    }
  }
}
</script>
  
<style lang="less" scoped>
.ingredient {
  margin: 20px;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  width: 150px;
  justify-content: start;
  height: 120px;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding-top: 10px;
    margin-left: 10px;

    &__image {
      width: 150px;
      height: 130px;
      background-position: center;
      border-radius: 5px 5px 0 0;
      border: 2px solid #f5f5f5;

      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
      
    &__name {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
  