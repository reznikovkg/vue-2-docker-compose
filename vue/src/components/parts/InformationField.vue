<template>
  <div class="info-wrapper">
    <div class="fields-wrapper">
      <CustomInput
        label="Название свойства"
        placeholder="Введите название"
        :value="info.title"
        @input="onTitleChange"
      />
      <CustomInput
        label="Значение"
        placeholder="Введите значение"
        :value="info.value"
        @input="onValueChange"
      />
    </div>
    <CustomButton type="delete" @click="onDelete" />
  </div>
</template>

<script>
import CustomInput from "../parts/Input.vue";
import CustomButton from "../parts/Button.vue";

export default {
  name: "InformationField",
  components: {
    CustomInput,
    CustomButton,
  },
  props: ["info", "changeInfo", "delete"],
  methods: {
    onTitleChange(event) {
      this.$emit("changeInfo", {
        title: event.target.value,
        value: this.info.value,
      });
    },
    onValueChange(event) {
      this.$emit("changeInfo", {
        title: this.info.title,
        value: event.target.value,
      });
    },
    onDelete() {
      this.$emit("delete");
    },
  },
};
</script>

<style scoped lang="less">
.info-wrapper {
  display: flex;
  align-items: center;
  gap: 24px;
}
.fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;
}
.delete-button {
  margin-top: 18px;
}
</style>
