<template>
  <div class="hero-carousel">
    <div
      v-if="returningFromDetail && lastReturnedHeroPosition"
      class="hero-carousel__placeholder"
      :style="imageStyle"
    />
    <div class="hero-carousel__container" :class="{'hero-carousel__container--visible': isVisible}">
      <div class="hero-carousel__track" :style="{ transform: `translateX(${offset}px)` }">
        <div
          v-for="(hero, i) in heroes"
          :key="i"
          class="hero-carousel__item"
          @click="handleClick(hero, $event)"
        >
          <HeroCard :hero="hero" />
        </div>
      </div>
      <div class="hero-carousel__controls">
        <button class="hero-carousel__button" @click="moveLeft">◄</button>
        <button class="hero-carousel__button" @click="moveRight">►</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SCALE_FACTOR } from '@/constants'
import { mapState, mapMutations } from 'vuex'
import HeroCard from './HeroCard.vue'

export default {
  components: { HeroCard },
  computed: {
    ...mapState([
      'returningFromDetail',
      'lastReturnedHeroName',
      'lastReturnedHeroPosition',
      'index'
    ]),
    offset() {
      return -this.index * (350 + 30)
    },
    imageStyle() {
      if (!this.lastReturnedHeroPosition) return {};
      
      const { top, left, width, height } = this.lastReturnedHeroPosition;
      
      const scaledWidth = width;
      const scaledHeight = height;

      const deltaX = (width - scaledWidth) / 2;
      const deltaY = (height - scaledHeight) / 2;

      return {
        position: 'fixed',
        top: top + deltaY + 'px',
        left: left + deltaX + 'px',
        width: scaledWidth + 'px',
        height: scaledHeight + 'px',
        backgroundImage: `url(${this.getHeroImage(this.lastReturnedHeroName)})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        zIndex: 2000,
        pointerEvents: 'none',
        transition: 'all 1s ease-in-out',
      };
    }
  },
  data() {
    return {
      heroes: [
        { name: 'Dragon Knight', image: '/assets/dragon_knight.png'},
        { name: 'Drow Ranger', image: '/assets/drow_ranger.png'},
        { name: 'Marci', image: '/assets/marci.png'},
        { name: 'Ancient Apparition', image: '/assets/ancient_apparition.png'},
        { name: 'Luna', image: '/assets/luna.png'},
        { name: 'Crystal Maiden', image: '/assets/crystal_maiden.png'},
        { name: 'Lina', image: '/assets/lina.png'},
        { name: 'Mirana', image: '/assets/mirana.png'}
      ],
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKey)
    setTimeout(() => {
      this.isVisible = true
    }, 70)
    if (this.returningFromDetail) {
      setTimeout(() => {
        this.clearReturningHero()
      }, 1000)
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKey)
  },
  methods: {
    ...mapMutations(['moveLeft', 'moveRight', 'selectHero', 'clearReturningHero']),
    handleKey(event) {
      event.preventDefault()
      if (event.key === 'ArrowRight') {
        this.moveRight()
      }
      if (event.key === 'ArrowLeft') {
        this.moveLeft()
      }
    },
    handleClick(hero, event) {
      const rect = event.currentTarget.getBoundingClientRect()
      const offsetX = (rect.width * SCALE_FACTOR - rect.width) / 2
      const offsetY = (rect.height * SCALE_FACTOR - rect.height) / 2 + 15
      this.selectHero({
        hero,
        position: {
          top: (rect.top - offsetY),
          left: (rect.left - offsetX),
          width: rect.width*SCALE_FACTOR,
          height: rect.height*SCALE_FACTOR
        },
        scale: SCALE_FACTOR
      })
      this.$router.push(`/hero/${encodeURIComponent(hero.name)}`)
    },
    getHeroImage(name) {
      const hero = this.heroes.find(h => h.name === name)
      return hero ? hero.image : ''
    }
  }
}
</script>

<style scoped lang="less">
	@import "@/less/const.less";

	.hero-carousel {
		position: relative;

		&__container {
			overflow: hidden;
			border: none;
			position: relative;
			margin: 0 auto;
			padding-left: 70px;
			opacity: 0;
			transition: opacity 1s ease-in-out;

			&--visible {
				opacity: 1;
			}
		}

		&__track {
			display: flex;
			transition: transform 0.5s ease-in-out;
			white-space: nowrap;
			gap: 30px;
		}

		&__item {
			min-width: 350px;
			cursor: pointer;
		}

		&__controls {
			display: flex;
			justify-content: center;
			gap: 20px;
			margin-top: 20px;
		}

		&__button {
			background: none;
			border: none;
			color: white;
			font-size: 24px;
			cursor: pointer;
			transition: color 0.3s;

			&:hover {
				color: red;
			}
		}
	}
</style>