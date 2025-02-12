<template>
  <div class="recipe-popup" v-if="isOpen">
    <div class="popup-content">
      <h3>Доступные рецепты:</h3>
      <ul>
        <li v-for="(recipe, index) in recipes" :key="index">
          {{ recipe.ingredients.join(" + ") }} = {{ recipe.result }}
        </li>
      </ul>
      <button @click="closePopup">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      required: true,
    },
    isOpen: {
      type: Boolean,
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

<style scoped>
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
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
}

h3 {
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #a0522d;
}
</style>
