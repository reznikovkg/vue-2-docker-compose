<template>
  <div class="header">
    <ContentContainer>
      <div class="header__top">
        <div>Default welcome message!</div>
        <div class="links">
          <router-link to="/account" class="link">
            <unicon name="user" fill="currentColor"></unicon>
            My Account
          </router-link>
          <router-link to="/wish-list" class="link">
            <unicon name="heart" fill="currentColor"></unicon>
            My Wish List
          </router-link>
          <router-link to="/create-account" class="link">
            <unicon name="user-plus" fill="currentColor"></unicon>
            Create an Account
          </router-link>
          <router-link to="/create-account" class="link">
            <unicon name="signin" fill="currentColor"></unicon>
            Sign In
          </router-link>
        </div>
      </div>
      <div class="header__bottom">
        <div class="logo">
          <img src="../../assets/logo.png">
          <div class="logo__header">MAGETIQUE</div>
          <div class="logo__caption">Spare Parts</div>
        </div>
        <router-link to="/wish-list" class="link">
          <unicon name="shopping-cart" fill="currentColor"></unicon>
          My Cart <div class="counter">0</div>
        </router-link>
      </div>
    </ContentContainer>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css';
import ContentContainer from "./Container.vue";

export default {
  name: "HeaderComponent",
  components: {ContentContainer},
};
</script>

<style scoped lang="scss">
  .header {
    &__top {
      display: flex;
      justify-content: space-between;
      padding-block: 8px;
      border-bottom: 1px solid #EBEEF2;
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      padding-block: 16px;
    }
  }

  .links {
    display: flex;
    align-items: center;
    column-gap: 18px;
  }

  .link {
    display: flex;
    align-items: center;
    column-gap: 8px;
    cursor: pointer;
    font-family: Arial,serif;
    color: gray;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #022E40;
    }
  }

  .logo {
    display: grid;
    width: 220px;

    img {
      grid-column: 1;
      grid-row: 1 / 3;
      height: 44px;
    }

    &__header {
      grid-column: 2;
      grid-row: 1;
      text-transform: uppercase;
      font-weight: bold;
      color: #022E40;
      font-family: Arial, sans-serif;
      font-size: 24px;
    }

    &__caption {
      grid-column: 2;
      grid-row: 2;
      font-family: Arial, sans-serif;
      font-size: 12px;
      color: gray;
      align-self: flex-end;
    }
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    background: gainsboro;
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
</style>
