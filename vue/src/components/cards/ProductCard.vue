<template>
  <div 
    class="product" 
    @mouseover="() => modalSwitch(true)"
    @mouseleave="() => modalSwitch(false)"
  >
    <div class="product__info">
      <p class="product__info__brand">{{ product.brand }}</p>
      <p class="product__info__title">{{ product.title }}</p>
      <p class="product__info__category">{{ product.category }}</p>
    </div>
    <img class="product__image" :src="product.images[0]" alt="Product Image">
    <div class="product__info">
        <p class="product__info__description">{{ product.description }}</p>
        <p class="product__info__price">{{ '$' + product.price }}</p>
    </div>
    <div class="product__overlay" v-show="modal">
      <button class="product__overlay__btn" @click="() => redirectToProductPage()">Страница продукта</button>
      <button class="product__overlay__btn" @click="() => buyProduct()">Купить</button>
      <button v-if="mode" class="product__overlay__btn" @click="() => changeProduct()">Редактировать</button>
      <button v-if="mode" class="product__overlay__btn" @click="() => deleteItem()">Удалить</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modal: false,
      inCart: false
    }
  },
  computed: {
    ...mapGetters('settings', [
      'getMode'
    ]),
    mode () {
      return this.getMode
    }
  },
  methods: {
    ...mapActions('cart', [
      'addProduct',
    ]),
    ...mapActions('products', [
      'deleteProduct'
    ]),
    modalSwitch (flag) {
      this.modal = flag
    },
    redirectToProductPage () {
      this.$router.push({ name: 'PRODUCT', params: { id: this.product.id }})
    },
    buyProduct () {
      this.addProduct(this.product)
    },
    changeProduct () {
      this.$router.push({ name: 'EDIT', params: {id: this.product.id} })
    },
    deleteItem () {
      this.deleteProduct(this.product)
    }
  }
}
</script>

<style scoped lang="less">
.product {
  position: relative;
  width: 450px;
  height: 600px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  box-shadow: 2px 3.5px 6.5px 3px #dddddd;
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.69);
    border-radius: 12px;
    display: none;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    &__btn {
      width: 150px;
      padding: 15px 10px;
      background-color: #fff;
      border: none;
      border-radius: 12px;
      color: #000;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all .3s ease-in-out;
    }
    &__btn:hover {
      background: #000;
      color: white;
      scale: 1.2;
    }
  }
  &__image {
    width: 70%;
    max-height: 300px;
    border-radius: 5px;
  }
  &__info {
    width: 80%;
    &__brand {
      font-size: 20px;
      font-weight: 500;
    }
    &__title {
      font-size: 22px;
      font-weight: 600;
    }
    &__category {
      font-size: 18px;
      font-weight: 500;
    }
    &__price {
      font-size: 22px;
      font-weight: 600;
      text-align: center;
    }
    &__description {
      text-align: center;
    }
    &__rating {
      margin-top: 5px;
    }
  }
}

.product:hover .product__overlay {
  display: flex;
}
</style>
