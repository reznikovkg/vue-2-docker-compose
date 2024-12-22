<template>
  <div class="healthbar">
    <span class="healthbar__text">{{ currentHealth }}/{{maxHealth}}</span>
      <div class="healthbar-fill" 
        :style="{ '--health': `${healthPercent}%` }">
      </div>
      <div class="healthbar-shield"
        :style="{ '--shield': `${shieldPercent}%` }"
      >
        <p class="healthbar-shield__text" v-if="shield>0"> {{ shield }}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    currentHealth: Number,
    maxHealth: Number,
    shield: Number,
  },
  computed: {
    healthPercent() {
      return (Math.max(0, Math.min((100, this.currentHealth / this.maxHealth)*100)));
    },
    shieldPercent() {
      return (Math.max(0, Math.min(100, this.shield / this.maxHealth)*100));
    }
  },
};
</script>

<style scoped lang="less">
.healthbar {
  position: relative;
  height: 15px;
  width: 95%;
  margin: 0;
  border-radius: 20px;
  border: #000 solid 2px;
  background: #a09595;
  display: flex;
  z-index: 0;
  
  &__text {
    position: absolute;
    width: 100%;
    top: -2px;
    z-index: 1;
    font-size: 17px;
    font-weight: bold;
    text-shadow: #fff 0px 1px 1px;
  }

  &-fill {
    position: absolute;
    height: 100%;
    width: var(--health);
    border-radius: 20px;
    padding: 0;
    margin: 0;
    background: rgb(197, 48, 48);
  }

  &-shield {
    position: relative;
    height: 100%;
    width: var(--shield);
    border-radius: 20px;
    background: rgba(0, 247, 255, 0.678);

    &__text {
      position: absolute;
      color:#054047;
      left: 5px;
      top: -2px;
      z-index: 1;
      font-size: 17px;
      font-weight: bold;
      text-shadow: #1eebfa 0px 1px 1px;
    }
  }
}
</style>
