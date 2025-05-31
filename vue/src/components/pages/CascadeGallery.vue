<template>
  <div class="cascade-gallery" ref="gallery">
    <div
      v-for="(img, index) in images"
      :key="index"
      class="cascade-gallery__item"
      :style="getItemStyle(index)"
      @mouseover="activeIndex = index"
      @mouseleave="activeIndex = null"
    >
      <img class="cascade-gallery__image" :src="img.src" :alt="img.alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CascadeGallery',
  data() {
    return {
      activeIndex: null,
      images: [
        { src: '/assets/image1.jpg', alt: 'Image 1' },
        { src: '/assets/image2.jpg', alt: 'Image 2' },
        { src: '/assets/image3.jpg', alt: 'Image 3' },
      ],
      baseWidths: [45, 35, 20], // начальные ширины в %
    };
  },
  methods: {
    getItemStyle(index) {
      const count = this.images.length;
      const defaultWidths = [50, 30, 20]; // Без наведения (в сумме 100)
      const expandedWidth = 75; // Сколько % даём активной
      const collapsedWidth = (100 - expandedWidth) / (count - 1); // Остальные

      let width, left = 0;

      if (this.activeIndex !== null) {
        // Наведена какая-то картинка
        const widths = this.images.map((_, i) =>
          i === this.activeIndex ? expandedWidth : collapsedWidth
        );

        // Вычисляем left для текущей картинки
        for (let i = 0; i < index; i++) {
          left += widths[i];
        }

        width = widths[index];
      } else {
        // Без наведения — стандартные ширины
        for (let i = 0; i < index; i++) {
          left += defaultWidths[i];
        }
        width = defaultWidths[index];
      }

      return {
        width: `${width}%`,
        left: `${left}%`,
        zIndex: this.activeIndex === index ? 3 : 1,
      };
    },
  },
};
</script>

<style scoped lang="less">
.cascade-gallery {
  position: relative;
  display: flex;
  height: 600px;
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;

  &__item {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.4s ease;
    border-radius: 8px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
}//
</style>
