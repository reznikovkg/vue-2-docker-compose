<template>
  <PageLayout>
    <section class="add-to-catalog-page">
      <div class="add-to-catalog-page__inputs-block">
        <h4 class="add-to-catalog-page__block-title">Название и описание</h4>
        <div class="add-to-catalog-page__inputs-container">
          <CustomTextarea label="Название" placeholder="Введите название" v-model="name"
            class="add-to-catalog-page__name-input" />
          <CustomTextarea label="Описание" placeholder="Введите описание" v-model="description"
            class="add-to-catalog-page__description-input" />
        </div>
      </div>
      <div class="add-to-catalog-page__inputs-block">
        <h4 class="add-to-catalog-page__block-title">Свойства</h4>
        <div class="add-to-catalog-page__information-rows">
          <div class="add-to-catalog-page__information-row" v-for="(info, index) in information"
            :key="'InformationField' + index">
            <CustomInput :label="info.title" :value="info.value" @click="(e) => onInfoChange(e.target.value, index)" />
          </div>
        </div>
      </div>
      <div class="add-to-catalog-page__inputs-block">
        <h4 class="add-to-catalog-page__block-title">Цена и количество</h4>
        <div class="add-to-catalog-page__inputs-container">
          <CustomInput type="number" label="Цена" placeholder="Введите цену" v-model="originalPrice"
            class="add-to-catalog-page__prices-input" />
          <CustomInput type="number" :label="getTitleForCurrentPrice" :error="checkIsPricesWrong"
            placeholder="Введите цену со скидкой" v-model="currentPrice" class="add-to-catalog-page__prices-input" />
          <CustomInput type="number" label="Количество" placeholder="Введите количество" v-model="count"
            class="add-to-catalog-page__prices-input" />
        </div>
      </div>

      <div class="add-to-catalog-page__inputs-block">
        <h4 class="add-to-catalog-page__block-title">Фотографии</h4>
        <div class="add-to-catalog-page__inputs-container">
          <div class="add-to-catalog-page__images" v-if="images.length">
            <div class="add-to-catalog-page__image-wrapper" v-for="(img, index) in images" :key="'image' + index">
              <img class="add-to-catalog-page__image" :src="img.url" />
              <CustomButton type="delete" :filled="true" @click="() => onImageDelete(index)" />
            </div>
          </div>
          <CustomFileInput @upload="onFileUpload" />
        </div>
      </div>

      <div class="add-to-catalog-page__inputs-block">
        <h4 class="add-to-catalog-page__block-title">Категории</h4>
        <div class="add-to-catalog-page__inputs-container">
          <CustomInput label="Категория" placeholder="Введите категорию" v-model="category"
            class="add-to-catalog-page__category-input" />
          <CustomInput label="Подкатегория" placeholder="Введите подкатегорию" v-model="subcategory"
            class="add-to-catalog-page__category-input" />
        </div>
      </div>
      <div class="add-to-catalog-page__save-wrapper">
        <CustomButton class="add-to-catalog-page__save" @click="onSave" :filled="true">
          Сохранить
        </CustomButton>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from "../parts/PageLayout";
import CustomInput from "../parts/Input.vue";
import CustomButton from "../parts/Button.vue";
import CustomTextarea from "../parts/Textarea.vue";
import CustomFileInput from "../parts/FileInput.vue";

export default {
  name: "AddItemPage",
  components: {
    PageLayout,
    CustomInput,
    CustomButton,
    CustomTextarea,
    CustomFileInput,
  },
  data() {
    return {
      name: "",
      description: "",
      information: [
        {
          "title": "Производитель",
          "value": ""
        },
        {
          "title": "Место производства",
          "value": ""
        },
        {
          "title": "Упаковка",
          "value": ""
        },
        {
          "title": "Состав",
          "value": ""
        },
        {
          "title": "Энергетическая ценность",
          "value": ""
        }
      ],
      currentPrice: "",
      originalPrice: "",
      count: "",
      images: [
        {
          url: "https://cdn1.ozone.ru/s3/multimedia-r/c600/6855038235.jpg",
          type: "main",
        },
        {
          url: "https://media.gq.com/photos/5e6944f74d6be70008ac16c2/master/w_2000,h_1333,c_limit/Uniqlo-U-crew-neck-short-sleeve-T-shirt.jpg",
          type: "secondary",
        },
      ],
      category: "",
      subcategory: "",
      options: [
        {
          title: "sizes",
          values: [
            {
              id: "1",
              name: "S",
              value: "S",
            },
            {
              id: "2",
              name: "M",
              value: "M",
            },
          ],
        },
      ],
    };
  },
  computed: {
    checkIsPricesWrong() {
      return Boolean(this.currentPrice && this.originalPrice && this.currentPrice >= this.originalPrice)
    },
    getTitleForCurrentPrice() {
      return this.checkIsPricesWrong
        ? 'Цена по скидке больше начальной'
        : 'Цена со скидкой'
    }
  },
  methods: {
    onInfoChange(value, index) {
      this.information[index] = value
    },
    onFileUpload(file) {
      this.images = [
        ...this.images,
        {
          url: URL.createObjectURL(file),
          type: "secondary",
        },
      ];
    },
    onImageDelete(index) {
      this.images = this.images.filter((_, i) => i !== index);
    },
    onSave() {
      console.log({
        id: Date.now(),
        name: this.name,
        brand: this.brand,
        description: this.description,
        information: this.information,
        price: {
          currentPrice: this.currentPrice,
          originalPrice: this.originalPrice,
        },
        images: this.images,
        count: this.count,
        category: this.category,
        options: this.options,
      });
    },
  },
};
</script>

<style scoped lang="less">
.add-to-catalog-page {
  display: flex;
  flex-direction: column;
  gap: 45px;

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

  &__prices-input,
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
