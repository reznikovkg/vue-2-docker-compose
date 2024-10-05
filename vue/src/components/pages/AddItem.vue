<template>
  <PageLayout>
    <header>
      <h1>Добавление продукта</h1>
    </header>
    <main>
      <div class="name-wrapper">
        <CustomInput
          label="Название"
          placeholder="Введите название"
          v-model="name"
          class="small-input"
        />
        <CustomInput
          label="Бренд"
          placeholder="Введите бренд"
          v-model="brand"
          class="small-input"
        />
      </div>
      <CustomTextarea
        label="Описание"
        placeholder="Введите описание"
        v-model="description"
      />
      <h4>Характеристики</h4>
      <InformationField
        v-for="(info, index) in information"
        :key="'InformationField' + index"
        :info="info"
        @changeInfo="(value) => onInfoChange(index, value)"
        @delete="() => onInfoDelete(index)"
      />
      <CustomButton class="add-button" @click="onAddInfoClick">
        Добавить свойство
      </CustomButton>
      <h4>Цена</h4>
      <CustomInput
        type="number"
        label="Цена"
        placeholder="Введите цену"
        v-model="originalPrice"
        class="small-input"
      />
      <CustomInput
        type="number"
        :label="
          currentPrice >= originalPrice
            ? 'Цена по скидке не может быть больше оригинальной цены'
            : 'Цена со скидкой'
        "
        placeholder="Введите цену со скидкой"
        :value="currentPrice"
        @input="onCurrentPriceChange"
        class="small-input"
      />
      <CustomInput
        type="number"
        label="Количество"
        placeholder="Введите количество"
        v-model="count"
        class="small-input"
      />
      <h4>Фотографии</h4>
      <div class="images" v-if="images.length">
        <div
          class="img-wrapper"
          v-for="(img, index) in images"
          :key="'image' + index"
        >
          <img class="photo" :src="img.url" />
          <CustomButton type="delete" @click="() => onPhotoDelete(index)" />
        </div>
      </div>
      <CustomFileInput @upload="onFileUpload" />
      <h4>Категория</h4>
      <CategoryField
        v-for="(item, index) in category"
        :key="'CategoryField' + index"
        :category="item"
        @categoryChange="(value) => onCategoryChange(index, value)"
        @delete="() => onCategoryDelete(index)"
      />
      <CustomButton class="add-button" @click="onCategoryAdd">
        Добавить категорию
      </CustomButton>
      <h4>Опции</h4>
      <OptionField
        v-for="(option, index) in options"
        :key="'OptionField' + option.id + index"
        :option="option"
        @optionChange="(value) => onOptionChange(index, value)"
        @delete="() => onOptionDelete(index)"
      />
      <CustomButton class="add-button" @click="onOptionAdd">
        Добавить опцию
      </CustomButton>
      <div class="save-wrapper">
        <CustomButton class="add-button" @click="onSave">
          Сохранить
        </CustomButton>
      </div>
    </main>
  </PageLayout>
</template>

<script>
import PageLayout from "../parts/PageLayout";
import CustomInput from "../parts/Input.vue";
import CustomButton from "../parts/Button.vue";
import CustomTextarea from "../parts/Textarea.vue";
import InformationField from "../parts/InformationField.vue";
import CustomFileInput from "../parts/FileInput.vue";
import CategoryField from "../parts/CategoryField.vue";
import OptionField from "../parts/OptionField.vue";

export default {
  name: "AddItemPage",
  components: {
    PageLayout,
    CustomInput,
    CustomButton,
    CustomTextarea,
    InformationField,
    CustomFileInput,
    OptionField,
    CategoryField,
  },
  data() {
    return {
      name: "",
      brand: "",
      description: "",
      information: [
        {
          title: "Производитель",
          value: "Nike",
        },
        {
          title: "Материалы",
          value: "Хлопок 90%, Любовь 10%",
        },
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
      category: ["Одежда", "Футблоки"],
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
  methods: {
    onInfoChange(index, value) {
      this.information = this.information.map((info, i) =>
        i === index ? value : info
      );
    },
    onInfoDelete(index) {
      this.information = this.information.filter((_, i) => i !== index);
    },
    onAddInfoClick() {
      this.information = [
        ...this.information,
        {
          title: "",
          value: "",
        },
      ];
    },
    onCurrentPriceChange(value) {
      this.currentPrice =
        Number(this.currentPrice) <= Number(this.originalPrice)
          ? value
          : this.originalPrice;
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
    onPhotoDelete(index) {
      this.images = this.images.filter((_, i) => i !== index);
    },
    onCategoryChange(index, value) {
      this.category = this.category.map((info, i) =>
        i === index ? value : info
      );
    },
    onCategoryDelete(index) {
      this.category = this.category.filter((_, i) => i !== index);
      console.log(this.category);
    },
    onCategoryAdd() {
      this.category = [...this.category, ""];
    },
    onOptionChange(index, value) {
      this.options = this.options.map((option, i) =>
        i === index ? value : option
      );
    },
    onOptionDelete(index) {
      this.options = this.options.filter((_, i) => i !== index);
    },
    onOptionAdd() {
      this.options = [...this.options, { title: "", values: [] }];
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
header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 24px;
}
.name-wrapper {
  display: flex;
  gap: 24px;
}
.small-input {
  width: 50%;
}
.photo {
  width: 100px;
  height: 100px;
  object-fit: scale-down;
  border-radius: 4px;
  background-color: white;
  border: 1px solid black;
}
.add-button {
  width: 200px;
}
.images {
  display: flex;
  gap: 16px;
}
.img-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.save-wrapper {
  display: flex;
  justify-content: center;
}
</style>
