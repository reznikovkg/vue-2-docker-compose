<template>
  <div class="background">
    <img src="../../assets/common/background.jpg" />
    <div class="logo">
      <img src="../../assets/SlayTheVue.png" />
    </div>
    <div class="button-area"> 
      <RouterLink to="/Battle">
        <button class="menu-button">
          <P class="menu-button__text">Start Game</P>
        </button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="less" scoped>
.background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  z-index: -1;
  
  img {
    position: relative;
    height: 100%;
    width: 100%;
  }
}

.logo {
  position: absolute;
  height: 350px;
  top: 20%;
  left: 40%;

  img {
    position: relative;
    height: 100%;
    width: 100%
  }
}

.button-area {
  height: fit-content;
  width: 400px;

  position: absolute;
  top: 60%;
  left: 10%;

  .menu-button {
    height: 50px;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 4px;
    border: 2px solid #4dba87;
    border-radius: 10px;
    background: #435466;
    cursor: pointer;

    &__text {
      font-size: 35px;
      color: #4dba87;
    }
  }
}
</style>
