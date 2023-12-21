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
.content-5 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.heading-block {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.heading {
  font-weight: 700;
  font-size: 36px;
  padding-left: 20px;
}

.sorted {
  display: flex;
  align-items: center;

  &__icon {
    background-color: rgb(248, 248, 248);
    box-shadow: 0px 5px 10px rgb(182, 182, 182);
    border-radius: 5px;
    padding: 5px 5px 0px 5px;
  }

  &__select {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: rgb(248, 248, 248);
  }

  &_name {
    color: rgb(116, 116, 116);
    font-size: 14px;
  }
}

.cakes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.button {
  border: none;
  border-radius: 5px;
  padding: 10px 25px 10px 25px;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 40px;
  transition: 0.5s;
  cursor: pointer;
  background: white;
  outline: 1px solid #FF5D42;
  color: #FF5D42;

  &:hover {
    background: #FF5D42;
    outline: 1px solid #ffffff;
    color: #ffffff;
  }
}

.item {
  margin: 25px;
  border-radius: 15px;
  transition: 0.3s;


  &:hover {
    box-shadow: 0 0 25px rgb(117, 117, 117);
  }
}

.item-card {
  width: 250px;
  background-color: #FFF;
  border-radius: 15px;
  box-shadow: 0 0 10px rgb(221, 221, 221);
}

.item-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
}

.card-info {
  width: 100%;
  padding: 15px;
}

.client {
  &__desc {

    &__moreinfo {
      width: 100%;
    }

    &__number {
      font-weight: 700;
    }

    &__star {
      margin: 0 5px 0 5px;
    }
  }
}

.buy-row {
  width: 100%;
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

  &__inshop {
    font-size: 13px;
    font-weight: 700;
    color: rgb(70, 221, 156);
  }

  &__inshop_not {
    font-size: 13px;
    font-weight: 700;
    color: rgb(165, 165, 165);
  }

  &__info {
    display: grid;
    align-items: center;
    justify-items: center;

    &__additional {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .item:hover &__additional {
      opacity: 1;
    }

    &__stock {
      opacity: 1;
      transition: opacity 0.3s ease-in-out;
    }

    .item:hover &__stock {
      opacity: 0;
    }
  }

  &__info>* {
    grid-area: 1/1/1/1;
  }
}
</style>