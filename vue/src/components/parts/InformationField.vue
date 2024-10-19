<template>
    <div class="info-wrapper">
        <div class="fields-wrapper">
            <CustomInput
                :value="info.title"
                @input="onTitleChange"
                label="Название свойства"
                placeholder="Введите название"
            />
            <CustomInput
                :value="info.value"
                @input="onValueChange"
                label="Значение"
                placeholder="Введите значение"
            />
        </div>
        <CustomButton :type="'delete'" @click="onDelete" />
    </div>
</template>

<script>
import CustomInput from '../parts/Input.vue';
import CustomButton from '../parts/Button.vue';

export default {
    name: 'InformationField',
    components: {
        CustomInput,
        CustomButton,
    },
    props: { info: Object, changeInfo: Function, delete: Function },
    methods: {
        onTitleChange(value) {
            this.$emit('changeInfo', {
                title: value,
                value: this.info.value,
            });
        },
        onValueChange(value) {
            this.$emit('changeInfo', {
                title: this.info.title,
                value: value,
            });
        },
        onDelete() {
            this.$emit('delete');
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
