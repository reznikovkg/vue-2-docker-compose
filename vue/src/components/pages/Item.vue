<template>
  <PageLayout>
    <section class="item-page">
      <div class="item-page__image-slider-cnt">
        <ImageSlider :images="item.images" />
      </div>
      <div class="item-page__info-block">
        <div class="item-page__name-cnt">
          <h2 class="item-page__name">{{ item.name }}</h2>
        </div>
        <hr class="item-page__separator" />
        <p class="item-page__description">
          {{ item.description }}
        </p>
        <hr class="item-page__separator" />
        <div class="item-page__info-list">
          <div
            class="item-page__info-row"
            v-for="infoRow in item.information"
            :key="infoRow.title"
          >
            <h4 class="item-page__info-row-title">{{ infoRow.title }}:</h4>
            <h4 class="item-page__info-row-value">{{ infoRow.value }}</h4>
          </div>
        </div>
        <hr class="item-page__separator" />
        <div class="item-page__options-block">
          <div
            class="item-page__option-row"
            v-for="option in item.options"
            :key="option.title"
          >
            <p class="item-page__option-row-title">{{ option.title }}:</p>
            <select
              class="item-page__option-row-select"
              @change="(e) => setOptionValue(option.title, e.target.value)"
            >
              <option
                v-for="optionValue in option.values"
                :key="optionValue.id"
                :value="optionValue.value"
              >
                {{ optionValue.name }}
              </option>
            </select>
          </div>
        </div>
        <hr class="item-page__separator" />
        <CustomButton
          class="item-page__add-to-cart"
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
        <p class="item-page__quantity-left">Осталось {{ item.count }}</p>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from "../parts/PageLayout";
import ImageSlider from "../parts/ImageSlider";
import CustomButton from "../parts/Button.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ItemPage",
  components: {
    PageLayout,
    ImageSlider,
    CustomButton,
  },
  data() {
    return {
      selectedOptions: [],
    };
  },
  mounted() {
    this.selectedOptions = [
      ...this.item.options.map((option) => ({
        title: option.title,
        value: option.values[0].value,
      })),
    ];
  },
  computed: {
    ...mapGetters("catalog", ["getItemFromCatalogById"]),
    ...mapGetters("cart", ["getCart"]),
    item() {
      return this.getItemFromCatalogById(this.$route.params.itemId.slice(1));
    },
    cartItem() {
      return this.getCart.find((elem) => elem.id === this.item.id);
    },
    showPricesChange() {
      return this.item.price.currentPrice !== this.item.price.originalPrice;
    },
    getImage() {
      return this.item.images.find((image) => image.type === "main").url;
    },
  },
  methods: {
    ...mapMutations("cart", [
      "addItemToCart",
      "removeAllItemsFromCart",
      "removeItemFromCart",
      "changeItem",
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
        selectCount: "1",
      });
    },
    setOptionValue(optionTitle, optionValue) {
      const option = this.selectedOptions.find(
        (option) => option.title === optionTitle
      );
      option.value = optionValue;
    },
    onChangeCount(value) {
      const count = Number(this.cartItem.selectCount) + Number(value);
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
  gap: 30px;
  font-size: 12px;
  padding: 5%;

  &__image-slider-cnt {
    flex: 1;
    aspect-ratio: 1 / 1;
  }

  &__info-block {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1% 0 2% 0;

    background-color: @cBaseSeven;
    border-radius: 10%;
  }

  &__name-cnt {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 6rem;
    width: 80%;
  }

  &__name {
    font-size: 22px;
    text-align: center;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__separator {
    width: 80%;
  }

  &__description {
    font-size: 16px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: justify;
  }

  &__info-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 75%;
  }

  &__info-row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 5%;
  }

  &__info-row-title {
    width: 35%;
  }

  &__info-row-value {
    width: 60%;
  }

  &__options-block {
    width: 75%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
  }

  &__option-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__option-row-title {
    width: 35%;
    font-size: 14px;
  }

  &__option-row-select {
    width: 60%;
    font-size: 14px;
  }

  &__add-to-cart {
    margin-top: 4%;
    width: 60%;
    border-radius: 4px;
    // border: 1px solid @cBaseFive;
    // height: 30px;

    // color: @cBaseFour;
    // font-weight: 700;
    // transition: background-color 0.3s linear;
    // cursor: pointer;

    // &:hover {
    //   border: 1px solid @cBaseThree;
    //   color: @cBaseThree;
    // }

    // &:active {
    //   transition: none;
    //   background-color: @cBaseFive;
    // }
  }

  &__quantity-left {
    opacity: 0.6;
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
