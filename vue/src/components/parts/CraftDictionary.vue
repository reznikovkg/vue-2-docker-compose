<template>
  <div class="craft-dictionary">
    <div class="craft-dictionary__header">
      <h3>Словарь крафта</h3>
      <button
          class="craft-dictionary__close-button"
          @click="() => $emit('close')"
      >
        ×
      </button>
    </div>
    <div class="craft-dictionary__content">
      <div
          v-for="(recipe, index) in recipes"
          :key="index"
          class="craft-dictionary__recipe"
      >
        <div class="craft-dictionary__components">
          <div
              v-for="componentId in recipe.components"
              :key="componentId"
              class="craft-dictionary__component"
          >
            <img
                :src="getItemImage(componentId)"
                :alt="getItemName(componentId)"
                class="craft-dictionary__image"
            >
          </div>
          <div class="craft-dictionary__arrow">→</div>
        </div>
        <div class="craft-dictionary__result">
          <img
              :src="getItemImage(recipe.result)"
              :alt="getItemName(recipe.result)"
              class="craft-dictionary__image"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'CraftDictionary',
  props: {
    recipes: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('game', [
      'getItemById'
    ]),
  },
  methods: {
    getItemImage(itemId) {
      const item = this.getItemById(itemId);
      return item?.image || '';
    },
    getItemName(itemId) {
      const item = this.getItemById(itemId);
      return item?.name || '';
    }
  }
};
</script>

<style lang="less">
@import '@/less/const.less';

.craft-dictionary {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-width: 90%;
  background-color: @cBaseNine;
  padding: 20px;
  border-radius: 8px;
  z-index: 100;
  color: @cBaseOne;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__close-button {
    background: none;
    border: none;
    color: @cBaseOne;
    font-size: 24px;
    cursor: pointer;
  }

  &__recipe {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 10px;
    background-color: @cBaseThree;
    border-radius: 4px;
  }

  &__components {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__component, &__result {
    width: @item-size;
    height: @item-size;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @cBaseSix;
    border-radius: 3px;
  }

  &__arrow {
    margin: 0 10px;
    font-size: 20px;
  }

  &__image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
}
</style>
