<template>
  <div class="wrapper">
    <carousel class="carousel" height="100%">
      <carousel-item v-for="item in items" :key="item.src">
        <img class="img" :src="`/${item.src}`" />
        <ContentContainer class="container">
          <div class="content">
            <div class="caption">{{item.caption}}</div>
            <div class="title">{{item.title}}</div>
            <button class="button">shop now!</button>
          </div>
        </ContentContainer>
      </carousel-item>
    </carousel>
  </div>
</template>

<script>
import ContentContainer from "./Container.vue";
import SearchInput from './Search.vue';
import {Carousel, CarouselItem, Button} from "element-ui";

export default {
  name: "MainSlider",
  components: {ContentContainer, Carousel, CarouselItem, SearchInput},
  data() {
    return {
      items: [
        {
          src: 'car3.jpg',
          title: 'Buy trustworthy',
          caption: 'the quality is beyound excellence'
        },
        {
          src: 'car2.jpg',
          title: 'Buy trustworthy',
          caption: 'the quality is beyound excellence'
        },
      ]
    }
  }
};
</script>

<style scoped lang="scss">
  .img {
    max-width: 100%;
  }
  .wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.6%;
  }
  .carousel {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    color: #FAFAFA;
    height: 100%;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
  }
  .caption {
    text-transform: uppercase;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .title {
    text-transform: uppercase;
    font-size: 48px;
    font-weight: bold;
  }
  .button {
    padding: 12px 18px;
    background: #41b883;
    color: white;
    border: none;
    font-size: 14px;
    margin-top: 24px;
    text-transform: uppercase;
  }
</style>
