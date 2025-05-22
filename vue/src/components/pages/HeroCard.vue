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
      scaleFactor: 1.08 // Фиксированное значение вместо CSS-переменной
    }
  },
  computed: {
    ...mapState(['index', 'lastReturnedHeroName']),
    isRecentlySelected() {
      return this.lastReturnedHeroName === this.hero.name;
    },
    imageStyle() {
      const styles = {
        transition: 'transform 0.3s ease-in-out' // Базовый transition
      };

      if (this.isRecentlySelected && this.shouldAnimate) {
        return {
          ...styles,
          transform: `scale(${this.scaleFactor})`,
          transition: 'transform 0.5s ease-in-out'
        };
      }
      return styles;
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

<style scoped lang="less">
	@import "@/less/const.less";

	.carousel {
		&__item {
			min-width: 350px;
			height: 400px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24px;
			flex-direction: column;
			cursor: pointer;
			position: relative;

			&:hover {
				.carousel__image:not(.carousel__image--highlighted) {
					transform: scale(1.08);
				}

				.carousel__caption::after {
					opacity: 1;
					visibility: visible;
				}
			}
		}

		&__image {
			width: 100%;
			height: 100%;
			object-fit: contain;
			transform: scale(1);
			will-change: transform;

			&--highlighted {
				transform: scale(1.08);
				transition: none !important;
			}
		}

		&__caption {
			text-align: center;
			color: white;
			font-size: 18px;
			background-color: transparent;
			padding: 5px 0;
			position: relative;

			&::after {
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
		}
	}
</style>