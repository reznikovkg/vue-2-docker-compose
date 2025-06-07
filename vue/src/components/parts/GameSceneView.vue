<template>
  <div class="scene" :style="sceneStyle">
    <div class="character" :style="characterStyle"/>
    <div
        v-for="spot in scene.spots"
        :key="spot.id"
        class="spot"
        :style="{
          left: spot.x,
          top: spot.y,
          width: spot.width ? `${spot.width}px` : '50px',
          height: spot.height ? `${spot.height}px` : '50px'
        }"
        @click="() => handleSpotClick(spot)"
        :title="spot.description"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  props: {
    scene: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('game', [
      'character'
    ]),
    sceneStyle () {
      return {
        backgroundImage: `url(${this.scene.background})`,
        backgroundSize: 'cover'
      };
    },
    characterStyle () {
      return {
        left: `${this.character.x}px`,
        top: `${this.character.y}px`,
        transition: 'left 0.1s linear',
        transform: `scaleX(${this.character.direction})`
      };
    }
  },
  methods: {
    ...mapActions('game',[
      'moveToTarget'
    ]),
    handleSpotClick (spot) {
      const sceneElement = this.$el;
      const sceneWidth = sceneElement.offsetWidth;
      const sceneHeight = sceneElement.offsetHeight;

      const targetX = (parseInt(spot.x) / 100) * sceneWidth;
      const targetY = (parseInt(spot.y) / 100) * sceneHeight;

      this.moveToTarget({
        id: spot.id,
        x: targetX,
        y: targetY
      });
    }
  }
};
</script>

<style lang="less">
.scene {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.character {
  position: absolute;
  width: 40px;
  height: 60px;
  background-image: url('@/assets/character.png');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 10;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.spot {
  position: absolute;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    border-color: yellow;
  }
}
</style>
