<template>
  <div class="game-container">
    <div class="items-grid">
      <ItemCard
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @click="addToTable(item)"
      />
    </div>
    <CraftingTable @remove-item="removeFromTable" />
    <div class="controls">
      <button class="controls__button" @click="() => clearTable()">
        Сбросить
      </button>
      <button class="controls__button" @click="() => mixItems()">
        Смешать
      </button>
      <button class="controls__button" @click="() => showRecipes()">
        Рецепты
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ItemCard from "./ItemCard.vue";
import CraftingTable from "./CraftingTable.vue";
import RecipePopup from "./RecipePopup.vue";

function normalizeItemName(name) {
  return name.trim().toLowerCase();
}

export default {
  name: "GameView",
  components: {
    ItemCard,
    CraftingTable,
  },
  computed: {
    ...mapState(["items", "tableItems", "recipes"]),
  },
  methods: {
    ...mapActions(["addTableItem", "removeTableItem", "clearTable", "addItem"]),
    ...mapMutations("modals", ["openModal"]),
    addToTable(item) {
      this.addTableItem(item);
    },
    removeFromTable(index) {
      this.removeTableItem(index);
    },
    mixItems() {
      const tableItemsCount = {};
      this.tableItems.forEach((item) => {
        const itemName = normalizeItemName(item.name);
        tableItemsCount[itemName] = (tableItemsCount[itemName] || 0) + 1;
      });

      const result = this.recipes.find((recipe) => {
        const recipeIngredientsNormalized = recipe.ingredients.map(
          (ingredient) => normalizeItemName(ingredient)
        );

        const recipeIngredientsCount = {};
        recipeIngredientsNormalized.forEach((ingredient) => {
          recipeIngredientsCount[ingredient] =
            (recipeIngredientsCount[ingredient] || 0) + 1;
        });

        return Object.keys(recipeIngredientsCount).every(
          (ingredient) =>
            tableItemsCount[ingredient] === recipeIngredientsCount[ingredient]
        );
      });

      if (result) {
        this.addItem({
          name: result.result,
          image: result.image,
        });

        this.clearTable();
      } else {
        alert("Нет подходящего рецепта!");
      }
    },
    showRecipes() {
      this.openModal({
        component: RecipePopup,
        params: {
          recipes: this.recipes,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
@primary-button-bg: #8b4513;
@primary-button-hover-bg: #a0522d;

.game-container {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  .items-grid {
    display: grid;
    padding: 20px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 20px;
    width: 80%;
    height: 60%;
    margin-bottom: 20px;
    overflow-y: auto;
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    .controls__button {
      padding: 10px 20px;
      background-color: @primary-button-bg;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: @primary-button-hover-bg;
      }
    }
  }
}
</style>
