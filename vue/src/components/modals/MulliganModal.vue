<template>
  <ModalComponent>
    <div class="mulligan-container">
      <h1>
        It is Mulligan time!
      </h1>
      <button class="ok-button" @click="() => performMulligan()">
        Ok
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";
import { mapGetters } from 'vuex';

export default {
  name: "MulliganModal",
  components: {
    ModalComponent
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    performMulligan() {
      this.$emit('close');
      this.getGameEngine.performMulligan([]);
    },
  },
}
</script>

<style scoped>
.mulligan-container {
  height: 60vh;
  width: 60vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.ok-button {
  height: 64px;
  width: 128px;
  border: none;
  border-radius: 4px;
  background-color: burlywood;

  &:hover {
    background-color: bisque;
  }
}
</style>
