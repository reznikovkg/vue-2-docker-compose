<template>
  <div
      class="game-card"
      :class="[{ enlarged }, { dragged: dragInfo.dragged }]"
      :style="style"
      @mousedown="(e) => enlarged ? startDrag(e) : tryRemoveCard(index, type)"
      ref="draggableCard"
  >
    <div v-if="!faceDown" class="game-card__content">
      <h3>{{ type }}</h3>
      <p>Score: {{ score }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TurnStates } from '@/engine/constants';

export default {
  name: 'GameCard',
  emits: [
    'onDrop',
  ],
  props: {
    score: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    imageUri: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    faceDown: {
      type: Boolean,
      default: false,
    },
    enlarged: {
      type: Boolean,
      default: false,
    },
    isOpponent: {
      type: Boolean,
      default: false,
    },
    onTable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      dragInfo: {
        x: null,
        y: null,
        deltaX: 0,
        deltaY: 0,
        dragged: false,
      }
    }
  },
  computed: {
    faceUpStyle() {
      let image = require(`@/assets/cards/${this.imageUri}`);

      return {
        backgroundImage: `url(${image})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      };
    },
    faceDownStyle() {
      return {
        backgroundColor: 'gray',
      };
    },
    style() {
      const sideStyle = this.faceDown ? this.faceDownStyle : this.faceUpStyle;

      if (this.dragInfo.dragged || this.onTable) {
        return sideStyle;
      }

      const cardsLength = this.isOpponent ? this.getGameEngine.opponent.cards.length : this.getGameEngine.player.cards.length

      const angle = (this.index - (cardsLength - 1) / 2) * 7;
      const isHovered = this.hoveredIndex === this.index;
      const mid = Math.round(cardsLength / 2)
      const style = {
        zIndex: isHovered ? 100 : this.index,
      }

      if (this.draggedIndex !== this.index) {
        style.transform = `translate(${this.index * 60 - (cardsLength - 1) * 30}px, ${Math.abs(mid - this.index) * 15}px)  rotate(${angle}deg)`;
      }

      return {
        ...style,
        ...sideStyle,
      }
    },
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    tryRemoveCard(index, type) {
      if (this.isOpponent || this.faceDown) {
        return;
      }

      this.getGameEngine.removeCardFromBoard(index, type);
    },
    startDrag(event) {
      event.preventDefault();
      if (this.getGameEngine.currentTurn !== TurnStates.PLAYER) {
        return;
      }

      const parentBounds = event.currentTarget.parentNode.parentNode.getBoundingClientRect();
      this.$refs.draggableCard.style.top = `${event.clientY - parentBounds.top - 150}px`;
      this.$refs.draggableCard.style.left = `${event.clientX - parentBounds.left - 75}px`;
      this.dragInfo.x = event.clientX;
      this.dragInfo.y = event.clientY;
      document.onmousemove = this.processDrag;
      document.onmouseup = this.stopDrag;
      this.$refs.draggableCard.style.position = 'absolute';
      this.dragInfo.dragged = true;
    },
    processDrag(event) {
      event.preventDefault();
      this.dragInfo.deltaX = this.dragInfo.x - event.clientX;
      this.dragInfo.deltaY = this.dragInfo.y - event.clientY;
      this.dragInfo.x = event.clientX;
      this.dragInfo.y = event.clientY;
      this.$refs.draggableCard.style.top = `${this.$refs.draggableCard.offsetTop - this.dragInfo.deltaY}px`;
      this.$refs.draggableCard.style.left = `${this.$refs.draggableCard.offsetLeft - this.dragInfo.deltaX}px`;
    },
    stopDrag(event) {
      event.preventDefault();
      this.$refs.draggableCard.style.position = 'relative';
      document.onmousemove = null;
      document.onmouseup = null;
      this.$refs.draggableCard.style.top = '0px';
      this.$refs.draggableCard.style.left = '0px';
      this.dragInfo.dragged = false;

      this.$emit('onDrop', { index: this.index, x: event.clientX, y: event.clientY, cursor: { x: event.pageX, y: event.pageY } });
    }
  }
};
</script>

<style scoped lang="less">
.game-card {
  cursor: move;
  user-select: none;
  width: 100px;
  height: 150px;
  border: 1px solid black;
  text-align: center;

  &__content {
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  &.enlarged {
    width: 150px;
    height: 225px;
  }
}

.dragged {
  z-index: 777;
}

.game-card:hover {
  border-color: gold;
  background-color: yellow;
  box-shadow: 0 0 15px 5px rgba(255, 223, 0, 0.8);
}
</style>
