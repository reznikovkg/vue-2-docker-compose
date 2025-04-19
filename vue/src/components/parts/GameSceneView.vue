<template>
  <div
      class="game-scene-view"
      :style="{ backgroundImage: `url(${scene.background})`}"
  >
    <div
        v-for="item in scene.items"
        :key="item.id"
        class="game-scene-view__item"
        :style="{
          left: item.x ,
          top: item.y }"
        @click="() => $emit('click-item', item)"
        :title="item.name"
    >
      <img
          :src="item.image"
          :alt="item.name"
          class="game-scene-view__image"
      >
    </div>

    <div
        v-for="spot in scene.spots"
        :key="spot.id"
        class="game-scene-view__spot"
        :style="{
          left: spot.x ,
          top: spot.y,
          width: `${spot.width}px`,
          height: `${spot.height}px`
       }"
        @click="() => $emit('click-spot', spot)"
        :title="spot.description"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    scene: Object,
    selectedItem: Object
  }
}
</script>

<style lang="less">
.game-scene-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.game-scene-view__item {
  position: absolute;
  padding: 5px 10px;
  background-color: @cBaseOne;
  border: 1px solid @cBaseNine;
  border-radius: 1px;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.game-scene-view__image {
  width: 10px;
  height: 10px;
}

.game-scene-view__item:hover .game-scene-view__image {
  transform: scale(1);
}

.game-scene-view__item:hover {
  background-color: @cBaseOne;
}

.game-scene-view__spot {
  position: absolute;
  border: 2px dashed @cBaseFour;
  cursor: pointer;
}

.game-scene-view__spot:hover {
  background-color: @cBaseFive;
}
</style>