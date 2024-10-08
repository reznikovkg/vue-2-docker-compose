<template>
    <div class="item">
        <div class="item__image"> 
            <img :src="getImage" alt=""/> 
        </div>

        <div class="item__description">
            <div class="item__name"> {{ item.name }} </div>
            <div class="item__brand"> {{ item.brand }} </div>
        </div>

        <div class="item__prices"> {{ item.price.currentPrice }} </div>

        <div class="item__count">  
            <button @click="$emit('changeCount', -1)"> - </button>
            <input :value ="item.selectCount" type="number" readonly> 
            <button @click="$emit('changeCount', 1)"> + </button>
        </div>

        <div class="item__all-prices"> {{ amountGoods }} </div>

        <button @click="() => removeItemFromCart(item)"> удалить </button>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: "CartItem",
    props: {
        item: Object,
    },
    emits: ['changeCount'],
    computed: {
        getImage() {
            return this.item.images.find((image) => image.type === "main").url
        },
        amountGoods() {
            return Number(this.item.price.currentPrice * this.item.selectCount)
        }
    },
    methods: {
        ...mapMutations("cart", ["removeItemFromCart"]),
    }
}
</script>

<style scoped lang="less">
.item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
    padding: 1%;
    gap: 5%;

    &__image {
        display: flex;
        justify-content: center;
        width: 50%;
        height: 50%;
    }

    &__image img {
        width: 100%;
        height: 100%;
    }

    &__description {
        padding-top: 10px;
        margin-right: 60px;
        width: 115px;
    }

    &__count {
        display: flex;
    }

    &__count input {
        width: 32px;
        font-size: 16px;
        font-weight: 300;
    }
}
</style>