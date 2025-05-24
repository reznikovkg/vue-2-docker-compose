<template>
  <div class="build-item" @click="() => selectItem()">
    <component :style="{ transform: 'rotateX(45deg) rotateZ(45deg)' }" :is="buildItemitem.component" />
  </div>
</template>

<script>
export default {
  props: {
    buildItemitem: Object,
  },
  methods: {
    selectItem() {
      this.$emit("select-item", this.buildItemitem);
    },
  },
};
</script>

<style lang="less">
.build-item {
  background: #444;
  padding: 10px 20px;
  color: white;
  cursor: grab;
  user-select: none;
  border-radius: 5px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  div img {
    max-width: 100px !important;
  }
}
</style>
