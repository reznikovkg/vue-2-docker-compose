<template>
  <div class="defender" :style="styleObject">
    <div class="defender__health">
      💜{{ defenderHealth }}
    </div>
    <div class="defender__dot" :style="{ backgroundImage: require('@/assets/defender.png') }"/>
  </div>
</template>

<script>
export default {
  name: 'DefenderUnit',
  props: {
    pixel: {
      type: Object,
      required: true,
    },
    isDead: {
      type: Boolean,
      required: true,
    },
    defenderHealth: {
      type: Number,
      required: true,
    }
  },
  computed: {
    styleObject() {
      return {
        transform: `translate(${this.pixel.x}px, ${this.pixel.y}px)`,
        transition: 'transform 0.5s linear, opacity 0.4s ease',
        opacity: this.isDead ? 0 : 1,
      }
    },
  }
}
</script>

<style lang="less">
@import '@/less/const.less';
.defender {
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
    background-image: url(@/assets/defender.png);
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
