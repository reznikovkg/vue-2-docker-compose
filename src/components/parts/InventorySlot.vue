<template>
  <div class="inventory-slot" @click="() => $emit('click')">
    <div class="inventory-slot__box" :class="{ 'inventory-slot__box--active': active }">
      <img :src="item ? item.imageUrl() : require('../../assets/unknown.png')" />
    </div>
    <small class="inventory-slot__label">
      {{ text }}
      <span v-if="item && item.count > 1"><br />x{{ item.count }}</span>
    </small>
  </div>
</template>

<script>
export default {
  name: "InventorySlot",
  props: {
    item: Object,
    text: String,
    active: Boolean,
  }
}
</script>

<style lang="less" scoped>
.inventory-slot {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  line-height: 1;

  &__box {
    padding: 0.5em;
    background-color: @cBackground2;
    text-align: center;
    transition: background-color 300ms;

    &:hover {
      background-color: @cBackground3;
    }

    &--active {
      background-color: @cAccent !important;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }

  &__label {
    font-size: 0.9em;
  }
}
</style>
