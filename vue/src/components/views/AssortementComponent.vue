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
.content-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
  text-align: center;
  line-height: 1.2;
}

.circle-button {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 5px;
}

.arrow {
  padding-top: 7px;
}

.assortement {
  display: flex;
  margin-top: 100px;
  width: 100%;
  justify-content: space-between;
}

.cake {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 270px;
  height: 300px;
  padding: 20px;
  background-color: #FF5D42;
  border-radius: 15px;
  margin: 12px;


  &__img {
    width: 140px;
    height: auto;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    text-transform: capitalize;
    line-height: 1;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 15px;
  }

  &__desk {
    text-align: center;
    font-size: 12px;
    margin-bottom: 10px;
    font-weight: 700;
    color: rgba(51, 67, 83, 0.8)
  }

  &__blue {
    background-color: rgb(171, 236, 229)
  }

  &__orange {
    background-color: rgb(255, 226, 221)
  }

  &__purple {
    background-color: rgb(237, 215, 237)
  }

  &__red {
    background-color: rgb(252, 186, 193)
  }
}
</style>