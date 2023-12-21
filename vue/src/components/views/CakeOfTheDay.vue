<template>
    <main>
      <div class="content-3">
        <div class="left-block">
          <div class="top-rated">
            <p class="top-rated__heading">Top rated</p>
            <div class="top-rated__images">
              <img src="@/assets/images/people/p3.jpg" alt="Image 1" class="circle-image">
              <img src="@/assets/images/people/p1.jpg" alt="Image 2" class="circle-image">
              <img src="@/assets/images/people/p4.jpg" alt="Image 3" class="circle-image">
              <img src="@/assets/images/people/p2.jpg" alt="Image 3" class="circle-image">
            </div>
            <div class="clients__desc__moreinfo">
              <p class="clients__desc__moreinfo__number">4.8</p>
              <unicon class="clients__desc__moreinfo__star" name="favorite" fill="yellow"></unicon>
              <p class="clients__desc__moreinfo__reviews">1.2k Reviews</p>
            </div>
          </div>
        </div>
        <div class="right-block">
          <p class="desk">Cake of the day</p>
          <h2 class="heading">Delightful donuts cake</h2>
          <p class = "buy-row__price">15$</p>
          <p class="info">Donuts and cakes are very much related but both have a distinct taste. Sometimes we get confused whether to go for a donut or a cake. With Kg Coke, you can enjoy the light donuts ond rich cake ot the same time.</p>
          <button class="topbanner__button">Order Now!</button>
        </div>

      </div>
    </main>
  </template>

<script>
  export default {
    name: 'CakeOfTheDay'
  }
</script>

<style scoped lang="less">
.desk {
  font-size: 18px;
  color: #FF5D42;
  font-weight: 700;
  text-transform: uppercase;
}

.heading {
  font-size: 40px;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 1.2;
  margin-top: 10px;
  margin-bottom: 10px;
}

.buy-row {
  &__price {
    color: #FF5D42;
    font-weight: 700;
    font-size: 36px;
  }
}

.topbanner {
  &__button {
    border: none;
    border-radius: 15px;
    padding: 15px 40px 15px 40px;
    background: linear-gradient(to right, #FE847E, #FF5D42);
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 40px;
    transition: 0.5s;
    cursor: pointer;
  }

  &__button:hover {
    background: white;
    outline: 1px solid #FF5D42;
    color: #FF5D42;
  }
}

.info {
  margin-top: 10px;
  margin-bottom: 10px;
}

.circle-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #fff;
  position: absolute;
  left: 0;

  
  &:nth-child(1) {
    left: 40px;
    z-index: 1;
  }

  &:nth-child(2) {
    left: 80px;
    z-index: 2;
  }

  &:nth-child(3) {
    left: 120px;
    z-index: 3;
  }
}

.content-3 {
  display: flex;
}

.top-rated {
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0px 0px 20px gray;
  width: 220px;
  position: absolute;
  bottom: 0;
  right: 80px;

  &__images {
    height: 70px;
  }

  &__heading {
    padding-bottom: 15px;
    font-weight: 700;
  }
}

.clients {
  &__desc {
    &__moreinfo {
      padding-top: 15px;
      align-items: center;

      &__star {
        margin-left: 10px;
        margin-right: 10px;
      }

      &__number {
        color: rgb(44, 62, 80);
        font-weight: 700;
        font-size: 13px;
      }
    }
  }
}

.left-block {
  width: 50%;
  position: relative;
  padding: 20px;
  background-image: url('@/assets/images/d1.png');
  background-size: 70%;
  background-repeat: no-repeat;
}

.right-block {
  width: 50%;
  padding: 20px;
}
</style>