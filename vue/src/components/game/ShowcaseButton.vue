<template>
  <button
      @click="() => show()"
      class="showcase-button"
  >Showcase
  </button>
</template>

<script>

import { showcaseModal } from '@/mixins/modals';

export default {
  name: 'ShowcaseButton',
  mixins: [showcaseModal],
  methods: {
    show() {
      this.openShowcaseModal()
    }
  },
}
</script>

<style scoped lang="less">
.showcase-button {
  background-color: rgb(204, 204, 204);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #a8a8a8;
  }
}
</style>
