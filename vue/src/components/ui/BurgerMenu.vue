<template>
  <div class="burger-menu">
    <div class="burger-menu__btn" @click="() => toggleMenu()">
      <span v-if="!menuOpen" class='line'></span>
      <span v-else class="burger-menu__btn__top line"></span>
      <span v-if="!menuOpen" class='line'></span>
      <span v-else class="burger-menu__btn__mid line"></span>
      <span v-if="!menuOpen" class='line'></span>
      <span v-else class="burger-menu__btn__bottom line"></span>
    </div>
    <div 
      v-show="menuOpen"
      class="burger-menu__nav" 
      @mouseleave="() => toggleMenu()"
    >
      <RouterLink 
        v-if="isStorePage"
        class="burger-menu__nav__link" 
        :to="{name: 'HOME'}"
      >
        Главная
      </RouterLink>
      <RouterLink 
        v-else
        class="burger-menu__nav__link" 
        :to="{name: 'STORE'}"
      >
        Каталог
      </RouterLink>
      <RouterLink
        v-if="$route.name != 'CART'" 
        class="burger-menu__nav__link" 
        :to="{name: 'CART'}"
      >
        Корзина
      </RouterLink>
      <RouterLink
        v-if="mode" 
        class="burger-menu__nav__link" 
        :to="{name: 'CREATE'}"
      >
        Создать продукт
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: 'BurgerMenu',
  data() {
    return {
      menuOpen: false,
    }
  },
  computed: {
    ...mapGetters('settings', [
      'getMode'
    ]),
    isStorePage () {
      return this.$route.name === 'STORE'
    },
    mode () {
      return this.getMode
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<style scoped lang="less">
.burger-menu {
  position: absolute;
  left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #000;
  cursor: pointer;
  transition: all .3s ease-in-out;
  &__btn {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    align-items: center;
    &__top {
      transform: rotate(45deg) translate(2.5px, 2.5px);
    }
    &__mid {
      display: none;
    }
    &__bottom {
      transform: rotate(-45deg) translate(2.5px, -2.5px);
    }
    & .line {
      width: 20px;
      height: 2px;
      background: #fff;
      transition: all .3s ease-in-out;
    }
  }
  &__nav {
    position: absolute;
    top: 50px;
    left: 0;
    background: #ffffff;
    border: 1px solid black;
    border-radius: 0px 12px 12px 12px;
    z-index: 1;
    width: 200px;
    display: flex;
    flex-direction: column;
    &__link {
      width: 80%;
      padding: 20px;
      color: black;
      font-size: 18px;
      transition: all .3s ease-in-out;
    }
    &__link:hover {
      background: #000;
      color: #fff;
      opacity: 0.9;
      border-radius: 0px 0px 0px 12px;
    }
  }
}

.burger-menu:hover {
  background-color: #fff;
  border-radius: 12px;
}

.burger-menu:hover .line {
  background: #000;
}
</style>
