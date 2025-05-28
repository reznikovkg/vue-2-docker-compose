<script>
export default {
    name: "InventoryItem",
    emits: ["sell", "buy"],
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

<template>
    <div :class="{ 'active': active }" class="item">
        <div class="item-display">
            <img class="item-img" :src="item.imageUrl()">
            <p v-if="forShop && item.price > 0" class="sell-button"><img src="../assets/coin.png"> {{ item.price }}</p>
            <p v-if="count > 0">x{{ item.count }}</p>
        </div>
        <div style="flex: 1;">
            <p class="item-name">{{ item.name }}</p>
            <p>{{ item.description }}</p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.2em;">
            <button v-if="forShop" :disabled="!canBuy" class="sell-button" @click="$emit('buy', this.item)">
                {{ this.item.price > 0 ? "Купить" : "Взять" }}
            </button>
            <button v-if=" canSell && forShop" class="sell-button" @click="$emit('sell', this.item)">
                Продать
            </button>
        </div>
    </div>
</template>

<style scoped>
.item-display {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    place-items: center;
}

.item {
    place-items: flex-start;
    gap: 0.5em;
}

button {
    width: 100%;
}
</style>