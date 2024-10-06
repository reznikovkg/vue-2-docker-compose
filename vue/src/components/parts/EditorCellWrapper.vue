<template>
  <div
    class="wrapper"
    :class="{ 'wrapper--selected': isSelected }"
    @click="() => onClick()"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "EditorCellWrapper",
  props: {
    isSelected: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  border: 2px solid transparent;
  cursor: pointer;
  &--selected {
    border-color: black;
  }
}
</style>
