<template>
  <div class="option">
    <div class="name-wrapper">
      <CustomInput
        label="Название опции"
        placeholder="Введите название"
        :value="option.title"
        @input="onNameChange"
      />
      <CustomButton type="delete" @click="onDelete" />
    </div>
    <div class="options-wrapper" v-if="option.values.length">
      <div
        class="options-fields"
        v-for="(item, index) in option.values"
        :key="index"
      >
        <CustomInput
          placeholder="Название"
          :value="item.name"
          @input="(event) => onItemNameChange(event, index)"
        />
        <CustomInput
          placeholder="Значение"
          :value="item.value"
          @input="(event) => onItemValueChange(event, index)"
        />
        <CustomButton type="delete" @click="() => onItemDelete(index)" />
      </div>
    </div>
    <CustomButton class="add-button" @click="onAdd"
      >Добавить значение</CustomButton
    >
  </div>
</template>

<script>
import CustomInput from "../parts/Input.vue";
import CustomButton from "../parts/Button.vue";

export default {
  name: "OptionField",
  components: {
    CustomInput,
    CustomButton,
  },
  props: ["option", "optionChange", "delete"],
  methods: {
    onNameChange(event) {
      this.$emit("optionChange", { ...this.option, title: event.target.value });
    },
    onItemNameChange(event, index) {
      const updatedValues = this.option.values.map((value, i) =>
        i === index ? { ...value, name: event.target.value } : value
      );
      this.$emit("optionChange", { ...this.option, values: updatedValues });
    },
    onItemValueChange(event, index) {
      const updatedValues = this.option.values.map((value, i) =>
        i === index ? { ...value, value: event.target.value } : value
      );
      this.$emit("optionChange", { ...this.option, values: updatedValues });
    },
    onItemDelete(index) {
      const updatedValues = this.option.values.filter((_, i) => i !== index);
      this.$emit("optionChange", { ...this.option, values: updatedValues });
    },
    onDelete() {
      this.$emit("delete");
    },
    onAdd() {
      this.$emit("optionChange", {
        ...this.option,
        values: [
          ...this.option.values,
          {
            id: this.option.values.length,
            name: "",
            value: "",
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
.option {
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.name-wrapper {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}
.options-wrapper {
  display: flex;
  gap: 24px;
}
.options-fields {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.add-button {
  width: 200px;
}
</style>
