<template>
    <div class="card-item" @click="() => openItemPage()">
        
        <div class="card-item__image-cnt">
            <div class="card-item__like">
                <button @click='() => addToFavorites(item)' class="card-item__button-like">
                    <img class="card-item__icon-like" src="@/assets/icon-like.png" />
                </button>
            </div>
            <div class="card-item_discount">
                <p v-if="showDiscount">  </p>
            </div>
            <img class="card-item__image" :src="getImage" alt="" />
        </div>

        <div class="card-item__prices">
            <p v-if="showDiscount" class="card-item__original-price">{{ item.price.originalPrice }}</p>
            <p class="card-item__current-price">{{ item.price.currentPrice }}</p>
        </div>

        <div class="card-item__name-cnt">
            <p class="card-item__name">{{ item.name }}</p>
        </div>

        <button class="card-item__to-cart" @click='() => addItemToCart(item)'> В корзину </button>

    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
    name: 'CartItem',
    props: {
        item: Object,
    },
    computed: {
        showDiscount() {
            return this.item.price.currentPrice !== this.item.price.originalPrice
        },

        getImage() {
            return this.item.images.find((image) => image.type === 'main').url
        }
    },
    methods: {
        ...mapMutations("cart", ["addItemToCart"]),
        ...mapActions('favorites', ['addToFavorites', 'removeFromFavorites']),
        openItemPage() {
            //this.$router.push({ path: `/item/:${this.item.id}` })
        },
    }
}
</script>

<style scoped lang="less">
.card-item {
    aspect-ratio: 2 / 3;
    //position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2%;
    background-color: rgb(230, 230, 230);
    border-radius: 3px;

    &__image-cnt {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

        height: 60%;
        width: 100%;
    }

    &__like {
        position: absolute;
        right: 5%;
        top: 5%;
    }

    &__button-like {
        display: flex;
        justify-content: center;
        //background-color: rgb(255, 255, 255); 
    }

    &__icon-like {
        width: 20px;
        height: 20px;
        fill: none;
    }

    &__image {
        max-width: 100%;
        max-height: 100%;
        background-color: @cBaseEight;
        border-radius: 3px;
    }

    &__name-cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    &__name {
        text-align: center;
        font-size: 16px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-family: @ffOne;
    }

    &__prices {
        display: flex;
        align-items: center;
        width: fit-content;
    }

    &__current-price,
    &__original-price {
        font-size: 17px;
        font-family: @ffOne;
    }

    &__current-price {
        font-weight: 600;
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

    &__to-cart {
        height: 35px;
        width: 70%;
        border-radius: 5px;
        color: rgb(23, 207, 106);
        border: 2px solid rgb(23, 207, 106);
        background-color: rgb(255, 255, 255);
        transition-duration: 0.3s;
        cursor: pointer;
        font-family: @ffOne;
        &:hover {
            background-color: rgb(255, 102, 51);
            color: rgb(255, 255, 255);
            border: 2px solid rgb(255, 102, 51);
        }
    }
}
</style>