<template>
  <div class="input-wrapper">
    <label v-if="label" for="input">{{ label }}</label>
    <input
      :type="type ?? 'text'"
      name="input"
      :placeholder="placeholder"
      :value="value"
      @input="onInputChange($event.target.value)"
      v-bind="$props"
    />
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
  gap: 4px;
  & input {
    height: 40px;
    padding: 0px 16px;
    border-radius: 4px;
    border: 1px solid black;
  }
}
</style>
