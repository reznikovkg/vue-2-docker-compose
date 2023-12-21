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
.full-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.carousel-wrapper {
  overflow: hidden;
  flex-grow: 1;
}

.carousel-container {
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease;
  max-width: 420px;
  height: 300px;
  align-items: flex-end;
}

.carousel-item {
  flex: 0 0 auto;
  width: 200px;
  box-sizing: border-box;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  box-shadow: 0 0 7px rgb(224, 224, 224);
  background-color: #FFF;
  max-height: 150px;
}

button {
  margin-top: 10px;
}

.circle-button {
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 20px;
  box-shadow: 0px 0px 10px #666666;
}

.arrow {
  padding-top: 7px;
}

.clients {
  &__desc {
    &__moreinfo {
      display: flex;
      align-items: center;
      width: 150px;

      &__star {
        margin: 0 5x 0 5px;
      }

      &__number,
      &__reviews {
        font-size: 12px;
        color: gray;
      }
    }

    &__heading {
      font-size: 15px;
      font-weight: 700;
      line-height: 1;
    }
  }
}

.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;

  &__image {
    width: 70px;
    height: 70px;
    border: 3px solid #FFF;
    border-radius: 50%;
    margin-top: -40px;
  }
}

.buy-row {
  width: 150px;
  display: flex;
  justify-content: space-between;

  .buy-row__bag-container {
    background-color: #FE7D79;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background-color: #fd504a;
    }
  }

  &__price {
    color: red;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
