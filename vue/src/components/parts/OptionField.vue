<template>
    <div class="option">
        <div class="name-wrapper">
            <CustomInput
                :value="option.title"
                @input="onNameChange"
                label="Название опции"
                placeholder="Введите название"
            />
            <CustomButton :type="'delete'" @click="onDelete" />
        </div>
        <div class="options-wrapper" v-if="option.values.length">
            <div
                v-for="(item, index) in option.values"
                :key="index"
                class="options-fields"
            >
                <CustomInput
                    :value="item.name"
                    @input="(event) => onItemNameChange(event, index)"
                    placeholder="Название"
                />
                <CustomInput
                    :value="item.value"
                    @input="(event) => onItemValueChange(event, index)"
                    placeholder="Значение"
                />
                <CustomButton
                    @click="() => onItemDelete(index)"
                    :type="'delete'"
                />
            </div>
        </div>
        <CustomButton class="add-button" @click="onAdd">
            Добавить значение
        </CustomButton>
    </div>
</template>

<script>
import CustomInput from '../parts/Input.vue';
import CustomButton from '../parts/Button.vue';

export default {
    name: 'OptionField',
    components: {
        CustomInput,
        CustomButton,
    },
    props: { option: Object, optionChange: Function, delete: Function },
    methods: {
        onNameChange(value) {
            this.$emit('optionChange', { ...this.option, title: value });
        },
        onItemNameChange(value, index) {
            const updatedValues = this.option.values.map((optionValue, i) =>
                i === index ? { ...optionValue, name: value } : optionValue
            );
            this.$emit('optionChange', {
                ...this.option,
                values: updatedValues,
            });
        },
        onItemValueChange(value, index) {
            const updatedValues = this.option.values.map((optionValue, i) =>
                i === index ? { ...optionValue, value: value } : optionValue
            );
            this.$emit('optionChange', {
                ...this.option,
                values: updatedValues,
            });
        },
        onItemDelete(index) {
            const updatedValues = this.option.values.filter(
                (_, i) => i !== index
            );
            this.$emit('optionChange', {
                ...this.option,
                values: updatedValues,
            });
        },
        onDelete() {
            this.$emit('delete');
        },
        onAdd() {
            this.$emit('optionChange', {
                ...this.option,
                values: [
                    ...this.option.values,
                    {
                        id: this.option.values.length,
                        name: '',
                        value: '',
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
