<template>
  <PageLayout>
    <section>
      <div
        class="game"
        tabindex="0"
        @keydown="(event) => handleKeyDown(event)"
      >
        <div class="game__header">
          <div class="game__header__content">
            <h1 class="game__title">2048</h1>
              <div class="game__score-box">
                <span class="game__score-box__label">Счет:</span>
                <span class="game__score-box__value">{{ getScore }}</span>
              </div>
            </div>
          </div>
        <div class="game__board">
          <div class="game__grid">
            <GameTile
              v-for="(cell, index) in getCells"
              :key="index"
              :tile="cell"
              :style="tilePositions[index]"
            />
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PageLayout from '../parts/PageLayout';
import GameTile from '@/components/Tile.vue';
import { KEY_MAP } from '@/utils/keyMap.js';


export default {
  name: 'HomePage',
  components: { GameTile, PageLayout },
  computed: {
    ...mapGetters('game', [
      'getCells',
      'getScore',
      'isGameOver',
      'isVictory',
    ]),

    tilePositions() {
      return this.getCells.map((_, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        return {
          gridRow: row + 1,
          gridColumn: col + 1,
        };
      });
    },
  },
  methods: {
    ...mapActions('game', [
      'move',
      'restartGame',
    ]),
    handleKeyDown(event) {
      event.preventDefault();
      const direction = KEY_MAP[event.key];
      if (direction) {
        this.move(direction);
      }
    },
  },
  mounted() {
    this.restartGame();
    this.$el.focus();
  },
};
</script>

<style scoped lang="less">
.game {
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(20px, 5vw, 40px);
  background-color: #eee4da;

  &__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 620px;
    margin-bottom: clamp(10px, 2vw, 20px);

    &__content {
      display: flex;
      align-items: center;
      gap: clamp(10px, 2vw, 20px);
      flex-wrap: wrap;
    }
  }

  &__title {
    color: #bb8213;
    font-weight: 900;
    font-size: clamp(24px, 5vw, 48px);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
  }

  &__score-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f3bb4c;
    border-radius: 10px;
    width: clamp(80px, 15vw, 150px);
    height: clamp(40px, 8vw, 80px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: clamp(5px, 1vw, 10px);

    &__label {
      font-size: clamp(10px, 1.5vw, 16px);
      margin-bottom: clamp(2px, 0.5vw, 4px);
    }

    &__value {
      font-size: clamp(14px, 2vw, 24px);
      font-weight: bold;
    }
  }

  &__board {
    display: grid;
    gap: clamp(5px, 1vw, 10px);
    width: clamp(200px, 80vw, 430px);
    padding: clamp(8px, 1vw, 15px);
    background-color: #d0d6da;
    border-radius: 8px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    @media (max-width: 400px) {
      gap: 5px;
      padding: 5px;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(5px, 1vw, 10px);
    width: 100%;
    max-width: 100%;
    max-height: calc(100% - 50px);
    height: auto;

    @media (max-width: 400px) {
      gap: 5px;
    }
  }
}

&__modal {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }
}

&__tile {
  &-enter-active {
    animation: pop-in 0.4s ease;
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
