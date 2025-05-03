<template>
  <div class="hero-detail">
    <button @click="goBack">Назад</button>
    <div class="hero-info">
      <h1 :style="textStyle">{{ hero.name }}</h1>
      <img
        v-if="selectedHero"
        :src="selectedHero.image"
        :alt="selectedHero.name"
        class="hero-detail__image"
        :style="imageStyle"
      />
      <p :style="textStyle">{{ hero.description }}</p>
    </div>
  </div>
</template>
<script>
import { SCALE_FACTOR } from '@/constants'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'HeroDetail',
  props: ['name'],
  data() {
    return {
      heroes: [
        {
          name: 'Dragon Knight',
          image: require('@/assets/dragon_knight.png'),
          description: 'Dragon Knight — персонаж, сочетающий силы дракона и рыцаря. Отличается высокой живучестью и мощными атакующими способностями.'
        },
        {
          name: 'Drow Ranger',
          image: require('@/assets/drow_ranger.png'),
          description: 'Drow Ranger — герой, обладающий мощными дальнобойными атаками. Идеально подходит для уничтожения врагов на расстоянии.'
        },
        {
          name: 'Marci',
          image: require('@/assets/marci.png'),
          description: 'Marci — агрессивный персонаж с сильными физическими атаками и уникальными способностями для контроля врагов.'
        },
        {
          name: 'Ancient Apparition',
          image: require('@/assets/ancient_apparition.png'),
          description: 'Ancient Apparition — магический герой с возможностью наносить урон через замораживание врагов и усиленные заклинания.'
        },
        {
          name: 'Luna',
          image: require('@/assets/luna.png'),
          description: 'Luna — персонаж, который обладает сильными атаками на расстоянии и мощными ультимейт-способностями для массового урона.'
        },
        {
          name: 'Crystal Maiden',
          image: require('@/assets/crystal_maiden.png'),
          description: 'Crystal Maiden — магический герой с контрольными способностями и сильными замораживающими атаками, которые замедляют врагов.'
        },
        {
          name: 'Lina',
          image: require('@/assets/lina.png'),
          description: 'Lina — маг, использующий огненные заклинания для нанесения урона врагам. Один из самых сильных героев в плане урона.'
        },
        {
          name: 'Mirana',
          image: require('@/assets/mirana.png'),
          description: 'Mirana — универсальный персонаж, который может быть как сильным стрелком, так и магом, с уникальными способностями для контроля и урона.'
        }
      ],
      isMoved: false, // переменная для отслеживания анимации
      isReversed: false, // флаг для обратной анимации
      targetXRatio: 0.7,
      textStyle: {
        opacity: 0,  // Изначально текст невидим
        transition: 'opacity 1s ease-in-out 500ms', // Плавное изменение прозрачности с задержкой
      },
    };
  },
  computed: {
    ...mapState({
      selectedHero: state => state.selectedHero,
      position: state => state.heroPosition
    }),
    hero() {
      const heroName = decodeURIComponent(this.name);
      return this.heroes.find(h => h.name === heroName);
    },
    imageStyle() {
      const targetX = this.targetXRatio * window.innerWidth;
      return {
        position: 'absolute',
        top: this.position.top + 'px',
        left: this.isReversed
          ? this.position.left + 'px'
          : this.isMoved
            ? targetX + 'px'
            : this.position.left + 'px',
        width: this.position.width + 'px',
        height: this.position.height + 'px',
        objectFit: 'contain',
        zIndex: 1000,
        transition: this.isReversed
          ? 'left 1s ease, transform 1s ease'
          : 'left 1s ease-in-out',
        transform: this.isReversed ? `scale(${1/SCALE_FACTOR})` : 'scale(1)',
      };
    }
  },
  methods: {
    ...mapMutations(['setReturningHero', 'clearHero']),
    goBack() {
      this.textStyle.opacity = 0;  // Текст начинает исчезать
      setTimeout(() => {
        this.isReversed = true;
        if (this.selectedHero && this.position) {
          this.setReturningHero({
            name: this.selectedHero.name,
            position: this.position,
          });
        }
        const heroDetail = document.querySelector('.hero-detail');
        heroDetail.classList.add('fade-out');
        setTimeout(() => {
          this.$router.back();
          setTimeout(() => {
            this.clearHero();
          }, 100); 
        }, 1000);
      }, 1000); 
    },
  },
  mounted() {
    setTimeout(() => {
      this.isMoved = true;
    }, 100);
    setTimeout(() => {
      this.textStyle.opacity = 1;
    }, 1000);
  }
}
</script>
<style scoped>
.hero-detail {
  padding: 0;
  margin: 0;
  color: white;
}
.hero-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-info img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  transition: transform 1s ease-in-out;
  gap: 20px;
}
button {
  background: none;
  color: white;
  border: 3px solid white;
  padding: 10px 20px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 20px;
}
button:hover {
  border: 3px solid red;
}
h1 {
  font-size: 24px;
  margin-top: 20px;
}

p {
  font-size: 18px;
  margin-top: 10px;
  text-align: left;
  max-width: calc(100% - 700px);
  word-wrap: break-word;
}
</style>
