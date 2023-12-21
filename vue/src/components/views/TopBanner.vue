<script>
  import CarouselComponent from './CarouselComponent.vue';
  export default {
    name: 'TopBanner',
    components: {
      CarouselComponent,
    },
    data() {
      return {
        shouldAddClass: [true,false,false,false,false,false],
      };
    },
    methods: {
      handleCustomEvent(value) {
        for (let i = 0; i < this.shouldAddClass.length; i++) {
          this.$set(this.shouldAddClass, i, i === value);
        }
      },
    }
  }
</script>

<template>
  <main>
    <div class="content-1">
      <div style="display: flex; justify-content: space-between;">
        <div class="left-block">
          <h1 class="topbanner__heading">Special Choloate Cake</h1>
          <p class="topbanner__desc">A very chocolate cake made of chocolate. The main ingredient is chocolate, and there is also chocolate topping.</p>
          <button class="topbanner__button">Order Now!</button>
          <div class="topbanner__clients">
            <div class="image-stack">
              <img src="@/assets/images/people/p1.jpg" alt="Image 1" class="circle-image">
              <img src="@/assets/images/people/p2.jpg" alt="Image 2" class="circle-image">
              <img src="@/assets/images/people/p3.jpg" alt="Image 3" class="circle-image">
            </div>
            <div class="clients__desc">
              <h2 class="clients__desc__heading">Our Happy Customer</h2>
              <div class="clients__desc__moreinfo">
                <p class="clients__desc__moreinfo__number">4.8</p>
                <unicon class="clients__desc__moreinfo__star" name="favorite" fill="yellow"></unicon>
                <p class="clients__desc__moreinfo__reviews">1.2k Reviews</p>
              </div>
            </div>
          </div>
        </div>
        <div class="right-block">
          <CarouselComponent class="carousel-box" @custom-event="handleCustomEvent"></CarouselComponent>
        </div>
      </div>
      <div class="dots-block">
        <div :class="{ 'actv': this.shouldAddClass[0] }" class="dote"></div>
        <div :class="{ 'actv': this.shouldAddClass[1] }" class="dote"></div>
        <div :class="{ 'actv': this.shouldAddClass[2] }" class="dote"></div>
        <div :class="{ 'actv': this.shouldAddClass[3] }" class="dote"></div>
        <div :class="{ 'actv': this.shouldAddClass[4] }" class="dote"></div>
        <div :class="{ 'actv': this.shouldAddClass[5] }" class="dote"></div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="less">
@import "styles/topBanner.less";
</style>