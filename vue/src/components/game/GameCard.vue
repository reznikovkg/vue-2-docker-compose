<template>
  <div class="game-card" :class="[{ enlarged }, { mulliganed }, { dragged: dragInfo.dragged }]"
    :style="faceDown ? faceDownStyle : faceUpStyle" @mousedown="(e) => handleMouseDown(e)" ref="draggableCard">
    <div v-if="!faceDown" class="game-card__content">
      <h3>{{ type }}</h3>
      <p>Score: {{ score }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TurnStates, GamePhases } from '@/engine/constants';

export default {
  name: 'GameCard',
  emits: [
    "onDrop",
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
  },
  data() {
    return {
      dragInfo: {
        x: null,
        y: null,
        deltaX: 0,
        deltaY: 0,
        dragged: false,
      },
      mulliganed: false,
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
    ...mapGetters('gameEngine', [
      'getGameEngine',
    ]),
  },
  methods: {
    handleMouseDown(event) {
      if (this.getGameEngine.currentPhase === GamePhases.MULLIGAN) {
        this.handleMulligan();
        return;
      }

      if (this.enlarged) {
        this.startDrag(event);
        return;
      }

      if (!this.faceDown && !this.isOpponent) {
        this.tryRemoveCard();
        return;
      }
    },
    handleMulligan() {
      this.mulliganed = this.getGameEngine.mulligan.tryGetNewCardStatus(this.index);
    },
    tryRemoveCard() {
      this.getGameEngine.removeCardFromBoard(this.index, this.type);
    },
    startDrag(event) {
      event.preventDefault();
      if (this.getGameEngine.currentTurn !== TurnStates.PLAYER) {
        return;
      }

      const parentBounds = event.currentTarget.parentNode.parentNode.getBoundingClientRect();
      const targetBounds = event.currentTarget.getBoundingClientRect();
      this.$refs.draggableCard.style.top = `${targetBounds.top - parentBounds.top}px`;
      this.$refs.draggableCard.style.left = `${targetBounds.left - parentBounds.left}px`;
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
  cursor: auto;
  user-select: none;
  width: 100px;
  height: 150px;
  border: 1px solid black;
  text-align: center;
  transition: transform 0.5s, background-color 0.3s, box-shadow 0.3s;

  &__content {
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  &.enlarged {
    width: 150px;
    height: 225px;
  }

  &.mulliganed {
    border-color: red;
    box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.8);
  }

  &:hover {
    border-color: gold;
    box-shadow: 0 0 15px 5px rgba(255, 223, 0, 0.8);
  }
}

.dragged {
  cursor: move;
  z-index: 777;
}
</style>
