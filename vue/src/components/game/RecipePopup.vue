<template>
  <div class="recipe-popup">
    <div class="recipe-popup__content">
      <h3 class="recipe-popup__title">Доступные рецепты:</h3>
      <ul class="recipe-popup__list">
        <li
          v-for="(recipe, index) in params.recipes"
          :key="index"
          class="recipe-popup__item"
        >
          {{ recipe.ingredients.join(" + ") }} = {{ recipe.result }}
        </li>
      </ul>
      <button class="recipe-popup__close-button" @click="() => closePopup()">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePopup",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.recipe-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__list {
    list-style-type: none;
    padding: 0;
  }

  &__item {
    margin-bottom: 5px;
  }

  &__close-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #8b4513;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #a0522d;
    }
  }
}
</style>
