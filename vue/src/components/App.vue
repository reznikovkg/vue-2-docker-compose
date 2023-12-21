<template>
  <div id="app">
    <header class="[{ 'disabled': isFirst()}]">
      <div class="container">
        <div class="navbar">
          <div class="navbar__sample">
            <div class="navbar__icon">
              <unicon name="restaurant" fill="#FF5D42"></unicon>
              <p class="navbar__icon__description">Cakebake</p>
            </div>
            <div class="navbar__menu">
              <ul class="navbar__menu__list">
                <li @click="redirectToHome()">Home</li>
                <li>About</li>
                <li @click="redirectToStore()">Cakes</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div class="navbar__right-menu">
            <unicon class="icon-search" name="search" fill="#FF5D42"></unicon>
            <p class="right-menu__login">Login</p>
            <div class="right-menu__bag-container">
              <unicon name="shopping-bag" fill="#FFFFFF"></unicon>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="container">
        <router-view />
      </div>
    </div>
    <footer>
        <div class="container">
          <div class="navbar">
            <div class="navbar-sample_footer">
              <div class="navbar__icon">
                <unicon name="restaurant" fill="#FF5D42"></unicon>
                <p class="navbar__icon__description">Cakebake</p>
              </div>
              <div class="company-mark">
                <p>© 2023 Cakebake. All Rights Reserved</p>
              </div>
            </div>
            <div class="navbar__sample_footer">
              <div class="navbar__menu navbar__menu_footer">
                <ul class="navbar__menu__list">
                  <li @click="redirectToHome()">Home</li>
                  <li>About</li>
                  <li @click="redirectToStore()">Cakes</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div class="icons">
                <a href="#"><unicon name="instagram-alt" fill="#FF5D42"></unicon></a>
                <a href="#"><unicon name="facebook-f" fill="#FF5D42"></unicon></a>
                <a href="#"><unicon name="twitter" fill="#FF5D42"></unicon></a>
              </div>
            </div>
          </div>
        </div>
    </footer>
  </div>
</template>

<style scoped lang="less">
@import "styles/app.less";
</style>

<script>
  export default {
    methods: {
      redirectToHome() {
        this.$router.push('/');
      },
      redirectToStore() {
        this.$router.push('/store');
      },
    }
  }
</script>
