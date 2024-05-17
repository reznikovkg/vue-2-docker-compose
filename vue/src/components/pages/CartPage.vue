<template>
  <PageLayout>
    <section class="section-cart">
      <div class="cart">
        <h1>Cart List</h1>
        <div class="cart__list">
          <div class="cart__list__product" v-for="(product, index) in cart" :key="index">
            <img class="cart__list__product__img" :src="product.images[0]" />
            <div class="cart__list__product__info">
              <p class="cart__list__product__info__name">{{ product.brand + " " + product.title }}</p>
              <p class="cart__list__product__info__category">{{ product.category }}</p>
            </div>
            <div class="cart__list__product__count">
              <button class="plus" @click="() => changeQuantity(product, 1)">
                <div class="plus--vector"></div>
              </button>
              <p>{{ product.quantity }}</p>
              <button class="minus" @click="() => changeQuantity(product, -1)">
                <div class="minus--vector"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout">
        <h1 style="color: white;">{{"Всего предметов - " + items }}</h1>
        <h1 style="color: white;">{{"Итоговая сумма - " + sum }}</h1>
        <button 
          class="checkout__btn"
          @click="() => order()"
        >
          Купить
        </button>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import { mapActions, mapGetters } from 'vuex'; 

export default {
  name: 'CartPage',
  components: {
    PageLayout,
  },
  data () {
    return {
      amount: 0
    }
  },
  computed: {
    ...mapGetters('cart', [
      'getCart',
      'getTotalSum',
      'getTotalItems'
    ]),
    cart () {
      return this.getCart
    },
    sum () {
      return this.getTotalSum
    },
    items () {
      return this.getTotalItems
    }
  },
  methods: {
    ...mapActions('cart', [
      'plusQuantityProduct',
      'minusQuantityProduct',
      'deleteProduct',
      'clearCart'
    ]),
    changeQuantity (product, changes) {
      if (changes > 0) {
        this.plusQuantityProduct(product)
      }
      else if(product.quantity == 1 && changes < 0) {
        this.deleteProduct(product)
      }
      else {
        this.minusQuantityProduct(product)
      }
    },
    order () {
      alert("Заказ оплачен")
      this.clearCart()
      this.$router.push({ name: 'STORE' })
    }
  }
}
</script>

<style scoped lang="less">
.section-cart {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  background: #ffffff;
  & .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 75vh;
    overflow-x: scroll;
    padding: 32px;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 3px;
      border: 1px solid white;
    }
    &__list {
      display: flex;
      flex-direction: column;
      gap: 30px;
      &__product {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        &__img {
          width: 60px;
          height: 60px;
        }
        &__count {
          display: flex;
          flex-direction: row;
          gap: 10px;
          & .minus {
            background: #000000;
            border: none;
            cursor: pointer;
            padding: 12px;
            border-radius: 12px;
            &--vector {
              width: 30px;
              height: 30px;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12L18 12' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
          & .plus {
            background: #000000;
            border: none;
            cursor: pointer;
            padding: 12px;
            border-radius: 12px;
            &--vector {
              width: 30px;
              height: 30px;
              background-position: center;
              background-repeat: no-repeat;
              background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 12H20M12 4V20' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
          }
        }
      }
    }
  }
  & .checkout {
    width: 300px;
    height: 75vh;
    background: #000;
    border-radius: 0px 0px 12px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    &__btn {
      border-radius: 12px;
      height: 60px;
      width: 50%;
      padding: 12px;
      color: black;
      background: #00ff59;
      cursor: pointer;
      font-size: 18px;
    }
  }
}
</style>
    