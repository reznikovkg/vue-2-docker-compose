<template>
    <main>
      <div class="content-2">
        <p class="desk">Assortment</p>
        <h2 class="heading">Different categories<br>for any occasion</h2>
        <div class="assortement">
          <div class="cake cake__blue">
            <img src="@/assets/images/cakes/k1.png" alt="cake" class="cake__img">
            <p class="cake__name">Birthday<br>cakes</p>
            <p class="cake__desk">Lorem ipsum is placeholder text commonly used graphic</p>
            <div class="circle-button">
              <unicon class="arrow" name="arrow-right" fill="gray"></unicon>
            </div>
          </div>
          <div class="cake cake__orange">
            <img src="@/assets/images/cakes/k2.png" alt="cake" class="cake__img">
            <p class="cake__name">Anniversary<br>cakes</p>
            <p class="cake__desk">Lorem ipsum is placeholder text commonly used graphic</p>
            <div class="circle-button">
              <unicon class="arrow" name="arrow-right" fill="gray"></unicon>
            </div>
          </div>
          <div class="cake cake__purple">
            <img src="@/assets/images/cakes/k3.png" alt="cake" class="cake__img">
            <p class="cake__name">Wedding<br>cakes</p>
            <p class="cake__desk">Lorem ipsum is placeholder text commonly used graphic</p>
            <div class="circle-button">
              <unicon class="arrow" name="arrow-right" fill="gray"></unicon>
            </div>
          </div>
          <div class="cake cake__red">
            <img src="@/assets/images/cakes/k4.png" alt="cake" class="cake__img">
            <p class="cake__name">Special<br>cakes</p>
            <p class="cake__desk">Lorem ipsum is placeholder text commonly used graphic</p>
            <div class="circle-button">
              <unicon class="arrow" name="arrow-right" fill="gray"></unicon>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
  export default {
    name: 'AssortementComponent'
  }
</script>

<style scoped lang="less">
@import "styles/assortement.less";
</style>