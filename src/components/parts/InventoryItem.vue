<template>
  <div :class="{ 'active': active }" class="inventory-item" @click="() => $emit('click')">
    <div class="inventory-item__item-display">
      <img class="inventory-item__img" :src="item.imageUrl()">
      <p v-if="forShop && item.price > 0" class="inventory-item__price"><img src="../../assets/coin.png"> {{ item.price }}</p>
      <p v-if="count > 0">x{{ item.count }}</p>
    </div>
    <div style="flex: 1;">
      <p class="inventory-item__name">{{ item.name }}</p>
      <p>{{ item.description }}</p>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.2em;">
      <button v-if="forShop" :disabled="!canBuy" class="inventory-item__action-button" @click="() => $emit('buy', item)">
        {{ this.item.price > 0 ? "Купить" : "Взять" }}
      </button>
      <button v-if="canSell && forShop" class="inventory-item__action-button" @click="() => $emit('sell', item)">
        Продать
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InventoryItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    forShop: Boolean,
    canBuy: Boolean,
    canSell: Boolean,
    active: Boolean
  },
}
</script>

<style lang="less" scoped>
.inventory-item {
  place-items: flex-start;
  gap: 0.5em;

  &__item-display {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    place-items: center;
  }

  &__price {
    display: flex;
    place-items: center;
    gap: 0.1em;
  }
}
button {
  width: 100%;
}
</style>
