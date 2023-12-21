<template>
  <div class="wrapper">
    <div class="badge">{{badge}}</div>
    <a :href="`/products/${id}`" class="img" :style="`background-image: url(${img})`" />
    <div class="content">
      <div class="price">{{price}}</div>
      <div class="caption">{{ caption }}</div>
      <button class="button"><unicon name="shopping-cart" fill="white"></unicon> Add to cart</button>
      <div class="reviews">
        <div class="rating">
          <unicon name="star" :fill="`${rating > 0.5 ? 'orange' : 'grey'}`"></unicon>
          <unicon name="star" :fill="`${rating > 1.5 ? 'orange' : 'grey'}`"></unicon>
          <unicon name="star" :fill="`${rating > 2.5 ? 'orange' : 'grey'}`"></unicon>
          <unicon name="star" :fill="`${rating > 3.5 ? 'orange' : 'grey'}`"></unicon>
          <unicon name="star" :fill="`${rating > 4.5 ? 'orange' : 'grey'}`"></unicon>
        </div>
        {{ reviews }} Reviews
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ProductCard',
    props: ['price', 'img', 'id', 'badge', 'rating', 'reviews', 'caption', 'img']
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    position: relative;
    width: 285px;
    height: 500px;
    overflow: hidden;
    color: black;
  }
  .badge {
    position: absolute;
    top: 0;
    left: 0;
    background: black;
    color: white;
    width: min-content;
    padding: 1px 12px;
  }
  .img {
    display: block;
    //position: absolute;
    width: 100%;
    height: 50%;
    top: 20px;
    left: 0;
    background-size: cover;
    background-position: center;
  }
  .price {
    color: gray;
    margin-top: 28px;
    margin-bottom: 8px;
    font-size: 26px;
  }
  .button {
    background: black;
    color: white;
    border: none;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    margin-block: 8px;
  }
  .reviews {
    display: flex;
    align-items: center;
    width: 100%;
    column-gap: 12px;
  }
  .rating {
    display: flex;
    column-gap: 4px;
  }
  .icons {
    height: 12px;
    background: black;
  }
</style>
