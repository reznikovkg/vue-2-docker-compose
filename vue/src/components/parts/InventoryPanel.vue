<template>
  <div class="inventory-panel">
    <div
        v-for="item in items"
        :key="item.id"
        class="inventory-panel__item"
        :class="{
          'inventory-panel__item--selected': selectedItem?.id === item.id
        }"
        @click="() => $emit('select', item)"
        :title="item.description"
    >
      <img
          :src="item.image"
          :alt="item.name"
          class="inventory-panel__image"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'InventoryPanel',
  props: {
    items: Array,
    selectedItem: Object
  }
};
</script>

<style lang="less">
@import '@/less/const.less';

.inventory-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: @inventory-height;
  background-color: @cBaseNine;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  z-index: 10;
  overflow-x: auto;
  gap: 10px;

  &__item {
    width: @item-size;
    height: @item-size;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @cBaseSix;
    border-radius: 3px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }

    &--selected {
      outline: 2px solid @cBaseOne;
      transform: scale(1.1);
    }
  }

  &__image {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
}
</style>