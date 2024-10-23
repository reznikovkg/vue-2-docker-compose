<template>
    <div class="item">
        <div class="item__image">
            <img :src="getImage" alt="" />
        </div>

        <div class="item__info">
            <div class="item__description">
                {{ item.name }}
                {{ item.brand }}
            </div>
            <div class="item__prices">
                <div class="item__prices__current">
                    {{ item.price.currentPrice }} ₽
                </div>
                <div
                    class="item__prices__discount"
                    v-if="item.price.originalPrice">
                    {{ item.price.originalPrice }} ₽
                </div>
                <div
                    class="item__prices__discountPercent"
                    v-if="item.price.originalPrice">
                    -{{ discountPersent }}%
                </div>
            </div>
        </div>

        <div class="item__count">
            <div class="item__count__amount">
                <button
                    class="item__count__amount__button"
                    @click="$emit('changeCount', -1)">
                    -
                </button>
                <div class="item__count__amount__number">
                    {{ item.selectCount }}
                </div>
                <button
                    class="item__count__amount__button"
                    @click="$emit('changeCount', 1)">
                    +
                </button>
            </div>
            <div class="item__count__amount__sum">
                <div class="item__count__amount__sum__discount">
                    {{ amountGoods }} ₽
                </div>
                <div
                    class="item__count__amount__sum__price"
                    v-if="item.price.originalPrice">
                    {{ amountGoodsWithoutDiscount }} ₽
                </div>
            </div>
        </div>
        <button class="item__delete" @click="() => removeItemFromCart(item)">
            X
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CartItem',
    props: {
        item: Object,
    },
    emits: ['changeCount'],
    computed: {
        getImage() {
            return this.item.images.find((image) => image.type === 'main').url;
        },
        amountGoods() {
            return this.item.price.currentPrice * this.item.selectCount;
        },
        amountGoodsWithoutDiscount() {
            return this.item.price.originalPrice * this.item.selectCount;
        },
        discountPersent() {
            return (
                ((this.item.price.originalPrice -
                    this.item.price.currentPrice) /
                    this.item.price.originalPrice) *
                100
            );
        },
    },
    methods: {
        ...mapActions(['removeItemFromCart']),
    },
};
</script>

<style scoped lang="less">
.item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: @cBaseWhite;
    width: 876px;
    min-height: 72px;
    max-height: 72px;
    border-radius: 4px;
    box-shadow: 1px 2px 4px 0px @cShadow;

    &__image {
        display: flex;
        justify-content: center;
        box-shadow: 1px 2px 4px 0px @cShadow;
    }

    &__image img {
        width: 80px;
        height: 60px;
        border-radius: 4px;
    }

    &__delete {
        position: relative;
        top: -25px;
        color: @cBaseNine;
        background-color: transparent;
        border: none;
        margin-left: 5px;
        cursor: pointer;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 536px;
        margin: 0 10px;
    }

    &__description {
        font-family: Rubik;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;
    }

    &__prices {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: Roboto;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        text-align: left;

        &__current {
            font-family: Roboto;
            font-size: 12px;
            font-weight: 700;
            line-height: 18px;
            text-align: left;
        }

        &__discount {
            font-family: Rubik;
            font-size: 12px;
            font-weight: 400;
            line-height: 18px;
            text-align: right;
            color: @cTextGrey;
        }

        &__discountPercent {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 53px;
            height: 32px;
            background: @cBaseTwelve;
            font-family: Rubik;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            text-align: center;
            color: @cBaseWhite;
            border-radius: 4px;
        }
    }

    &__count {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-left: auto;

        &__amount {
            display: flex;
            align-items: center;
            gap: 8px;
            height: 40px;
            padding: 8px;
            background-color: @cBaseEleven;
            border-radius: 4px;
            &__button {
                width: 24px;
                height: 24px;
                padding: 0;
                background-color: @cBaseEleven;
                color: @cBaseWhite;
                border: none;
                cursor: pointer;
                font-size: 20px;
                text-align: center;
            }
            &__number {
                background-color: @cBaseEleven;
                color: @cBaseWhite;
                border: none;
            }
            &__sum {
                width: 100px;
                &__price {
                    color: @cBaseNine;
                    font-family: Roboto;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 24px;
                    text-align: right;
                    text-decoration: line-through;
                }
                &__discount {
                    font-family: Rubik;
                    font-size: 18px;
                    font-weight: 700;
                    line-height: 27px;
                    text-align: right;
                }
            }
        }
    }

    &__count input {
        width: 32px;
        font-size: 16px;
        font-weight: 300;
    }
}
</style>
