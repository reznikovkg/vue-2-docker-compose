<template>
    <PageLayout>
        <section class="item-page">
            <h1 class="item-page__name">{{ item.name }}</h1>
            <div class="item-page__images-and-info-block">
                <div class="item-page__image-slider-cnt">
                    <ImageSlider :images="item.images" />
                </div>
                <div class="item-page__info-block">
                    <div class="item-page__prices-cnt">
                        <div class="item-page__price-cnt">
                            <span class="item-page__old-price">
                                {{ item.price.originalPrice }}
                            </span>
                            <span class="item-page__old-price-hint">
                                Обычная цена
                            </span>
                        </div>
                        <div class="item-page__price-cnt">
                            <span class="item-page__current-price">
                                {{ item.price.currentPrice }}
                            </span>
                            <span class="item-page__current-price-hint">
                                Цена по скидочной картой
                            </span>
                        </div>
                    </div>
                    <CustomButton
                        class="item-page__add-to-cart"
                        type="filledOrange"
                        @click="handleAddToCartClick"
                        v-if="!cartItem"
                    >
                        В корзину
                    </CustomButton>
                    <div class="item-page__count__amount" v-if="cartItem">
                        <button
                            class="item-page__count__amount__button"
                            @click="() => onChangeCount(-1)"
                        >
                            -
                        </button>
                        <div class="item-page__count__amount__number">
                            {{ cartItem.selectCount }}
                        </div>
                        <button
                            class="item-page__count__amount__button"
                            @click="() => onChangeCount(1)"
                        >
                            +
                        </button>
                    </div>
                    <p class="item-page__description">
                        {{ item.description }}
                    </p>
                    <div class="item-page__info-list">
                        <div
                            v-for="infoRow in item.information"
                            :key="infoRow.title"
                            class="item-page__info-row"
                        >
                            <span class="item-page__info-row-title">
                                {{ infoRow.title }}
                            </span>
                            <span class="item-page__info-row-value">
                                {{ infoRow.value }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout';
import ImageSlider from '../parts/ImageSlider';
import CustomButton from '../parts/Button.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ItemPage',
    components: {
        PageLayout,
        ImageSlider,
        CustomButton,
    },
    computed: {
        ...mapGetters('catalog', ['getItemFromCatalogById']),
        ...mapGetters('cart', ['getCart']),
        item() {
            return this.getItemFromCatalogById(
                this.$route.params.itemId.slice(1)
            );
        },
        cartItem() {
            return this.getCart.find((elem) => elem.id === this.item.id);
        },
        showPricesChange() {
            return (
                this.item.price.currentPrice !== this.item.price.originalPrice
            );
        },
        getImage() {
            return this.item.images.find((image) => image.type === 'main').url;
        },
    },
    methods: {
        ...mapActions('cart', [
            'addItemToCart',
            'removeAllItemsFromCart',
            'removeItemFromCart',
            'changeItem',
        ]),
        handleAddToCartClick() {
            this.addItemToCart({
                id: this.item.id,
                name: this.item.name,
                brand: this.item.information[0].value,
                price: {
                    currentPrice: this.item.price.currentPrice,
                    originalPrice: this.item.price.originalPrice,
                },
                images: this.item.images,
                count: this.item.count,
                selectCount: '1',
            });
        },
        onChangeCount(value) {
            const count = Number(this.cartItem.selectCount) + Number(value);
            console.log(count, this.cartItem.count, count <= this.cartItem.count);
            
            if (count <= this.cartItem.count && count > 0) {
                this.cartItem.selectCount = count;
                this.changeItem(this.cartItem);
            }
            if (count < 1) this.removeItemFromCart(this.cartItem);
        },
    },
};
</script>

<style scoped lang="less">
.item-page {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__name {
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        text-align: left;
        color: @cBaseTen;
    }

    &__images-and-info-block {
        display: flex;
        gap: 40px;
    }

    &__image-slider-cnt {
        flex: 3;
        aspect-ratio: 1 / 1;
    }

    &__info-block {
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 16px;
    }

    &__add-to-cart {
        width: 100%;
        height: 60px;
    }

    &__add-to-cart-child {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16px;
    }

    &__cart-btn-text {
        height: 28px;
        flex-grow: 1;

        font-family: @ffOne;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
    }

    &__cart-btn-icon {
        width: 32px;
        height: 32px;
    }

    &__prices-cnt {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    &__price-cnt {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__old-price {
        font-family: @ffOne;
        font-size: 24px;
        font-weight: 400;
        line-height: 54px;
        text-align: left;
        color: @cBaseEight;
    }

    &__old-price-hint,
    &__current-price-hint {
        font-family: @ffOne;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
        color: @cBaseNine;
    }

    &__current-price {
        font-family: @ffOne;
        font-size: 36px;
        font-weight: 700;
        line-height: 54px;
        text-align: right;
        color: @cBaseTen;
    }

    &__current-price::after,
    &__old-price::after {
        content: ' ₽';
    }

    &__description {
        font-family: @ffOne;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
    }

    &__info-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    &__info-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5%;
        padding: 4px 8px;

        &:nth-of-type(odd) {
            background-color: #f3f2f1;
        }
    }

    &__info-row-title {
        flex: 1;

        font-family: @ffOne;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
    }

    &__info-row-value {
        flex: 1;

        font-family: @ffTwo;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        text-align: left;
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
        }
    }
}
</style>
