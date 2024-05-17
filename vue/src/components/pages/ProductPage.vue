<template>
  <PageLayout>
    <div class="product-view">
      <GalleryUI :images="product.images" />
      <div class="product-view__info">
        <p class="product-view__info__brand">{{ product.brand }}</p>
        <p class="product-view__info__title">{{ product.title }}</p>
        <p class="product-view__info__category">{{ product.category }}</p>
        <h2>Описание</h2>
        <p class="product-view__info__description">{{ product.description }}</p>
        <div class="product-view__buy">
          <p class="product-view__buy__price">{{ "$" + product.price }}</p>
          <button
            class="buy-btn"
            @click="() => buyProduct()"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
  
<script>
import PageLayout from '../parts/PageLayout.vue';
import GalleryUI from '@/components/ui/GalleryUI.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    PageLayout,
    GalleryUI
  },
  computed: {
    ...mapGetters('products', [
      'getProductByID'
    ]),
    id () {
      return this.$route.params.id
    },
    product () {
      return this.getProductByID(this.id)
    }  
  },
  methods: {
    ...mapActions('cart', [
      'addProduct',
    ]),
    buyProduct () {
      this.addProduct(this.product)
      alert('Добавлено в корзину')
    }
  }
}
</script>

<style scoped lang="less">
.product-view {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  align-items: center;
  padding: 64px 16px;
  &__info {
    width: 40%;
    display: flex;
    flex-direction: column;
    &__brand {
      font-size: 20px;
      font-weight: 500;
      margin: 0;
    }
    &__title {
      font-size: 22px;
      font-weight: 600;
      margin: 0;
    }
    &__category {
      font-size: 18px;
      font-weight: 500;
      margin: 0;
    }
    &__description {
      width: 60%;
    }
  }
  &__buy {
    width: 300px;
    border-radius: 12px;
    display: flex;
    padding: 32px;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    align-items: center;
    background: #000;
    &__price {
      color: #ffffff;
      font-size: 22px;
      font-weight: 600;
      margin: 0;
    }
    & .buy-btn {
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
      &:hover {
        background: #603f3f;
        color: white;
      }
    }
  }
}
</style>
    