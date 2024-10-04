<template>
  <button
    :class="['button', type === 'delete' ? 'delete-button' : '']"
    @click="onClick"
  >
    <template v-if="type === 'delete'"> X </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: ["click", "type"],
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped lang="less">
.button {
  height: 40px;
  border-radius: 4px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: #0000000d;
  }
  &:focus {
    background-color: white;
  }
}
.delete-button {
  width: 40px;
}
</style>
