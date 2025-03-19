<template>
  <div class="enemy-unit">
    <div v-if="enemyPosition === index && enemyHealth > 0" class="enemy-dot"></div>
    <div v-if="enemyPosition === index && enemyHealth > 0" class="enemy-health">
      {{ enemyHealth }} HP
    </div>
  </div>
</template>

<script>
export default {
  props: {
    enemyPosition: {
      type: Number,
      required: true
    },
    enemyHealth: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.enemy-dot {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.enemy-health {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: 5px;
}
</style>