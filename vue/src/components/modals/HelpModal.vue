<template>
  <ModalComponent>
    <div class="help-content">
      <div>
        {{ params.title || 'HelpModal' }}
      </div>
      <div >
        {{ params.message || 'HelpMessage' }}
      </div>
    </div>
    <div>
      <button
          class="ok-button"
          v-for="(btn, index) in params.buttons"
          :key="index"
          :type="btn.type || 'default'"
          @click="handleButtonClick(btn)"
      >
        {{ btn.text }}
      </button>
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
    params: Object
  },
  methods: {
    handleButtonClick(btn) {
      if (btn.action) btn.action();
      this.$emit('close', btn.afterClick);
    }
  }
}
</script>

<style lang="less" scoped>

.help-content {
  color: #333;
  line-height: 1.4;
  text-align: center;
}

.ok-button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 auto;
  width: 80px;
}
</style>