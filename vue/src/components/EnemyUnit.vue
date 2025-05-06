<template>
  <div class="enemy" :style="enemyStyle">
    <div class="enemy__health">
      ❤️{{ enemyHealth }}
    </div>
    <div class="enemy__dot" :style="enemyDotStyle"/>
  </div>
</template>

<script>
export default {
  name: 'EnemyUnit',
  props: {
    enemyHealth: {
      type: Number,
      required: true
    },
    enemyPixelPosition: {
      type: Object, // { x: Number, y: Number }
      required: true
    },
    isDead: {
      type: Boolean,
      required: true
    },
    enemyType: {
      type: String,
      required: true
    },
  },
  computed: {
    enemyStyle() {
      return {
        transform: `translate(${this.enemyPixelPosition.x}px, ${this.enemyPixelPosition.y}px)`,
        transition: 'transform 0.6s linear, opacity 0.4s ease',
        opacity: this.isDead ? 0 : 1,
      }
    },
    enemyDotStyle() {
      const imageMap = {
        slow: require('@/assets/enemies/enemy0.png'),
        normal: require('@/assets/enemies/enemy1.png'),
        fast: require('@/assets/enemies/enemy2.png'),
      };
      const imageUrl = imageMap[this.enemyType];
      return {
        backgroundImage: `url(${imageUrl})`
      };
    },
  }
}
</script>

<style lang="less">
.enemy {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 40px;
  height: 40px;
  &__dot {
    width: 22px;
    height: 22px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
  }
  &__health {
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    font-size: 10px;
    padding: 2px 2px;
    border-radius: 5px;
  }
}
</style>