<template>
  <div class="body">
    <CustomButton/>
    <CustomButton class="red">
      HALLO
    </CustomButton>
    <custom-button class="blue">
      MARHABAN
    </custom-button>
    <custom-button class="purple">
      NI HAO
    </custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
  components: {
    CustomButton
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  background-color: @cBaseTwo;
}

a {
  text-decoration: none;
}

section {
  background-color: @cBaseOne;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  font-family: @ffOne;
  color: @cBaseThree;
  margin: 0;
}

h2 {
  font-size: 32px;
}

.p-16 {
  padding: 16px;
}

.d-flex {
  display: flex;
}

.rcms {

  &-divider {

    &-h {
      width: 100%;
      height: @sizeBorderDefault;
      background-color: @cBaseTwo;
    }

    &-v {

    }
  }

  &-loading {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(100, 100, 100, 0.5);
      cursor: wait;
    }
  }
}

.body{
  margin-top: 50px;
}

.red::after{
  background: #dc4d4e;
}

.blue::after{
  background: #539fe0;
}

.purple::after{
  background: #b96ee7;
}
</style>
