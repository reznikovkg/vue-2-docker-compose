<template>
  <div class="product-card-detail">
    <div class="product-card-detail__thumbnails">
      <img v-for="(image, index) in card.images" :key="index" :src="image" alt="" @mouseover="() => 
      changeMainImage(image)" class="thumbnail">
    </div>
    <div class="product-card-detail__img-container">
      <img class="product-card-detail__img" :src="mainImage" alt="">
    </div>
    <div class="product-card-detail__content">
      <h1 class="product-card-detail__content__title">{{ card.title }}</h1>
      <h2 class="product-card-detail__content__subtitle">{{ card.subtitle }}</h2>
      <p class="product-card-detail__content__description">{{ card.description }}</p>
      <div class="product-card-detail__content__info">
        <span><b>Brand:</b> {{ card.brand }}</span>
        <span><b>Category:</b> {{ card.category }}</span>
        <span><b>Material:</b> {{ card.material }}</span>
      </div>
      <div class="product-card-detail__sizes">
        <b>Sizes:</b>    
        <div v-for="size in card.sizes" :key="size" class="size-square">{{ size }}</div>
      </div>
      <div class="product-card-detail__colors">
        <b>Colors:</b>
        <div v-for="color in card.colors" :key="color" class="color-square" :style="{ backgroundColor: color }"></div>
      </div>
      <div class="product-card-detail__price">Price: €  {{ card.price }} </div>
      <button class="product-card-detail__delete-card-btn" @click="() => deleteCurrentCard()">Delete</button>
    </div>
  </div>
</template>
  
<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'ProductCardDetail',
  computed: {
    ...mapState('cards', ['cards']),
    card() {
      const id = this.$route.params.id;
      return this.cards.find(card => card.id === id);
    }
  },
  data() {
    return {
      mainImage: ''
    }
  },
  mounted() {
    this.mainImage = this.card.images[0];
  },  
  methods: {
    ...mapActions('cards', ['deleteCard']),
    changeMainImage(image) {
      this.$nextTick(() => {
        this.mainImage = image;
      });
    },
    deleteCurrentCard () {
      this.deleteCard(this.card)
      this.$router.push({ name: 'CARDS' })
    }
  }
}
</script>

<style scoped lang="less">
.product-card-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family:'Courier New', Courier, monospace;
  gap: 20px;
  padding: 20px;
  &__thumbnails {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .thumbnail {
      width: 60px;
      height: 60px;
      cursor: pointer;
      object-fit: cover;
      border: 3px solid transparent;
      &:hover {
        border: 3px solid gray;
      }
    }
  }
  &__delete-card-btn {
      width: 100px;
      padding: 10px 20px;
      font-size: 1em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #0056b3;
      }
  }
  &__img-container {
    width: 60%;
    height: 60%;
    padding-bottom: 60%;
    border: 1px solid #0056b3;
    position: relative;
  }
  &__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: box-shadow .3s ease-in-out;
    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, .8);
    }
  }
  &__sizes {
    display: flex;
    gap: 10px;
    .size-square {
      width: 50px;
      height: 30px;
      border: 1px solid lightgray;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        border: 1px solid #89aaff;
      }
    }
  }
  &__colors {
    display: flex;
    gap: 10px;
    .color-square {
      width: 30px;
      height: 30px;
      border: 1px solid lightgray;
      box-shadow: 0 0 2px transparent;
      &:hover {
        box-shadow: 0 0 2px black;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    &__title {
      font-size: 24px;
      font-weight: 700;
    }
    &__subtitle {
      color: grey;
      font-size: 20px;
    }
    &__description {
      font-size: 16px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  }
  &__price {
    font-size: 24px;
    font-weight: 700;
  }
}
</style>  