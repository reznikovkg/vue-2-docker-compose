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
.content-1 {
  display: flex;
  justify-content: space-between;
}

.left-block,
.right-block {
  width: 45%;
  padding-top: 10%;
}

.topbanner {
  &__heading {
    font-size: 72px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 20px;
  }

  &__desc {
    font-size: 14px;
    margin-bottom: 20px;
  }

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

    &:hover {
      background: white;
      outline: 1px solid #FF5D42;
      color: #FF5D42;
    }
  }

  &__clients {
    display: flex;
    align-items: center;
  }
}

.clients {
  &__desc {
    &__moreinfo {
      display: flex;
      align-items: center;
    }

    &__star {
      margin: 0 10px 0 10px;
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

.right-block {
  background: url('@/assets/images/newprev.png');
  background-size: cover;
  display: flex;
}

.carousel-box {
  align-self: flex-end;
}

.image-stack {
  width: 160px;
  height: 70px;
  position: relative;
  display: inline-block;
}

.circle-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #fff;
  position: absolute;

  
  &:nth-child(1) {
    left: 40px;
    z-index: 1;
  }

  &:nth-child(2) {
    left: 80px;
    z-index: 2;
  }
}

.content-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dots-block {
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dote {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: rgb(219, 219, 219);
  margin: 5px;
}

.actv {
  background-color: rgb(255, 100, 100);
  box-shadow: 0 0 10px rgb(255, 100, 100);
}
</style>