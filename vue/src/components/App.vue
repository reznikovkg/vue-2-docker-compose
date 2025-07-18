<template>
  <div>
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";

export default {
  components: {
    ModalContainer
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Tektur:wght@400..900&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: @cPrimary;
  font-family: @ffSecondary;
  color: @cSecondary;
}

a {
  text-decoration: none;
}

section {
  background-color: @cPrimary;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  font-family: @ffPrimary;
  margin: 0;
}

h2 {
  font-size: @sFontBigger;
}
</style>
