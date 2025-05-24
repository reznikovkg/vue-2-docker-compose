<template>
  <div
      class="game"
      tabindex="0"
      ref="gameField"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
  >
    <div class="game__header">
      <div class="game__header__content">
        <h1 class="game__title">2048</h1>
        <div class="game__score-box">
          <span class="game__score-box__label">Счет:</span>
          <span class="game__score-box__value">{{ getScore }}</span>
        </div>
        <div class="game__score-box">
          <span class="game__score-box__label">Рекорд:</span>
          <span class="game__score-box__value">{{ getHighScore }}</span>
        </div>
        <button
            class="game__undo-button"
            :disabled="!canUndo"
            @click="undoMove"
        >
          <img src="@/utils/restartbtn.png" />
        </button>
        <button
            @click="addSpecificTiles"
        >
          Add 1024 Tiles
        </button>
        <div class="game__chaos-toggle">
          <button
              class="game__chaos-button"
              @click="toggleChaosMode"
          >
            {{ isChaosEnabled ? 'Отключить хаос' : 'Включить хаос' }}
          </button>
        </div>
      </div>
    </div>

    <div class="game__grid-size-selector">
      <label v-for="size in gridSizes" :key="size" class="game__grid-size-selector__item">
        <input
            v-model="selectedGridSize"
            class="game__grid-size-selector__radio"
            type="radio"
            :value="size"
            @change="updateGridSize"
        />
        <span
            class="game__grid-size-selector__button"
            :class="{ 'game__grid-size-selector__button--active': selectedGridSize === size }"
        >
          {{ size }}
        </span>
      </label>
    </div>

    <div class="game__board" :style="gridStyle">
      <GameTile
          v-for="cell in animatedTiles"
          :key="`tile-${cell.x}-${cell.y}`"
          :tile="cell.value"
          :formatted-value="cell.formattedValue"
          :is-frozen="cell.frozen"
          :position="{ x: cell.x, y: cell.y }"
          :move-from="cell.moveFrom"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameTile from '@/components/Tile.vue';
import { KEY_MAP } from "@/utils/keyMap";

export default {
  name: 'HomePage',
  components: {
    GameTile,
  },
  data() {
    return {
      selectedGridSize: 4,
      gridSizes: [4, 5, 6, 7, 8, 9, 10],
    };
  },
  computed: {
    ...mapGetters('game', [
      'getCells',
      'getScore',
      'getHighScore',
      'isGameOver',
      'isVictory',
      'canUndo',
      'getGridSize',
      'getFormattedCells',
      'hasPossibleMoves'
    ]),
    isChaosEnabled() {
      return this.$store.state.game.isChaosEnabled;
    },
    gridStyle() {
      const gridSize = this.getGridSize;
      return {
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        aspectRatio: '1 / 1',
        margin: 'auto',
        padding: 'clamp(5px, 2vw, 10px)',
        display: 'grid',
        gap: 'clamp(5px, 1vw, 10px)',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`
      };
    },
    flatGrid() {
      return this.$store.getters['game/getFormattedCells'] || [];
    },
    animatedTiles() {
      const movedTiles = this.$store.state.game.movedTiles || [];
      const tilesMap = new Map();

      // Сначала добавляем все текущие плитки
      this.flatGrid.forEach(cell => {
        const key = `tile-${cell.x}-${cell.y}`;
        tilesMap.set(key, {
          ...cell,
          moveFrom: null,
          uniqueKey: `${key}-${Date.now()}` // Добавляем временную метку
        });
      });

      // Затем обновляем информацию о перемещениях
      movedTiles.forEach(move => {
        const key = `tile-${move.to.x}-${move.to.y}`;
        if (tilesMap.has(key)) {
          tilesMap.get(key).moveFrom = { x: move.from.x, y: move.from.y };
        }
      });

      return Array.from(tilesMap.values());
    }
  },
  methods: {
    ...mapActions('game', [
      'moveByKeyEvent',
      'restartGame',
      'setFocus',
      'addSpecificTiles',
      'undoMove',
      'setGridSize',
      'toggleChaosMode',
      'restartGameWithGridSize'
    ]),
    handleFocus() {
      this.setFocus(true);
    },
    handleBlur() {
      setTimeout(() => {
        this.$refs.gameField.focus(); // Защищаем вызов focus
        this.setFocus(false);
      }, 0);
    },
    async handleKeyDown(event) {
      if (this.isAnimating) {
        event.preventDefault();
        return;
      }
      const direction = KEY_MAP[event.key];
      if (direction) {
        await this.moveByKeyEvent({ direction });
      }
    },
    updateGridSize() {
      this.restartGameWithGridSize(this.selectedGridSize).then(() => {
        this.restartGame();
      });
    }
  },
  mounted() {
    this.restartGame();
    this.$refs.gameField?.focus();
  }
};
</script>

<style scoped lang="less">
/* Стили остаются без изменений */
.game {
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #eee4da;
  height: 100vh;
  overflow: auto;
}

.game__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 620px;
  margin-bottom: 20px;
}

.game__header__content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.game__title {
  color: #bb8213;
  font-weight: 900;
  font-size: clamp(24px, 5vw, 48px);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 400px) {
    font-size: clamp(18px, 6vw, 36px);
  }
}

.game__score-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3bb4c;
  border-radius: 10px;
  width: clamp(100px, 20vw, 150px);
  height: clamp(50px, 10vw, 80px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &__label {
    font-size: clamp(12px, 2vw, 16px);
    margin-bottom: 4px;
  }

  &__value {
    font-size: clamp(16px, 3vw, 24px);
    font-weight: bold;
  }
}

.game__board {
  --cell-size: clamp(60px, 8vw, 100px);
  width: clamp(200px, 80vw, 600px);
  max-width: 90vw;
  aspect-ratio: 1 / 1;
  background-color: #d0d6da;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  display: grid;
  grid-gap: 10px;
  transition: all 0.3s ease;
}

.game__grid {
  display: contents;
}

.game__undo-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.game__grid-size-selector {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;

  &__item {
    position: relative;
    cursor: pointer;
  }

  &__radio {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    margin: 0;
    cursor: pointer;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #d9d9d9;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    z-index: 0;

    &:hover {
      background-color: #cfcfcf;
    }
  }

  &__button--active {
    background-color: #edc12e;
    color: #3f3b3b;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
}

.game__chaos-toggle {
  margin-top: 10px;
}

.game__chaos-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
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