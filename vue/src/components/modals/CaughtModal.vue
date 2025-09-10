<template>
  <ModalComponent @response="() => confirmCatch()">
    <div class="modal-status">
      <h3>Вы поймали рыбу!</h3>
      <img :src="`/fishes/${params.item.fish.type}.png`">
      <h2>{{ params.item.fish.name }}</h2>
      <p>Вес: {{ params.item.weight.toFixed(2) }} кг</p>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";

export default {
  name: "CaughtModal",
  components: {
    ModalComponent
  },
  props: {
    params: Object
  },
  methods: {
    confirmCatch() {
      this.$store.commit("inventory/unequipRod");
      this.$store.commit("game/reset")
      this.$emit("close");
    }
  }
}
</script>

<style lang="less" scoped>
.modal-status {
  text-align: center;
}

.modal-status img {
  margin-top: 1em;
  margin-bottom: 1em;
  width: 64px;
}

.modal-status p {
  margin: 0;
  padding: 0;
}

</style>
