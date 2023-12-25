<template>
  <div class="wrap">
    <div class="card">
      <div class="content">
        <div class="title">
          <div>suspension</div>
          <div>parts</div>
          <div>20 % off</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
    <div style="background-image: url('/car2.jpg')" class="card">
      <div class="content">
        <div class="title">
          <div>suspension</div>
          <div>parts</div>
          <div>20 % off</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
    <div style="background-image: url('/car1.jpg')" class="card">
      <div class="content">
        <div class="title">
          <div>suspension</div>
          <div>parts</div>
          <div>20 % off</div>
        </div>
        <button class="button">shop now</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import ProductCard from "@/components/parts/ProductCard.vue";
import {Carousel, CarouselItem} from "element-ui";
import ContentContainer from "@/components/parts/Container.vue";

import 'swiper/css';
import ProductTypeCard from "@/components/parts/ProductTypeCard.vue";
export default {
  name: 'SpecialCards',
}
</script>

<style scoped lang="scss">
  .wrap {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .card {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    background-position: center;
    background-size: cover;

    &:first-child {
      background: #41b883;
    }
  }
  .content {
    position: absolute;
    width: max-content;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;

    .title {
      text-transform: uppercase;
      width: 100%;
      div {
        &:first-child {
          font-size: 46px;
          font-weight: bold;
        }
        &:nth-child(2) {
          font-size: 52px;
          font-weight: 100;
        }
        &:nth-child(3) {
          font-size: 80px;
          font-weight: bold;
        }
      }
    }

    .button {
      border: 1px solid white;
      background: transparent;
      padding: 12px 20px;
      color: white;
      margin-top: 12px;
    }
  }
</style>
