<template>
    <label class="file-wrapper">
        Загрузить файл...
        <input
            @change="onInputChange"
            class="file-wrapper__upload-image-input"
            type="file"
            name="photo"
        />
    </label>
</template>

<script>
export default {
    name: 'CustomFileInput',
    props: { upload: Function },
    methods: {
        onInputChange(event) {
            this.$emit('upload', event.target.files[0]);
        },
    },
};
</script>

<style scoped lang="less">
.file-wrapper {
    height: 40px;
    width: 228px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid @cBaseEleven;

    font-family: @ffOne;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    background: @cBaseEleven;
    color: @cBaseWhite;

    &:hover {
        border: 1px solid @cBaseTen;
        color: @cBaseWhite;
    }

    &__upload-image-input {
        display: none;
    }
}
</style>
