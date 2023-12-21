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
.navbar {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 18px;
  padding-bottom: 18px;

  &__icon,
  &__menu,
  &__right-menu,
  &__menu__list,
  &__sample,
  &__sample_footer {
    display: flex;
  }

  &__icon *,
  .icon-search {
    margin-left: 10px;
  }

  &__menu_footer {
    margin: 0;
    color: gray;
  }

  &__menu {
    margin-left: 35%;

    &__list li {
      list-style-type: none;
      margin-left: 16px;
      font-size: 14px;
      transition: 0.3s;
      cursor: pointer;
    }

    &__ilist li:hover {
      color: #FFF0BF;
    }
  }

  &__right-menu * {
    cursor: pointer;
  }

  &__icon {
    &__description {
      font-weight: 700;
      font-size: 16px;
    }
  }
  
  &__right-menu,
  &_icon,
  &__menu {
    align-items: center;
  }
}

.right-menu {
  &__bag-container {
    background-color: #FE7D79;
    border-radius: 5px;
    padding: 5px;
  }
}

.container {
  width: 100%;
  max-width: 1200px;
}

header,
footer,
.content {
  display: flex;
  justify-content: center;
  width: 100%;
}

header {
  position: fixed;
  background-color: #FFFFFF;
  z-index: 1000;
  border-bottom-width: 2px;
  border-bottom-color: rgb(224, 224, 224);
  border-bottom-style: solid;
}

.right-menu {
  &__login {
    margin-left: 10px;
    margin-right: 10px;
    font-weight: 600;
    font-size: 16px;
    color: #FF5D42;
  }
}

.company-mark,
.icons {
  margin-left: 10px;
  display: flex;
  align-items: center;
  color: gray;
}
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
