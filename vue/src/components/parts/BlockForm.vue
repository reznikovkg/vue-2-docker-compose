<template>
    <div class="block-form">
        <input
            type="color"
            @change="(e) => handleFormField('color', e.target.value)"
            :value="formDate.color"
        />
        <input
            type="text"
            placeholder="Название"
            @change="(e) => handleFormField('name', e.target.value)"
            :value="formDate.name"
            class="block-form__input"
        />
        <input
            type="text"
            placeholder="Описание"
            @change="(e) => handleFormField('description', e.target.value)"
            :value="formDate.description"
            class="block-form__input"
        />
        <Button @click="onSubmit">Добавить блок</Button>
    </div>
</template>

<script>
import Button from '../parts/Button.vue';

export default {
    name: 'BlockForm',
    data() {
        return {
            formDate: { color: '#8C2B3D', name: '', description: '' },
        };
    },
    components: {
        Button,
    },
    methods: {
        handleFormField(fieldName, value) {
            this.formDate[fieldName] = value;
        },
        onSubmit() {
            this.$emit('submit', this.formDate);
            this.formDate.name = '';
            this.formDate.description = '';
        },
    },
};
</script>

<style scoped lang="less">
.block-form {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;

    &__input {
        width: 200px;
        padding: 8px;
        border-radius: 4px;
        border: 2px solid @cBaseThree;
        background: @cBaseTwo;

        font-family: @ffOne;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: @cBaseThree;

        &:focus {
            box-shadow: 0px 0px 20px @cBaseThree;
        }
    }
}
</style>
