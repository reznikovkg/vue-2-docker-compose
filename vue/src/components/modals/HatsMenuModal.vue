<template>
  <ModalComponent>
    <div class="menu__contents">
      <div class="menu__header">
        <h2 class="menu__header__title">Hats</h2>
        <button @click="() => $emit('close')" class="menu__header__button__close">X</button>
      </div>
      <HatsGrid/>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/parts/Modal.vue';
import HatsGrid from '@/components/parts/HatsGrid.vue';

export default {
  name: 'HatsModal',
  components: {
    ModalComponent,
    HatsGrid
  }
}
</script>

<style scoped lang="less">
.menu {
  &__contents {
    background-color: @cPrimary;
    width: 70vw;
    height: 70vh;
    padding: 10px;
  }
  
  &__header {
    display: flex;

    &__title {
      font-size: @sFontLarge;
    }
    
    &__button {
      &__close {
        width: 30px;
        height: 30px;
        border-color: @cAccent;
        background-color: @cBad;
        right: 0px;
        margin-left: auto;
        cursor: pointer;
      }
    }
  }
  
  
}
</style>