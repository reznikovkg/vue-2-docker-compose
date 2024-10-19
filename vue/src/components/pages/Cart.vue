<template>
  <PageLayout>
    <h1 class="header">Корзина</h1>
    <div class="cart">
      <div class="cart__items">
        <CartItem
          v-for="(item, index) in getCart"
          :key="index"
          :item="item"
          @changeCount="(value) => onChangeCount(item, value)"
        />
      </div>
      <div class="cart__information">
        <div class="cart__information__price">
          <p class="cart__information__price__info">Товаров: {{ amount }}</p>
          <p class="cart__information__price__original-sum">
            {{ sumOriginal }} ₽
          </p>
        </div>
        <div class="cart__information__price" v-if="sumDiscount > 0">
          <p class="cart__information__price__info">Скидка</p>
          <p class="cart__information__price__discount-sum">
            - {{ sumDiscount }} ₽
          </p>
        </div>
        <span class="cart__information__divider" />
        <div class="cart__information__price">
          <p class="cart__information__price__info">Итог</p>
          <p class="cart__information__price__final-sum">
            {{ calculatingAmount }} ₽
          </p>
        </div>

        <CustomButton @click="removeAllItemsFromCart">Удалить все</CustomButton>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from "../parts/PageLayout.vue";
import CartItem from "../parts/CartItem.vue";
import CustomButton from "../parts/Button.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CartPage",
  components: {
    PageLayout,
    CartItem,
    CustomButton,
  },
  methods: {
    ...mapMutations("cart", [
      "addItemToCart",
      "removeAllItemsFromCart",
      "removeItemFromCart",
      "changeItem",
    ]),
    onChangeCount(item, value) {
      const count = Number(item.selectCount) + Number(value);
      if (count <= item.count && count > 0) {
        item.selectCount = count;
        this.changeItem(item);
      }
      if (count === 0) this.removeItemFromCart(item);
    },
  },
  computed: {
    ...mapGetters("cart", ["getCart"]),
    amount() {
      return this.getCart.length;
    },
    calculatingAmount() {
      const products = this.getCart;
      return products.reduce(
        (sum, product) =>
          sum +
          Number((product.price?.currentPrice ?? 0) * product.selectCount),
        0
      );
    },
    sumOriginal() {
      const products = this.getCart;
      return products.reduce(
        (sum, product) =>
          sum +
          Number((product.price?.originalPrice ?? 0) * product.selectCount),
        0
      );
    },
    sumDiscount() {
      return this.sumOriginal - this.calculatingAmount;
    },
  },
};
</script>

<style scoped lang="less">
.header {
  font-family: Rubik;
  font-size: 64px;
  font-weight: 700;
  line-height: 96px;
  text-align: left;
  margin-bottom: 60px;
}
.cart {
  display: flex;
  flex-direction: row;
  gap: 40px;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 470px;
    width: 896px;

    overflow: auto;
  }

  &__information {
    width: 272px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__divider {
      height: 2px;
      background-color: @cDivider;
    }
    &__price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__info {
        font-family: Rubik;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: @cBaseNine;
      }
      &__original-sum {
        font-family: Rubik;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: @cBaseTen;
      }
      &__discount-sum {
        font-family: Rubik;
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
        color: @cBaseTwelve;
      }
      &__final-sum {
        font-family: Rubik;
        font-size: 24px;
        font-weight: 700;
        line-height: 36px;
        text-align: right;
        color: @cBaseBlack;
      }
    }
  }
}
</style>
