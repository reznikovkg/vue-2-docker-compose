<template>
    <PageLayout>
        <section class="item-form">
            <div class="item-form__inputs-block">
                <h4 class="item-form__block-title">Название и описание</h4>
                <div class="item-form__inputs-container">
                    <CustomTextarea
                        v-model="name"
                        class="item-form__name-input"
                        label="Название"
                        placeholder="Введите название"
                    />
                    <CustomTextarea
                        v-model="description"
                        label="Описание"
                        placeholder="Введите описание"
                        class="item-form__description-input"
                    />
                </div>
            </div>
            <div class="item-form__inputs-block">
                <h4 class="item-form__block-title">Свойства</h4>
                <div class="item-form__information-rows">
                    <div
                        v-for="(info, index) in information"
                        :key="'InformationField' + index"
                        class="item-form__information-row"
                    >
                        <CustomInput
                            :value="info.value"
                            @input="(e) => onInfoChange(e, index)"
                            :label="info.title"
                        />
                    </div>
                </div>
            </div>
            <div class="item-form__inputs-block">
                <h4 class="item-form__block-title">Цена и количество</h4>
                <div class="item-form__inputs-container">
                    <CustomInput
                        v-model="originalPrice"
                        class="item-form__prices-quantity-input"
                        type="number"
                        label="Цена"
                        placeholder="Введите цену"
                    />
                    <CustomInput
                        v-model="currentPrice"
                        class="item-form__prices-quantity-input"
                        :label="getTitleForCurrentPrice"
                        :error="checkIsPricesWrong"
                        type="number"
                        placeholder="Введите цену со скидкой"
                    />
                    <CustomInput
                        v-model="count"
                        class="item-form__prices-quantity-input"
                        type="number"
                        label="Количество"
                        placeholder="Введите количество"
                    />
                </div>
            </div>

            <div class="item-form__inputs-block">
                <h4 class="item-form__block-title">Фотографии</h4>
                <div class="item-form__inputs-container">
                    <div v-if="images.length" class="item-form__images">
                        <div
                            v-for="(img, index) in images"
                            :key="'image' + index"
                            class="item-form__image-wrapper"
                        >
                            <img :src="img.url" class="item-form__image" />
                            <CustomButton
                                :type="'delete'"
                                @click="() => onImageDelete(index)"
                            />
                        </div>
                    </div>
                    <CustomFileInput @upload="onFileUpload" />
                </div>
            </div>

            <div class="item-form__inputs-block">
                <h4 class="item-form__block-title">Категории</h4>
                <div class="item-form__inputs-container">
                    <CustomInput
                        v-model="category"
                        class="item-form__category-input"
                        label="Категория"
                        placeholder="Введите категорию"
                    />
                    <CustomInput
                        v-model="subcategory"
                        class="item-form__category-input"
                        label="Подкатегория"
                        placeholder="Введите подкатегорию"
                    />
                </div>
            </div>
            <div class="item-form__save-wrapper">
                <CustomButton
                    :type="'filledGreen'"
                    @click="handleSaveData"
                    class="item-form__save"
                >
                    Сохранить
                </CustomButton>
            </div>
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout';
import CustomInput from '../parts/Input.vue';
import CustomButton from '../parts/Button.vue';
import CustomTextarea from '../parts/Textarea.vue';
import CustomFileInput from '../parts/FileInput.vue';

export default {
    name: 'ItemForm',
    components: {
        PageLayout,
        CustomInput,
        CustomButton,
        CustomTextarea,
        CustomFileInput,
    },
    props: {
        handleParseData: Function,
    },
    data() {
        return {
            name: '',
            description: '',
            information: [
                {
                    title: 'Производитель',
                    value: '',
                },
                {
                    title: 'Место производства',
                    value: '',
                },
                {
                    title: 'Упаковка',
                    value: '',
                },
                {
                    title: 'Состав',
                    value: '',
                },
                {
                    title: 'Энергетическая ценность',
                    value: '',
                },
            ],
            currentPrice: '',
            originalPrice: '',
            count: '',
            images: [
                {
                    url: 'https://cdn1.ozone.ru/s3/multimedia-r/c600/6855038235.jpg',
                    type: 'main',
                },
                {
                    url: 'https://media.gq.com/photos/5e6944f74d6be70008ac16c2/master/w_2000,h_1333,c_limit/Uniqlo-U-crew-neck-short-sleeve-T-shirt.jpg',
                    type: 'secondary',
                },
            ],
            category: '',
            subcategory: '',
        };
    },
    computed: {
        checkIsPricesWrong() {
            return Boolean(
                this.currentPrice &&
                    this.originalPrice &&
                    Number(this.currentPrice) >= Number(this.originalPrice)
            );
        },
        getTitleForCurrentPrice() {
            return this.checkIsPricesWrong
                ? 'Цена по скидке больше начальной'
                : 'Цена со скидкой';
        },
    },
    methods: {
        onInfoChange(value, index) {
            this.information[index].value = value;
        },
        onFileUpload(file) {
            this.images = [
                ...this.images,
                {
                    url: URL.createObjectURL(file),
                    type: 'secondary',
                },
            ];
        },
        onImageDelete(index) {
            this.images = this.images.filter((_, i) => i !== index);
        },
        handleSaveData() {
            this.handleParseData({
                id: String(Date.now()),
                name: this.name,
                description: this.description,
                information: this.information,
                price: {
                    currentPrice: this.currentPrice,
                    originalPrice: this.originalPrice,
                },
                images: this.images,
                count: this.count,
                category: this.category,
                subcategory: this.subcategory,
            });
        },
    },
};
</script>

<style scoped lang="less">
.item-form {
    display: flex;
    flex-direction: column;
    gap: 45px;
    padding-bottom: 50px;

    &__inputs-block {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__block-title {
        font-size: 36px;
        font-weight: 700;
        line-height: 54px;
        text-align: left;
        color: @cBaseTen;
    }

    &__inputs-container {
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
    }

    &__name-input {
        flex: 2;
    }

    &__description-input {
        flex: 3;
    }

    &__information-rows {
        display: flex;
        flex-wrap: wrap;
        gap: 20px 40px;
    }

    &__information-row {
        width: 275px;
    }

    &__prices-quantity-input,
    &__category-input {
        flex: 1;
    }

    &__images {
        display: flex;
        gap: 16px;
    }

    &__image-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
    }

    &__image {
        width: 100px;
        height: 100px;
        object-fit: scale-down;
        border-radius: 4px;
        background-color: white;
        border: 1px solid black;
    }

    &__save-wrapper {
        display: flex;
        justify-content: center;
    }

    &__save {
        width: 200px;
    }
}
</style>
