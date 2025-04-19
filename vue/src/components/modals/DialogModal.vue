<template>
  <div class="dialog-modal">
    <div class="dialog-modal__content">
      <p class="dialog-modal__message">{{ params.message || 'Message' }}</p>
      <div class="dialog-modal__buttons">
        <button
            v-for="(btn, index) in params.buttons"
            :key="index"
            class="dialog-modal__button"
            @click="() => click(btn)"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogModal",
  props: {
    params: Object
  },
  methods: {
    click(btn) {
      if (btn.click) {
        this.clickHandler(btn.click)
      }

      if (btn.afterClick) {
        this.clickHandler(btn.afterClick)
      }
    },
    clickHandler(click) {
      if (typeof click === 'string') {
        if (click === 'emitClose') {
          return this.$emit('close')
        }
      }

      return click()
    }
  }
}
</script>

<style lang="less">
.dialog-modal {
  position: fixed;
  top: 89%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  min-width: 300px;
}

.dialog-modal__content {
  background-color: @cBaseOne;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px @cBaseNine;
  text-align: center;
}

.dialog-modal__message {
  margin: 0 0 15px 0;
}

.dialog-modal__buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.dialog-modal__button {
  padding: 5px 15px;
  background-color: @cBaseEight;
  color: @cBaseOne;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>