<template>
  <div class="cascade-gallery" :style="{ width: totalWidth + 'px' }">
    <div
      v-for="(img, index) in images"
      :key="index"
      class="cascade-gallery__item"
      :style="getItemStyle(index)"
      @mouseover="activeIndex = index"
      @mouseleave="activeIndex = null"
    >
      <img
        class="cascade-gallery__image"
        :src="img.src"
        :alt="img.alt"
        @load="updateImageWidths"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
      imageWidths: [],
      totalWidth: 0,
      images: [
        { src: '/assets/image1.jpg', alt: 'Image 1' },
        { src: '/assets/image2.jpg', alt: 'Image 2' },
        { src: '/assets/image3.jpg', alt: 'Image 3' },
      ],
    };
  },
  methods: {
    updateImageWidths() {
      this.$nextTick(() => {
        const imgs = this.$el.querySelectorAll('.cascade-gallery__image');
        this.imageWidths = Array.from(imgs).map(img => img.naturalWidth || 400);
        this.totalWidth = this.imageWidths.reduce((a, b) => a + b, 0);
      });
    },
    getItemStyle(index) {
      if (!this.imageWidths.length) return {};

      const isActive = this.activeIndex === index;
      const baseWidths = [...this.imageWidths];
      const total = this.totalWidth;
      const activeScale = 1.5;

      let adjustedWidths = [];

      if (this.activeIndex === null) {
        adjustedWidths = baseWidths;
      } else {
        const activeW = baseWidths[this.activeIndex] * activeScale;
        const others = baseWidths
          .map((w, i) => i !== this.activeIndex ? w : 0);
        const sumOthers = others.reduce((a, b) => a + b, 0);

        adjustedWidths = baseWidths.map((w, i) => {
          if (i === this.activeIndex) return activeW;
          return (w / sumOthers) * (total - activeW);
        });
      }

      const left = adjustedWidths.slice(0, index).reduce((a, b) => a + b, 0);

      return {
        position: 'absolute',
        top: '0',
        left: `${left}px`,
        width: `${adjustedWidths[index]}px`,
        height: '100%',
        zIndex: isActive ? 3 : 1,
        transition: 'all 0.4s ease',
      };
    },
  },
};
</script>

<style scoped>
.cascade-gallery {
  position: relative;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
}

.cascade-gallery__item {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: #000;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.1),
    2px 2px 5px rgba(0, 0, 0, 0.2);
}

.cascade-gallery__image {
  height: 100%;
  width: auto;
  display: block;
}
</style>
