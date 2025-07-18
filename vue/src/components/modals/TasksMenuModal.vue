<template>
  <ModalComponent>
    <div class="menu__contents">
      <div class="menu__header">
        <h2 class="menu__header__title">Hats</h2>
        <button @click="() => $emit('close')" class="menu__header__button menu__header__button__close">X</button>
        <button @click="() => this.repopulateTasks()" class="menu__header__button menu__header__button__refresh">
          <img :src="require('@/assets/img/refresh.svg')" alt="">
        </button>
      </div>
      <TasksGrid/>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/parts/Modal.vue';
import TasksGrid from '@/components/parts/TasksGrid.vue';
import { mapActions } from 'vuex';

export default {
  name: 'TasksMenuModal',
  components: {
    ModalComponent,
    TasksGrid
  },
  methods: {
    ...mapActions('game', [
    'repopulateTasks'
    ])
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
      width: 30px;
      height: 30px;
      border-color: @cAccent;
      cursor: pointer;

      &__close {
        background-color: @cBad;
        right: 0px;
        margin-left: auto;
      }
    }
  }
}
</style>