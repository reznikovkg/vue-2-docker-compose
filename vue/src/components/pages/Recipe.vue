<template>
  <div class="wrapper">
    <CardEdit :isEditable="true" @addCard="saveToStor" />
  </div>
</template>

<script>
import CardEdit from "../card/CardComponent.vue";

export default {
  name: "CreateRecipe",
  components: {
    CardEdit,
  },
  methods: {
    saveToStor(data) {
      this.$store.commit("addOneCard", data);
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
</style>