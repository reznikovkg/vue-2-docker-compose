<template>
  <div class="wrapper">
    <div class="badge" :class="{ badge_sale: badge==='sale' }">{{badge}}</div>
    <a :href="`/products/${id}`" class="img" :style="`background-image: url(${img})`" />
    <div class="content">
      <Price :discount-price="discountPrice" :price="price" />
      <div class="caption">{{ title }}</div>
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
      <div class="buttons">
        <unicon class="icon" name="heart" fill="currentColor"></unicon>
        <unicon class="icon" name="balance-scale" fill="currentColor"></unicon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Price from "@/components/parts/shared/Price.vue";

  export default {
    name: 'ProductCard',
    components: {Price},
    props: ['price', 'img', 'id', 'badge', 'rating', 'reviews', 'caption', 'discountPrice', 'title']
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

    &_sale {
      background: #D94E67;
    }
  }
  .buttons {
    margin-top: 8px;
    display: flex;
    color: lightgray;
    column-gap: 20px;

    .icon {
      transition: 0.1s color;
      cursor: pointer;

      &:hover {
        color: gray;
      }
    }
  }
  .img {
    display: block;
    width: 100%;
    height: 50%;
    top: 20px;
    left: 0;
    background-size: cover;
    background-position: center;
  }
  .priceWrapper {
    display: flex;
    align-items: flex-end;
    column-gap: 12px;
    margin-top: 28px;
    margin-bottom: 8px;
  }
  .price {
    color: gray;
    font-size: 26px;

    &_new {
      color: #8C2B3D;
    }

    &_old {
      position: relative;
      font-size: 16px;
      color: gray;
      padding-bottom: 2px;

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background: currentColor;
        top: calc(50% - 2px);
      }
    }
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
  .caption {
    display:inline-block;
    text-overflow: ellipsis;
    max-width: 70%;
    height: 1.2em;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
