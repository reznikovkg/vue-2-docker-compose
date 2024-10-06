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
    computed: {
        getImage() {
            return this.item.images.find((image) => image.type === "main").url
        }
    },
    methods: {
        ...mapMutations("cart", ["removeItemFromCart"])
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
        width: 30%;
        height: 30%;
    }

    &__description {
        padding-top: 10px;
        margin-right: 60px;
        width: 115px;
    }
}
</style>