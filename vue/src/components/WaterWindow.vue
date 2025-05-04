<template>
  <div class="water-window">
    <svg class="wave-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <path 
        v-for="(wave, index) in waves" 
        :key="index"
        class="wave"
        :d="generateWavePath(index)"
        :style="getWaveStyle()"
      />
    </svg>
  </div>
  </template>
  
  <script>
 export default {
  name: 'WaterWindow',
  data() {
    return {
      waves: 7,
      isSine: true,
      timer: null
    }
  },
  methods: {

    generateWavePath(index) {
      const amplitude = 25;
      const frequency = 0.05;
      const verticalOffset = 90 + index * 150;
      
      let path = `M 0 ${verticalOffset}`;
      for (let x = 0; x <= 1000; x += 10) {
        const func = this.isSine ? 
      (index % 2 === 0 ? Math.sin : Math.cos):
      (index % 2 === 0 ? Math.cos : Math.sin);
    
      const y = verticalOffset + amplitude * func(frequency * x);
        path += ` L ${x} ${y}`;
      }
      return path;
    },

    getWaveStyle() {
  return {
    'stroke-width': 3,
    'opacity': 0.8,
    'stroke': `hsl(210, 80%, 70%)`
  }
}
  },
  mounted() {
    this.timer = setInterval(() => {
      this.isSine = !this.isSine;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
  
<style scoped>

.water-window {
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background: rgb(51, 51, 199); 
  z-index:1;
}

.wave-svg {
  width: 100vw;
  height: 100vh;
}

.wave {
  fill: none;
  stroke-linecap: round;
  transition: d 0.8s ease-in-out;
}
  </style>