<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal modal--game-end">
      <h2 class="modal__title">{{ params.title }}</h2>
      <p class="modal__text">{{ params.message }}</p>
      <button
          class="modal__button"
          @click="restartGame"
      >
        Новая игра
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameEndModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    params: {
      type: Object,
      required: true,
    },
  },
  methods: {
    restartGame() {
      this.$emit('restart');
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="less">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background-color: #fcf9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  &__title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__text {
    font-size: 18px;
    color: #656565;
    margin-bottom: 20px;
  }
  &__button {
    background-color: #d26767;
    border: none;
    color: #fdfcfc;
    font-size: 16px;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
    &:hover {
      background-color: darken(#d26767, 10%);
    }
    &:active {
      transform: scale(0.95);
    }
  }
}
</style>
