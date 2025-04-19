<template>
  <div class="inventory-panel">
    <div
        v-for="item in items"
        :key="item.id"
        class="inventory-panel__item"
        :class="{ 'inventory-panel__item--selected': selectedItem?.id === item.id }"
        @click="$emit('select', item)"
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
  props: {
    items: Array
  }
}
</script>

<style lang="less">
.inventory-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: @cBaseNine;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  z-index: 10;
  overflow-x: auto;
  gap: 10px;
}

.inventory-panel__item {
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: @cBaseSix;
  color: @cBaseOne;
  border-radius: 3px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.inventory-panel__image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.inventory-panel__item:hover {
  background-color: @cBaseSix;
}

.inventory-panel__item--selected {
  background-color: @cBaseSeven;
  outline: 2px solid @cBaseOne;
}
</style>