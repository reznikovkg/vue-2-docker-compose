<template>
  <ul class="tab-bar">
    <li
      v-for="(item, index) in tabs"
      :key="index"
      class="tab-bar__item"
      :class="{ 'tab-bar__item--active': activePageIndex === index }"
      @click="() => $emit('tabChange', index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabBar',
  emits: ["tabChange"],
  props: {
    activePageIndex: {
      type: Number,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.tab-bar {
  display: flex;
  margin: 0;
  padding: 0;

  &__item {
    list-style: none;
    margin: 0;
    padding: 1em;
    width: 100%;
    text-align: center;
    border-bottom: 4px solid transparent;
    background-color: @cBackground2;
    cursor: pointer;
    transition: all 300ms;

    &:hover {
      border-bottom: 4px solid @cForeground;
    }

    &--active {
      border-bottom: 4px solid @cAccent;
    }
  }
}
</style>
