<template>
  <main>
    <div class="content-5">
      <div class="heading-block">
        <h1 class="heading">Cakes</h1>
        <div class="sorted">
          <p class="sorted__name">Sort By</p>
          <select v-model="sortBy" class="sorted__select" @change="sortItems">
            <option value="novelty">Novelty</option>
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
          </select>
          <unicon class="sorted__icon" name="sliders-v-alt" fill="black"></unicon>
        </div>
      </div>
      <div class="cakes">
        <div v-for="item in items.slice(0, visibleItems)" :key="item.id" class="item">
          <div class="item-card">
            <img v-bind:src="item.img" alt="cake" class="item-image">
            <div class="card-info">
              <p class="item-name">{{ item.content }}</p>
              <div class="clients__desc__moreinfo">
                <p class="clients__desc__moreinfo__number">{{ item.rating.toFixed(1) }}</p>
                <unicon class="clients__desc__moreinfo__star" name="favorite" fill="yellow"></unicon>
                <p class="clients__desc__moreinfo__reviews">{{ item.reviews }}k Reviews</p>
              </div>
              <div class="buy-row">
                <p class="buy-row__price">{{ item.price }}$</p>
                <div class="buy-row__info">
                  <div class="buy-row__info__stock">
                    <p v-if="item.inShop" class="buy-row__inshop">In Stock</p>
                    <p v-if="!item.inShop" class="buy-row__inshop_not">Out of Stock</p>
                  </div>
                  <div class="buy-row__info__additional">
                    <div class="buy-row__bag-container">
                      <unicon name="shopping-bag" fill="#FFFFFF" @click="redirectToItem(item.id, item)"></unicon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button v-if="visibleItems < items.length" class="button" @click="loadMore">Load More Cakes</button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'CakesComponent',
  data() {
    return {
      items: [
        {
          id: 1, content: 'Mango cake', price: 12, rating: 4.8, reviews: 1.2, img: 'https://i.ibb.co/B6Ggqsk/c1.jpg', inShop: true,
          gallery: ['https://i.ibb.co/B6Ggqsk/c1.jpg', 'https://i.ibb.co/z89zJhb/c2.jpg', 'https://i.ibb.co/b5LZgGm/c3.jpg', 'https://i.ibb.co/99RxZkd/c4.jpg']
        },
        { id: 2, content: 'Choсolate cake', price: 16, rating: 4.5, reviews: 1.4, img: 'https://i.ibb.co/z89zJhb/c2.jpg', inShop: true },
        { id: 3, content: 'Vanil cake', price: 10, rating: 4.1, reviews: 0.8, img: 'https://i.ibb.co/b5LZgGm/c3.jpg', inShop: true },
        { id: 4, content: 'Perfect cake', price: 20, rating: 5.0, reviews: 2.0, img: 'https://i.ibb.co/99RxZkd/c4.jpg', inShop: false },
        { id: 5, content: 'Sweet cake', price: 8, rating: 3.9, reviews: 1.1, img: 'https://i.ibb.co/NWcfxRG/c5.jpg', inShop: false },
        { id: 6, content: 'Bento', price: 14, rating: 4.7, reviews: 1.9, img: 'https://i.ibb.co/wy25pW7/c6.jpg', inShop: true },
        { id: 7, content: 'Strawberry cake', price: 12, rating: 4.8, reviews: 1.2, img: 'https://i.ibb.co/rFdBJsf/c7.jpg', inShop: true },
        { id: 8, content: 'Choсolate big cake', price: 16, rating: 4.5, reviews: 1.4, img: 'https://i.ibb.co/tm9w7wt/c8.jpg', inShop: true },
        { id: 9, content: 'Choсolate super cake', price: 10, rating: 4.1, reviews: 0.8, img: 'https://i.ibb.co/j5LXN0w/c9.jpg', inShop: true },
        { id: 10, content: 'Perfect choco cake', price: 20, rating: 5.0, reviews: 2.0, img: 'https://i.ibb.co/RTb1kjz/c10.jpg', inShop: false },
        { id: 11, content: 'Blue cake', price: 8, rating: 3.9, reviews: 1.1, img: 'https://i.ibb.co/f2Kp2j5/c11.jpg', inShop: false },
        { id: 12, content: 'Orange', price: 14, rating: 4.7, reviews: 1.9, img: 'https://i.ibb.co/pyTxMGf/c12.jpg', inShop: true },
        { id: 13, content: 'Blueberry cake', price: 20, rating: 5.0, reviews: 2.0, img: 'https://i.ibb.co/SsPvrBH/c13.jpg', inShop: false },
        { id: 14, content: 'Tirramisu', price: 8, rating: 3.9, reviews: 1.1, img: 'https://i.ibb.co/XC7rZs1/c14.jpg', inShop: false },
        { id: 15, content: 'Double cake', price: 14, rating: 4.7, reviews: 1.9, img: 'https://i.ibb.co/D4www5P/c15.jpg', inShop: true },
      ],
      sortBy: 'novelty',
      visibleItems: 8,
      isHovered: false,
    };
  },
  methods: {
    sortItems() {
      switch (this.sortBy) {
        case 'novelty':
          this.items.sort((a, b) => a.id - b.id);
          break;
        case 'popularity':
          this.items.sort((a, b) => b.rating - a.rating);
          break;
        case 'price':
          this.items.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
    },
    loadMore() {
      this.visibleItems += 8;
    },
    redirectToItem(itemId, item) {
      this.$router.push({ name: 'item', params: { id: itemId, item: item } });
    },
  },
};
</script>

<style scoped lang="less">
@import "styles/cakesComponent.less";
</style>