<template>
  <PageLayout>
    <ContentContainer class="container">
      <h1 class="title">{{el.title}}</h1>
      <div class="caption">{{el.caption}}</div>
      <img class="img" :src="`${el.img}`" />
      <Price :price="el.price" :discount-price="el.discountPrice" />
    </ContentContainer>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import MainSlider from '../parts/MainSlider.vue'
import ProductTypes from '../parts/ProductTypes.vue'
import ProductCard from '../parts/ProductCard.vue'
import Products from '../parts/Products.vue'
import SpecialCards from '../parts/SpecialCards.vue'
import Contacts from '../parts/Contacts.vue'
import { helpModal } from "@/mixins/modals";
import {productsModel, productTypesModel} from "@/components/mock";
import ContentContainer from "@/components/parts/Container.vue";
import Price from "@/components/parts/shared/Price.vue";

export default {
  name: 'ProductPage',
  components: {
    Price,
    ContentContainer,
    PageLayout,
    MainSlider,
    ProductTypes,
    Contacts,
    ProductCard,
    Products,
    SpecialCards
  },
  data() {
    return {
      el: productsModel.getOne(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  .container {
    min-height: calc(100vh - 180px - 258px);
  }
  .title {
    font-size: 40px;
    text-transform: uppercase;
  }
</style>
