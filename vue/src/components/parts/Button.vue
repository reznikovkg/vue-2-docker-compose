<template>
  <button :class="['button', type ? `button_${type}` : '', filled ? 'button_filled' : '']" @click="onClick">
    <template v-if="type === 'delete'"> X </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    click: Function,
    type: String,
    filled: Boolean
  },
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
  padding: 8px;
  border-radius: 4px;
  border: 1px solid @cBaseEleven;
  background: @cBaseWhite;

  font-family: @ffOne;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  color: @cBaseEleven;

  &:hover {
    border: 1px solid @cBaseTen;
    color: @cBaseTen;
  }

  &_filled {
    background: @cBaseEleven;
    color: @cBaseWhite;

    &:hover {
      border: 1px solid @cBaseTen;
      color: @cBaseWhite;
    }
  }

  &_delete {
    width: 40px;
  }
}
</style>
