<template>
  <div class="full-container">
    <div class="circle-button" @click="prev">
      <unicon class="arrow" name="arrow-left" fill="gray"></unicon>
    </div>
    <div class="carousel-wrapper">
      <div class="carousel-container">
        <div class="carousel" :style="{ transform: `translateX(${translateValue}px)` }">
          <div v-for="item in items" :key="item.id" class="carousel-item">
            <div class="item-card" @click="redirectToItem(item.id, item)">
              <img v-bind:src="item.img" alt="cake" class="item-card__image">
              {{ item.content }}
              <div class="clients__desc__moreinfo">
                  <p class="clients__desc__moreinfo__number">{{ item.rating.toFixed(1) }}</p>
                  <unicon class="clients__desc__moreinfo__star" name="favorite" fill="yellow"></unicon>
                  <p class="clients__desc__moreinfo__reviews">{{item.reviews}}k Reviews</p>
              </div>
              <div class="buy-row">
                  <p class = "buy-row__price">{{ item.price }}$</p>
                  <div class="buy-row__bag-container">
                      <unicon name="shopping-bag" fill="#FFFFFF"></unicon>
                  </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="circle-button" @click="next">
      <unicon class="arrow" name="arrow-right" fill="gray"></unicon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  data() {
    return {
      items: [
        { id: 1, content: 'Mango cake', price: 12, rating: 4.8, reviews: 1.2, img: 'https://i.ibb.co/B6Ggqsk/c1.jpg'},
        { id: 2, content: 'Choсolate cake', price: 16, rating: 4.5, reviews: 1.4, img: 'https://i.ibb.co/z89zJhb/c2.jpg'},
        { id: 3, content: 'Vanil cake', price: 10, rating: 4.1, reviews: 0.8, img: 'https://i.ibb.co/b5LZgGm/c3.jpg'},
        { id: 4, content: 'Perfect cake', price: 20, rating: 5.0, reviews: 2.0, img: 'https://i.ibb.co/99RxZkd/c4.jpg'},
        { id: 5, content: 'Sweet cake', price: 8, rating: 3.9, reviews: 1.1, img: 'https://i.ibb.co/NWcfxRG/c5.jpgg'},
        { id: 6, content: 'Bento', price: 14, rating: 4.7, reviews: 1.9, img: 'https://i.ibb.co/wy25pW7/c6.jpg'},
      ],
      currentIndex: 0,
      itemsToShow: 2,
      translateValue: 0,
    };
  },
  methods: {
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.translateValue += this.carouselItemWidth();
      }
    },
    next() {
      if (this.currentIndex < this.items.length - this.itemsToShow) {
        this.currentIndex++;
        this.translateValue -= this.carouselItemWidth();
      }
    },
    carouselItemWidth() {
      this.$emit('custom-event', this.currentIndex);
      return 210;
    },
    redirectToItem(itemId, item) {
      this.$router.push({ name: 'item', params: { id: itemId, item: item } });
    },
  },
};
</script>

<style scoped lang="less">
@import "styles/carouselComponent.less";
</style>
