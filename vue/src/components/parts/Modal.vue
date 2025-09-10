<template>
  <div class="modal__wrapper">
    <div class="modal">
      <div class="modal__content">
        <slot />
      </div>
      <div class="modal__bottom">
        <button
          v-for="(button, index) in buttons"
          :key="button"
          class="modal__bottom-button button"
          @click="() => $emit('response', index)"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalRCMS",
  props: {
    buttons: {
      type: Array,
      default: () => ["Понятно"]
    }
  }
}
</script>

<style scoped lang="less">
.modal__wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.25);
}

.modal {
  background-color: @cBackground;

  &__content {
    padding: 1em;
  }

  &__bottom {
    width: 100%;
    display: flex;
  }

  &__bottom-button {
    width: 100%;
  }
}
</style>
