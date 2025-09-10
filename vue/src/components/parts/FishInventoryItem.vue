<template>
  <div class="inventory-item">
    <img class="inventory-item__img" :src="`/fishes/${fishInventoryItem.fish.type}.png`">
    <div style="flex: 1;">
      <p class="inventory-item__name">{{ fishInventoryItem.fish.name }}</p>
      <p>{{ fishInventoryItem.weight.toFixed(2) }} кг</p>
      <p v-if="sellButton" class="inventory-item__action-button"><img src="../../assets/coin.png"> {{ price }}</p>
    </div>
    <button v-if="sellButton" class="inventory-item__action-button" @click="() => $emit('sell')">
      <img src="../../assets/coin.png"> <a>Продать</a>
    </button>
  </div>
</template>

<script>
export default {
  name: "FishInventoryItem",
  emits: ["sell"],
  computed: {
    price() {
      return Math.floor(this.fishInventoryItem.fish.pricePerKg * this.fishInventoryItem.weight)
    }
  },
  props: {
    fishInventoryItem: {
      type: Object,
      required: true
    },
    sellButton: Boolean
  },
}
</script>
