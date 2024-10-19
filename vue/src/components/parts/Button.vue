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
  props: { click: Function, type: String },
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
  background-color: @cBaseTwelve;
  color: @cBaseWhite;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: @cBaseFour;
  }
  &:active {
    background-color: @cBaseSix;
  }
}
.delete-button {
  width: 40px;
}
</style>
