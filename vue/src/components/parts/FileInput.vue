<template>
  <label class="file-wrapper">
    Загрузить файл...
    <input
      type="file"
      name="photo"
      class="upload-photo"
      @change="onInputChange"
    />
  </label>
</template>

<script>
export default {
  name: "CustomFileInput",
  props: { upload: Function },
  methods: {
    onInputChange(event) {
      this.$emit("upload", event.target.files[0]);
    },
  },
};
</script>

<style scoped lang="less">
.file-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 228px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

.upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
