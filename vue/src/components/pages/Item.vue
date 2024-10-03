<template>
    <PageLayout>
        <section class="item-page">
            <div class="image-slider-cnt">
                <ImageSlider :images="item.images" />
            </div>
            <div class="info-block">
                <div class="name-cnt">
                    <h2 class="name">{{ item.name }}</h2>
                </div>
                <hr class="separator" />
                <p class="description">
                    {{ item.description }}
                </p>
                <hr class="separator" />
                <div class="info-list">
                    <div class="info-row" v-for="(infoRow) in item.information" :key="infoRow.title">
                        <h4 class="info-row-title">{{ infoRow.title }}: </h4>
                        <h4 class="info-row-value">{{ infoRow.value }}</h4>
                    </div>
                </div>
                <hr class="separator" />
                <div class="select" v-for="(option) in item.options" :key="option.title">
                    <p>{{ option.title }}: </p>
                    <select>
                        <option v-for="(optionValue) in option.values" :key="optionValue.id" :value="optionValue.value">{{ optionValue.name }}</option>
                    </select>
                </div>
                <hr class="separator" />
                <button class="add-to-cart">В корзину</button>
                <p class="quantity-left">Осталось {{ item.count }}</p>
            </div>
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import ImageSlider from '../parts/ImageSlider'
import { mapGetters } from 'vuex';

export default {
    name: 'ItemPage',
    components: {
        PageLayout,
        ImageSlider,
    },
    computed: {
        ...mapGetters('catalog', [
            'getItemFromCatalogById'
        ]),
        item() {
            return this.getItemFromCatalogById(this.$route.params.itemId.slice(1))
        },
        showPricesChange() {
            return this.item.price.currentPrice !== this.item.price.originalPrice
        },
        getImage() {
            return this.item.images.find((image) => image.type === 'main').url
        }
    },
}
</script>

<style scoped lang="less">
.item-page {
    display: flex;
    gap: 30px;
    font-size: 12px;
    padding: 5%;

    .image-slider-cnt {
        flex: 1;
    }

    .info-block {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1% 0 2% 0;

        background-color: @cBaseSeven;
        border-radius: 10%;
    }

    .name-cnt {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 6rem;
        width: 80%;
    }

    .name {
        font-size: 22px;
        text-align: center;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .separator {
        width: 80%;
    }

    .description {
        font-size: 16px;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: justify;
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 7px;
        width: 75%;
    }

    .info-row {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        gap: 5%;
    }

    .info-row-title {
        width: 35%;
    }

    .info-row-value {
        width: 60%;
    }

    .select {
        display: flex;
    }

    .add-to-cart {
        margin-top: 4%;
        width: 60%;
        border-radius: 15px;
        border: 1px solid @cBaseFive;
        height: 30px;

        color: @cBaseFour;
        font-weight: 700;
        transition: background-color 0.3s linear;

        &:hover {
            border: 1px solid @cBaseThree;
            color: @cBaseThree;
        }

        &:active {
            transition: none;
            background-color: @cBaseFive;
        }
    }

    .quantity-left {
        opacity: 0.6;
    }
}
</style>