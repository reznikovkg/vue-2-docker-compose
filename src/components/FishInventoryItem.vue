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

<template>
    <div class="item">
        <img class="item-img" :src="`/fishes/${fishInventoryItem.fish.type}.png`">
        <div style="flex: 1;">
            <p class="item-name">{{ fishInventoryItem.fish.name }}</p>
            <p>{{ fishInventoryItem.weight.toFixed(2) }} кг</p>
            <p v-if="sellButton" class="sell-button"><img src="../assets/coin.png"> {{ price }}</p>
        </div>
        <button v-if="sellButton" class="sell-button" @click="$emit('sell', this.fishInventoryItem)">
            <img src="../assets/coin.png"> <a>Продать</a>
        </button>
    </div>
</template>