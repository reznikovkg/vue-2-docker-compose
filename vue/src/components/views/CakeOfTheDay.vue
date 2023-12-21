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
@import "styles/cakeOfTheDay.less";
</style>