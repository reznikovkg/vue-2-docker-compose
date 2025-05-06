<template>
  <div class="carousel__item">
    <img 
      :id="`hero-img-${hero.name}`" 
      :src="hero.image" 
      :alt="hero.name"
      class="carousel__image"
      :class="{ 'carousel__image--highlighted': isRecentlySelected }"
      :style="imageStyle"
    >
    <figcaption class="carousel__caption">{{ hero.name }}</figcaption>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['hero'],
  data() {
    return {
      shouldAnimate: false,
    }
  },
  computed: {
    ...mapState(['index', 'lastReturnedHeroName']),
    isRecentlySelected() {
      return this.lastReturnedHeroName === this.hero.name;
    },
    imageStyle() {
      if (this.isRecentlySelected && this.shouldAnimate) {
        return {
          transform: `scale(${this.getScaleFactor()})`,
          transition: 'transform 0.5s ease-in-out 1s',
        };
      }
      return {};
    }
  },
  methods: {
    getScaleFactor() {
      return getComputedStyle(document.documentElement).getPropertyValue('--scale-factor') || 1.2;
    }
  },
  watch: {
    isRecentlySelected(newVal) {
      if (newVal) {
        this.shouldAnimate = true;
        setTimeout(() => {
          this.shouldAnimate = false;
        }, 1500);
      }
    }
  }
}
</script>

<style scoped>
.carousel__item {
  min-width: 350px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-direction: column;
  cursor: pointer;
  position: relative;
}

.carousel__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
}

.carousel__image--highlighted {
  transform: scale(var(--scale-factor));
  transition: none;
}

.carousel__item:hover .carousel__image {
  transform: scale(var(--scale-factor));
}

.carousel__caption {
  text-align: center;
  color: white;
  font-size: 18px;
  background-color: none;
  padding: 5px 0;
  position: relative;
}

.carousel__caption::after {
  content: "Подробнее...";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.carousel__item:hover .carousel__caption::after {
  opacity: 1;
  visibility: visible;
}
</style>