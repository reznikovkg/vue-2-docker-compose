<template>
  <div :class="showInput ? 'wrapper active' : 'wrapper'">
    <unicon v-on:click="show" name="search" fill="gray"></unicon>
    <Input v-on:blur="hide" v-model="input" ref="input" />
  </div>
</template>

<script>
import {Input} from "element-ui";

export default {
  name: "SearchInput",
  data() {
    return {
      showInput: false,
      input: ''
    }
  },
  methods: {
    show() {
      this.showInput = !this.showInput;
      this.$refs.input.focus();
    },
    hide() {
      this.showInput = false;
    }
  },
  components: {Input}
};
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    column-gap: 24px;
    width: 24px;
    transition: 0.6s;
    overflow: hidden;
    cursor: pointer;
  }

  .active {
    width: 240px;
  }
</style>
