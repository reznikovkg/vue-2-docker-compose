<template>
  <ModalComponent>
    <div class="game-over-container">
      <h2 class="game-over-title">{{ params.title || 'Game Over' }}</h2>

      <div class="score-display">
        Your score: <span class="score-value">{{ params.score || 0 }}</span>
      </div>

      <!-- Удалена статичная кнопка и оставлены только кнопки из params -->
      <div class="custom-buttons">
        <button
            v-for="(btn, index) in params.buttons"
            :key="index"
            :class="'custom-button ' + (btn.class || '')"
            @click="() => handleButtonClick(btn)"
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
        buttons: [] // Оставляем только buttons
      })
    }
  },
  methods: {
    handleButtonClick(btn) {
      if (typeof btn.click === 'function') {
        btn.click();
      }
      this.$emit('close');
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
  border-radius: 8px;
}

.custom-button {
  background: @cButtonPrimary;
  color: @cBaseOne;
  border: none;
  padding: 10px 20px;
  margin: 20px 5px 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: darken(@cButtonPrimary, 10%);
  }
}

.score-display {
  font-size: 24px;
  margin: 20px 0;
}

.score-value {
  font-weight: bold;
  color: gold;
}
</style>


