<template>
  <div class="main-menu">
    <div class="main-container main-menu__container">
      <h1 class="main-menu__title">
        <img class="main-menu__icon" src="../../assets/floats/float2.png" />
        Рыбалка
      </h1>
      <p class="main-menu__welcome">Добро пожаловать, рыбак!</p>
      <div class="main-menu__buttons">
        <router-link to="/locations" class="button">Играть</router-link>
        <router-link to="/shop" class="button">Магазин</router-link>
        <router-link to="/inventory" class="button">Инвентарь</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
}
</script>

<style lang="less" scoped>
.main-menu {
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/menu.png");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;

  &__container {
    text-align: center;
    padding-top: 1em;
  }

  &__title {
    font-size: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
  }

  &__icon {
    height: 32px;
  }

  &__welcome {
    margin-top: 0.5em;
  }

  &__buttons {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
}
</style>