<template>
    <div class="card-item" @click="() => openItemPage()">
        
        <div class="card-item__image-cnt">
            <div class="card-item__like">
                <button @click="changeLike(item)" class="card-item__button-like">
                    <img class="card-item__icon-like" src="@/assets/icon-like.png" />
                </button>
            </div>
            <img class="card-item__image" :src="getImage" alt="" />
        </div>
        <div class="card-item__name-cnt">
            <h2 class="card-item__name">{{ item.name }}</h2>
        </div>
        <div class="card-item__prices">
            <p v-if="showPricesChange" class="card-item__original-price">{{ item.price.originalPrice }}</p>
            <p class="card-item__current-price">{{ item.price.currentPrice }}</p>
        </div>
        <button class="card-item__to-cart"> В корзину </button>
    </div>
</template>

<script>
export default {
    name: 'CartItem',
    props: {
        item: Object,
    },
    computed: {
        showPricesChange() {
            return this.item.price.currentPrice !== this.item.price.originalPrice
        },

        getImage() {
            return this.item.images.find((image) => image.type === 'main').url
        }
    },
    methods: {
        openItemPage() {
            this.$router.push({ path: `/item/:${this.item.id}` })
        }
    }
}
</script>

<style scoped lang="less">
.card-item {
    aspect-ratio: 2 / 3;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2%;

    background-color: @cBaseSeven;
    border-radius: 5%;

    &__image-cnt {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 60%;
        width: 90%;
    }

    &__like {
        position: absolute;
        right: 5%;
        top: 5%;
        z-index: 5;
    }

    &__button-like {
        display: flex;
        justify-content: center;
    }

    &__icon-like {
        width: 24px;
        height: 24px;
        fill: none;
        background-color: rgb(255,0,0);
    }

    &__image {
        max-width: 100%;
        max-height: 100%;

        background-color: @cBaseEight;
        border-radius: 5%;
        border: 1px solid @cBaseThree;
    }

    &__name-cnt {
        height: 18%;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__name {
        text-align: center;
        font-size: 12px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__prices {
        position: absolute;
        bottom: -3.33%;
        right: -5%;

        display: flex;
        align-items: center;
        width: fit-content;

        background-color: @cBaseSix;
        padding: 10px;
        border-radius: 10px;
    }

    &__current-price,
    &__original-price {
        font-size: 13px;
        color: @cBaseFour;
        font-family: @ffTwo;
    }

    &__current-price {
        font-weight: 700;

        &::after {
            content: " ₽";
        }
    }

    &__original-price {
        font-weight: 400;
        opacity: 0.7;
        margin-right: 10px;
        text-decoration: line-through;
        font-style: italic;
    }
}
</style>