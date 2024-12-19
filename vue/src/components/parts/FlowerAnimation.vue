<template>
  <div class="flower-fall-container">
    <img
      v-for="(flower, i) in flowers"
      :key="i"
      :src="flower.src"
      class="falling-flower"
      :style="flower.style"
    />
  </div>
</template>

<script>
export default {
  name: "FlowerAnimation",
  data() {
    return {
      flowerCount: 20,
      flowerImages: [
        require("../../assets/images/flower-background.png"),
        require("../../assets/images/flower-cell-image.png"),
      ],
      flowers: [],
    };
  },
  mounted() {
    this.generateFlowers();
  },
  methods: {
    generateFlowers() {
      this.flowers = Array.from({ length: this.flowerCount }, () => ({
        src: this.getRandomFlowerImage(),
        style: this.getRandomStyle(),
      }));
    },
    getRandomFlowerImage() {
      return this.flowerImages[
        Math.floor(Math.random() * this.flowerImages.length)
      ];
    },
    getRandomStyle() {
      const isMobile = window.innerWidth <= 480;
      const randomX = isMobile ? Math.random() * 60 - 10 : Math.random() * 100;
      const randomDelay = Math.random() * 5;
      const randomDuration = Math.random() * (5 - 3) + 3;
      const randomScale = Math.random() * (3 - 1) + 1;
      const image = new Image();
      image.src = this.getRandomFlowerImage();
      const aspectRatio = image.width / image.height;
      const randomWidth = Math.random() * (150 - 100) + 100;
      const randomHeight = randomWidth / aspectRatio;
      return {
        left: `${randomX}vw`,
        animationDelay: `${randomDelay}s`,
        animationDuration: `${randomDuration}s`,
        width: `${randomWidth * randomScale}px`,
        height: `${randomHeight * randomScale}px`,
        objectFit: "contain",
      };
    },
  },
};
</script>

<style scoped lang="less">
.flower-fall-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.falling-flower {
  position: absolute;
  top: -10%;
  animation: fallAnimation linear infinite;
}

@keyframes fallAnimation {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
