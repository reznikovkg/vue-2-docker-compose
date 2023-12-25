<template>
  <ContentContainer>
    <div class="title">{{ title }}</div>
    <div class="grid">
      <NewsCard v-for="item in items"
                   :title="item.title"
                   :img="item.img"
                   :id="item.id"
                   :caption="item.caption"
                   :badge="item.badge"
                   :rating="item.rating"
                   :reviews="item.reviews"
                   :price="item.price"
                   :discountPrice="item.discountPrice"
      />
    </div>
  </ContentContainer>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import ProductCard from "@/components/parts/ProductCard.vue";
  import {Carousel, CarouselItem} from "element-ui";
  import ContentContainer from "@/components/parts/Container.vue";

  import 'swiper/css';
  import ProductTypeCard from "@/components/parts/ProductTypeCard.vue";
  import NewsCard from "@/components/parts/NewsCard.vue";
  export default {
    name: 'News',
    components: {
      NewsCard,
      CarouselItem, ContentContainer, Carousel,
      ProductCard,Swiper,
      SwiperSlide,
    },
    props: ['items', 'title'],
  }
</script>

<style scoped lang="scss">
  .title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin-top: 40px;
  }
  .grid {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    margin-top: 40px;
  }
</style>
