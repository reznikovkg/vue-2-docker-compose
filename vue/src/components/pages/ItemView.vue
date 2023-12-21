<template>
  <div class="content-item">
    <div class="left">
      <div class="gallery">
      <div class="left-block">
        <img class="image-mini" v-for="(image, index) in item.gallery" :key="index" :src="image" @click="changeImage(index)">
      </div>
      <div class="right-block">
        <img class="image-max" :src="selectedImage" :alt="selectedImageAlt">
      </div>
    </div>
    </div>
    <div class="right">
      <h2 class="heading">{{ item.content }}</h2>
      <div class="clients__desc__moreinfo">
          <p class="clients__desc__moreinfo__number">{{ item.rating.toFixed(1) }}</p>
          <unicon class="clients__desc__moreinfo__star" name="favorite" fill="yellow"></unicon>
          <p class="clients__desc__moreinfo__reviews">{{item.reviews}}k Reviews</p>
      </div>
      <p class = "buy-row__price">${{ item.price }}</p>
      <div class="size">
          <p class="size__name name">Size</p>
          <div class="size__selects">
              <div class="size__select" @click="toggleActive(0)">1/2 Kg</div>
              <div class="size__select" @click="toggleActive(1)">1 Kg</div>
              <div class="size__select" @click="toggleActive(2)">2 Kg</div>
          </div>
      </div>
      <div class="flexblock">
          <div class="qty">
              <p class="qty__name name">QTY</p>
              <input type="number" class="qty__input" value = 1>
          </div>
          <div class="message">
              <p class="message__name name">Message on cake</p>
              <input type="text" class="message__input" placeholder="Enter message">
          </div>
      </div>
      <div class="flexblock">
          <div class="location">
              <p class="location__name name">Delivery Location</p>
              <input type="text" class="location__input" placeholder="Enter pincode">
          </div>
          <div class="date">
              <p class="date__name name">Delivery Date</p>
              <input type="date" class="date__input">
          </div>
          <button class="button">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPage',
  props: ['item'],
  data() {
    return {
      selectedImage: this.item.img,
      selectedImageAlt: 'alt',
    };
  },
  methods: {
    changeImage(index) {
      this.selectedImage = this.item.gallery[index];
      this.selectedImageAlt = 'Image ' + (index + 1);
    },
    toggleActive(index) {
      this.$el.querySelectorAll('.size__select').forEach((select, i) => {
          if (i === index) {
          select.classList.add('active');
          } else {
          select.classList.remove('active');
          }
      });
    }
  },
};
</script>

<style scoped lang="less">
.gallery {
  display: flex;
}

.left-block {
  display: flex;
  flex-direction: column;
  & img {
    width: 83px;
    height: 83px;
    margin-bottom: 10px;
    cursor: pointer;
    margin: 10px;
    border-radius: 10px;
  
    &:hover {
      outline: 2px solid #FF5D42;
    }
  }
}

.right-block img {
  width: 390px;
  height: 390px;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
}

.content-item {
  display: flex;
  padding-top: 120px;
  padding-bottom: 10px;
}

.left {
  width: 50%;
}

.right {
  width: 50%;
}

.size__selects,
.flexblock {
  display: flex;
}

.flexblock {
  margin-top: 30px;
}

.heading {
  font-weight: 700;
  font-size: 36px;
}

.clients {
  &__desc {
    &__moreinfo {
      &__star {
        margin: 0 10px 0 10px;
      }

      &__number {
        font-weight: 700;
        color: rgba(51, 67, 83, 0.8);
        font-size: 14px;
      }
    }
  }
}

.buy-row {
  &__price {
    font-size: 42px;
    color: #FF5D42;
  }
}

.name {
  font-weight: 700;
  font-size: 15px;
}

.size {
  &__select {
    padding: 5px;
    background-color: #FFF;
    color: #FF5D42;
    outline: 1px solid #FF5D42;
    border-radius: 10px;
    font-size: 13px;
    width: 80px;
    text-align: center;
    margin-right: 10px;
    margin-top: 10px;
    transition: 0.3s;
    cursor: pointer;
  }
}

.active {
  background-color: #FF5D42;
  color: #ffffff;
}

input {
  padding: 10px;
  background-color: rgb(236, 236, 236);
  border: none;
  border-radius: 15px;
  margin-right: 20px;
}

.button {
  border: none;
  border-radius: 15px;
  padding: 10px 20px 10px 20px;
  background: linear-gradient(to right, #FE847E, #FF5D42);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 14px;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background: white;
    outline: 1px solid #FF5D42;
    color: #FF5D42;
  }
}
</style>