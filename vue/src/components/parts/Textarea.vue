<template>
  <div class="wrapper">
    <label for="input">{{ label }}</label>
    <textarea
      class="textarea"
      name="input"
      :placeholder="placeholder"
      :value="value"
      @input="onInputChange($event.target.value)"
      rows="5"
    />
  </div>
</template>

<script>
export default {
  name: "CustomTextarea",
  props: { label: String, placeholder: String, value: String, input: Function },
  methods: {
    onInputChange(event) {
      this.$emit("input", event);
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.textarea {
  resize: none;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid black;
  outline: none;
}
</style>
