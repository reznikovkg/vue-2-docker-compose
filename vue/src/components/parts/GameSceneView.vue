<template>
  <div
    class="scene"
    :style="{
    backgroundImage: `url(${currentBackground})`,
    backgroundColor: '#ddd'
    }"
  >
    <div class="game-scene-view">
    <div
      v-for="item in scene.items"
      :key="item.id"
      class="game-scene-view__item"
      :class="`game-scene-view__item--${item.id}`"
      :style="{ left: item.x, top: item.y }"
      @click="$emit('click-item', item)"
      :title="item.description"
    >
    </div>

    <div
      v-for="spot in scene.spots"
      :key="spot.id"
      class="game-scene-view__spot"
      :class="`game-scene-view__spot--${spot.id}`"
      :style="{
      left: spot.x,
      top: spot.y,
      width: `${spot.width}px`,
      height: `${spot.height}px`
      }"
        @click="$emit('click-spot', spot)"
        :title="spot.name"
    ></div>
  </div>
  </div>
</template>

<script>
import roomBg from '@/assets/bedroom.png';
import hallwayBg from '@/assets/hallway-bg.png';
import kitchenBg from '@/assets/kitchen.png';
import houseBg from '@/assets/room-bg.png';

export default {
  name: 'GameSceneView',
  props: {
    scene: {
      type: Object,
      required: true
    },
    selectedItem: Object
  },
  computed: {
    currentBackground() {
      switch (this.scene.id) {
        case 'house':
          return houseBg;
        case 'hallway':
          return hallwayBg;
        case 'kitchen':
          return kitchenBg;
        case 'bedroom':
          return roomBg;
        default:
          return houseBg;
      }
    }
  }
};
</script>

<style lang="less">
@import '@/less/const.less';


.scene {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.game-scene-view {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;

  &__item {
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: yellow;
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }

  &__image {
    width: 32px;
    height: 32px;
    pointer-events: none;
  }

  &__spot {
    position: absolute;
    border: 2px dashed @cBaseFour;
    cursor: pointer;
    opacity: 0.7;
  }
}
</style>