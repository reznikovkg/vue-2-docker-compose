<template>
  <div class="craft-panel">
    <div class="craft-panel__inventory">
      <div
          v-for="item in availableItems"
          :key="item.id"
          class="craft-panel__item"
          @click="() => $emit('add-to-craft', item.id)"
      >
        <img
            :src="item.image"
            :alt="item.name"
            class="craft-panel__image"
        >
      </div>
    </div>
    <div class="craft-panel__selected">
      <div
          v-for="(itemId, index) in selectedItems"
          :key="index"
          class="craft-panel__item"
          @click="() => $emit('remove-from-craft', index)"
      >
        <img
            :src="getItemImage(itemId)"
            :alt="getItemName(itemId)"
            class="craft-panel__image"
        >
      </div>
    </div>
    <button
        class="craft-panel__craft-button"
        @click="() => $emit('craft')"
    >
      Собрать
    </button>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: 'CraftPanel',
  props: {
    selectedItems: Array,
    availableItems: Array
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
    },
    tryCraft() {
      this.$emit('craft');
    }
  }
};
</script>


<style lang="less">
@import '@/less/const.less';

.craft-panel {
  position: absolute;
  top: @inventory-height;
  right: 0;
  width: 300px;
  background-color: @cBaseNine;
  padding: 10px;
  display: flex;
  flex-direction: column;
  z-index: 20;
  gap: 10px;

  &__inventory, &__selected {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
    background-color: @cBaseThree;
    border-radius: 4px;
  }

  &__item {
    width: @item-size;
    height: @item-size;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @cBaseSix;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }

  &__craft-button {
    padding: 8px 16px;
    background-color: @cBaseSeven;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: @cBaseThree;
    font-weight: bold;

    &:hover {
      background-color: darken(@cBaseSeven, 10%);
    }
  }
}
</style>