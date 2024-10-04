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
                <div class="options-block">
                    <div class="option-row" v-for="(option) in item.options" :key="option.title">
                        <p class="option-row-title">{{ option.title }}: </p>
                        <select class="option-row-select" @change="(e) => setOptionValue(option.title, e.target.value)">
                            <option v-for="(optionValue) in option.values" :key="optionValue.id"
                                :value="optionValue.value">
                                {{ optionValue.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <hr class="separator" />
                <button class="add-to-cart" @click="handleAddToCartClick">В корзину</button>
                <!-- todo командой вынесем кнопки в компонент после мёрджа -->
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
    data() {
        return {
            selectedOptions: [],
        }
    },
    mounted() {
        this.selectedOptions = [...this.item.options.map(option => ({ title: option.title, value: option.values[0].value }))]
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
    methods: {
        handleAddToCartClick() {
            console.log('Товар добавлен в корзину с опциями:', ...this.selectedOptions.map(option => option.title + ': ' + option.value));
        },
        setOptionValue(optionTitle, optionValue) {
            const option = this.selectedOptions.find(option => option.title === optionTitle)
            option.value = optionValue
        }
    }
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
        aspect-ratio: 1 / 1;
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

    .options-block {
        width: 75%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 7px;
    }

    .option-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .option-row-title {
        width: 35%;
        font-size: 14px;
    }

    .option-row-select {
        width: 60%;
        font-size: 14px;
    }

    .add-to-cart {
        margin-top: 4%;
        width: 60%;
        border-radius: 4px;
        border: 1px solid @cBaseFive;
        height: 30px;

        color: @cBaseFour;
        font-weight: 700;
        transition: background-color 0.3s linear;
        cursor: pointer;

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