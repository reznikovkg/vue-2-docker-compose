<template>
  <ModalComponent>
    <div class="help-content">
      <div>
        {{ params.title || 'HelpModal' }}
      </div>
      <div>
        {{ params.message || 'HelpMessage' }}
      </div>
    </div>
    <div class="buttons-container">
      <button
          class="ok-button"
          v-for="(btn, index) in params.buttons"
          :key="index"
          :type="btn.type || 'default'"
          @click="() => handleButtonClick(btn)"
      >
        {{ btn.text }}
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";
import {mapActions} from "vuex";

export default {
  name: "HelpModal",
  components: {
    ModalComponent
  },
  props: {
    params: Object
  },
  methods: {
    ...mapActions('game', [
      'resetGame',
      'closeDialog'
    ]),
    handleButtonClick(btn) {
      if (btn.action === 'resetGame') {
        this.resetGame().then(() => {
          this.$emit('close', true);
        });
      } else {
        this.$emit('close', btn.afterClick);
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/less/const.less';

.help-content {
  color: #333;
  line-height: 1.4;
  text-align: center;
}

.buttons-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.ok-button {
  padding: 8px 16px;
  background: @cBaseSix;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto;
  width: @inventory-height;
}
</style>

