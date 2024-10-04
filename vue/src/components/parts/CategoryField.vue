<template>
  <div class="category-wrapper">
    <CustomInput
      label="Категория"
      placeholder="Введите категорию"
      :value="category"
      @input="onValueChange"
    />
    <CustomButton type="delete" @click="onDelete" />
  </div>
</template>

<script>
import CustomInput from "../parts/Input.vue";
import CustomButton from "../parts/Button.vue";

export default {
  name: "CategoryField",
  components: {
    CustomInput,
    CustomButton,
  },
  props: ["category", "categoryChange", "delete"],
  methods: {
    onValueChange(event) {
      this.$emit("categoryChange", event.target.value);
    },
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped lang="less">
.category-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}
</style>
