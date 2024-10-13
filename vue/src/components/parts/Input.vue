<template>
  <div :class="['input-wrapper', error ? 'input-wrapper_error' : '']">
    <label v-if="label" for="input" class="input-wrapper__label">{{ label }}</label>
    <input :type="type ?? 'text'" name="input" :placeholder="placeholder" :value="value"
      @input="onInputChange($event.target.value)" v-bind="$props" class="input-wrapper__input" />
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    label: String,
    placeholder: String,
    value: String,
    input: Function,
    type: String,
    error: Boolean,
  },
  methods: {
    onInputChange(event) {
      this.$emit("input", event);
    },
  },
};
</script>

<style scoped lang="less">
.input-wrapper {
  display: flex;
  flex-direction: column;

  &__label {
    font-family: @ffOne;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;

    color: @cBaseNine;

    .input-wrapper_error & {
      color: @cBaseFour;
    }
  }

  &__input {
    height: 40px;
    border-radius: 4px;
    border: 1px solid @cBaseNine;
    padding: 8px 16px;

    font-family: @ffOne;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;

    &:focus {
      border: 1px solid @cBaseBlack;
    }
  }
}
</style>
