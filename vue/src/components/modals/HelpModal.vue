<template>
  <ModalComponent>
    <div class="game-over-container">
      <h2 class="game-over-title">{{ params.title || 'Game Over' }}</h2>

      <div class="score-display">
        Your score: <span class="score-value">{{ params.score || 0 }}</span>
      </div>

      <button
          class="restart-button"
          @click="handleRestart"
      >
        Play Again
      </button>

      <div v-if="params.title && params.title !== 'Game Over'" class="custom-title">
        {{ params.title }}
      </div>
      <div v-if="params.message" class="custom-message">
        {{ params.message }}
      </div>
      <div v-if="params.buttons" class="custom-buttons">
        <button
            v-for="(btn, index) in params.buttons"
            :key="index"
            :class="'custom-button ' + (btn.type || 'default')"
            @click="() => click(btn)"
        >
          {{ btn.text }}
        </button>
      </div>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";

export default {
  name: "HelpModal",
  components: {
    ModalComponent
  },
  props: {
    params: {
      type: Object,
      default: () => ({
        score: 0,
        title: '',
        message: '',
        buttons: [],
        onRestart: null
      })
    }
  },
  methods: {
    handleRestart() {
      if (this.params.onRestart && typeof this.params.onRestart === 'function') {
        this.params.onRestart();
      }
      this.$emit('close');
    },
    click (btn) {
      if (btn.click) {
        this.clickHandler(btn.click)
      }

      if (btn.afterClick) {
        this.clickHandler(btn.afterClick)
      }
    },
    clickHandler (click) {
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

<style scoped lang="less">
.game-over-container {
  text-align: center;
  padding: 50px;
  background: @cBaseThree;
  color: @cBaseOne;
  min-width: 200px;
}

button {
  background: @cButtonPrimary;
  color: @cBaseOne;
  border: none;
  padding: 10px 20px;
  margin-top: 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
</style>


