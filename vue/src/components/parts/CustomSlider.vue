<template>
  <div>
    <div class="head">
      <div class="title">{{ title }}</div>
      <div class="controls">
        <button class="arrow" @click="toPrev" :disabled="index === 0">
          <unicon name="angle-left-b" fill="currentColor"></unicon>
        </button>
        <button class="arrow" @click="toNext" :disabled="index + itemsInRow === items.length">
          <unicon name="angle-right-b" fill="currentColor"></unicon>
        </button>
      </div>
    </div>
    <div class="grid">
      <component v-bind:is="component" v-for="item in items.slice(index, index + itemsInRow)" v-bind:key="item.id" v-bind="item" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomSlider',
    data: () => {
      return {
        index: 0
      }
    },
    methods: {
      toNext() {
        this.index += 1;
      },
      toPrev() {
        this.index -= 1;
      }
    },
    props: ['items', 'title', 'itemsInRow', 'component'],
  }
</script>

<style scoped lang="scss">
  .head {
    margin-top: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .controls {
    position: absolute;
    right: calc((100vw - 1200px) / 2);
    top:50%;
    transform: translateY(-50%);
    display: flex;
    width: fit-content;

    .arrow {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      cursor: pointer;

      &:disabled {
        cursor: auto;
      }
    }
  }
  .title {
    font-size: 40px;
    font-weight: bold;
    text-align: center;
  }
  .grid {
    display: flex;
    column-gap: 20px;
    margin-top: 40px;
    margin-inline: auto;
    width: fit-content;
  }
</style>
