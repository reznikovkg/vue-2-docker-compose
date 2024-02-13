<template>
  <PageLayout>
    <ContentContainer class="container">
      <div class="layout">
        <div class="info">
          <h1 class="title">{{el.title}}</h1>
          <div class="caption">{{el.caption}}</div>
          <Price :price="el.price" :discount-price="el.discountPrice" />
        </div>
        <img class="img" :src="`${el.img}`" />
      </div>
    </ContentContainer>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import {productsModel} from "@/components/mock";
import ContentContainer from "@/components/parts/Container.vue";
import Price from "@/components/parts/shared/Price.vue";

export default {
  name: 'ProductPage',
  components: {
    Price,
    ContentContainer,
    PageLayout
  },
  data() {
    return {
      el: productsModel.getOne(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  .layout {
    padding-block: 60px;
    display: flex;
    justify-content: space-between;
    column-gap: 40px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .img {
    max-width: 50%;
  }
  .container {
    min-height: calc(100vh - 180px - 258px);
  }
  .title {
    font-size: 40px;
    text-transform: uppercase;
  }
</style>
