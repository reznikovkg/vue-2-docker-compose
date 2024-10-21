<template>
    <div class="text-area-wrapper">
        <label for="input" class="text-area-wrapper__label">{{ label }}</label>
        <textarea
            :value="value"
            @input="onInputChange($event.target.value)"
            class="text-area-wrapper__text-area"
            :placeholder="placeholder"
            rows="2"
        />
    </div>
</template>

<script>
export default {
    name: 'CustomTextarea',
    props: {
        label: String,
        placeholder: String,
        value: String,
        input: Function,
    },
    methods: {
        onInputChange(event) {
            this.$emit('input', event);
        },
    },
};
</script>

<style scoped lang="less">
.text-area-wrapper {
    display: flex;
    flex-direction: column;

    &__label {
        font-family: @ffOne;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: left;

        color: @cBaseNine;
    }

    &__text-area {
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
