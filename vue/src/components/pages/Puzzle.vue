<template>
  <PageLayout>
    <h1 class="puzzle__head">This is your puzzle</h1>
    <div class="puzzle">
      <button
        class="puzzle__hint-button"
        @click="() => giveHintAndCheck()"
      >
        Hint
      </button>
      <h1 class="puzzle__timer">{{ getFormattedTime }}</h1>
      <button
        class="puzzle__undo-button"
        @click="() => undo()"
      >
        Undo
      </button>
    </div>
    <div
      class="puzzle"
      @mouseleave="() => onMouseLeave()"
    >
      <div
        class="puzzle__assembly"
        :style="{
          width: getPuzzleContainerWidth + 'px',
          height: getPuzzleContainerHeight + 'px'
        }"
        @mousemove="(event) => onMouseMove(event)"
      >
        <div
          v-for="(piece, index) in pieces"
          :key="piece.id"
          class="puzzle__piece"
          :style="piece.style"
          @mousedown="(event) => startDrag(event, index)"
          @mouseup="() => stopDrag(index)"
        >
        </div>
      </div>
    </div>
    <div class="puzzle">
      <button
        class="puzzle__reset-button"
        @click="() => resetPuzzle()"
      >
        Reset
      </button>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { ROUTER_NAMES } from "@/router/routes";
import { mapGetters, mapMutations, mapActions } from "vuex";
import HelpModal from "@/components/modals/HelpModal.vue";

export default {
  name: ROUTER_NAMES.PUZZLE,
  components: {
    PageLayout
  },
  data () {
    return {
      isDragging: false,
      dragIndex: null,
      offset: { x: 0, y: 0 },
      isSolvedModalOpen: false
    }
  },
  computed: {
    ...mapGetters('puzzle', [
      'getPuzzlePieces',
      'getPuzzleContainerWidth',
      'getPuzzleContainerHeight'
    ]),
    ...mapGetters('timer', [
      'getFormattedTime'
    ]),
    pieces () {
      return this.getPuzzlePieces.map(piece => ({
        style: {
          left: piece.x + 'px',
          top: piece.y + 'px',
          width: piece.width + 'px',
          height: piece.height + 'px',
          position: 'absolute',
          backgroundImage: "url(" + piece.src + ")",
          backgroundPosition: "-" + piece.initialX + "px -" + piece.initialY + "px",
          backgroundSize: this.getPuzzleContainerWidth + "px " + this.getPuzzleContainerHeight + "px",
        }
      }))
    }
  },
  mounted () {
    this.initializePuzzle()
    this.startTimer()
  },
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    ...mapActions('puzzle', [
      'updatePuzzlePieces',
      'initializePuzzle',
      'giveHint',
      'recordMove',
      'undo'
    ]),
    ...mapActions('timer', [
      'startTimer',
      'stopTimer',
      'resetTimer'
    ]),
    startDrag (event, index) {
      this.isDragging = true
      this.dragIndex = index
      this.offset.x = event.clientX - this.getPuzzlePieces[index].x
      this.offset.y = event.clientY - this.getPuzzlePieces[index].y
    },
    stopDrag (index) {
      if (!(this.isDragging && this.dragIndex === index)) {
        this.isDragging = false
        this.dragIndex = null
        this.recordMove()
        return
      }
      const piece = this.getPuzzlePieces[index];
      const cellX = Math.round(piece.x / piece.width) * piece.width
      const cellY = Math.round(piece.y / piece.height) * piece.height
      const inContainer = (
        cellX >= 0 &&
        cellY >= 0 &&
        cellX < this.getPuzzleContainerWidth &&
        cellY < this.getPuzzleContainerHeight
      )
      const distanceX = Math.abs(piece.x - cellX)
      const distanceY = Math.abs(piece.y - cellY)
      const distanceXToJoin = piece.width * 0.5
      const distanceYToJoin = piece.height * 0.5
      const isJoin = (
        distanceX < distanceXToJoin &&
        distanceY < distanceYToJoin
      )
      const isBusy = this.getPuzzlePieces.some((otherPiece, i) =>
        i !== this.dragIndex &&
        this.getPuzzlePieces[i].x === cellX &&
        this.getPuzzlePieces[i].y === cellY
      )
      if (inContainer && !isBusy && isJoin)
      {
        piece.x = cellX
        piece.y = cellY
        this.updatePuzzlePieces(this.getPuzzlePieces)
      }
      this.recordMove()
      this.checkIfPuzzleIsSolved()
      this.isDragging = false
      this.dragIndex = null
    },
    onMouseMove (event) {
      if (this.isDragging && this.dragIndex !== null) {
        const piece = this.getPuzzlePieces[this.dragIndex]
        piece.x = event.clientX - this.offset.x
        piece.y = event.clientY - this.offset.y
        this.updatePuzzlePieces(this.getPuzzlePieces)
      }
    },
    onMouseLeave () {
      this.isDragging = false
      this.dragIndex = null
    },
    checkIfPuzzleIsSolved () {
      if (this.isSolvedModalOpen) {
        return
      }
      const pieces = this.getPuzzlePieces
      const isSolved = pieces.every(piece => {
        return (
          Math.abs(piece.x - piece.correctX) === 0 &&
          Math.abs(piece.y - piece.correctY) === 0
        )
      })
      if (isSolved) {
        this.isSolvedModalOpen = true
        this.stopTimer()
        this.openModal({
          component: HelpModal,
          params: {
            title: 'Congratulations',
            message: 'You completed the puzzle'
          }
        })
      }
    },
    giveHintAndCheck () {
      this.giveHint()
      this.checkIfPuzzleIsSolved()
    },
    resetPuzzle () {
      this.isSolvedModalOpen = false
      this.stopTimer()
      this.resetTimer()
      this.initializePuzzle()
      this.startTimer()
    }
  }
}
</script>

<style scoped lang="less">
.puzzle {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  &__head {
    font-size: 32px;
    text-align: center;
    margin-top: 30px;
    font-family: @ffThree;
  }
  &__assembly {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 2px dashed @cBorderOne;
    overflow: visible;
  }
  &__piece {
    user-select: none;
    border: 1px solid @cBorderOne;
    overflow: hidden;
  }
  &__timer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7%;
    padding: 2% 3%;
    border: 1px solid @cBorderOne;
    border-radius: 10px;
    margin-left: 1%;
    font-size: 20px;
    font-family: @ffThree;
  }
  &__hint-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    padding: 2% 3%;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    background-color: #7C7C7C;
    &:hover {
      background-color: #707070;
    }
  }
  &__undo-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    padding: 2% 3%;
    border: none;
    border-radius: 10px;
    margin-left: 1%;
    font-size: 16px;
    color: white;
    background-color: #7C7C7C;
    &:hover {
      background-color: #707070;
    }
  }
  &__reset-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36%;
    padding: 2% 3%;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: white;
    background-color: @cBaseFive;
    &:hover {
      background-color: #772534;
    }
  }
}
</style>
