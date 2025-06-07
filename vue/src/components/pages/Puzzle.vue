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
        <svg style="position: absolute">
          <defs>
            <mask
              v-for="(piece) in getPuzzlePieces"
              :key="'mask-'+piece.id"
              :id="'mask-'+piece.id"
            >
              <path
                :d="generatePuzzleShape(piece)"
                fill="white"
              />
            </mask>
          </defs>
        </svg>
        <div
          v-for="(piece, index) in pieces"
          :key="piece.id"
          class="puzzle__piece"
          :style="piece.style"
          @mousedown="(event) => startDrag(event, index)"
          @mouseup="() => stopDrag(index)"
        />
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
import { ROUTER_NAMES } from "@/router/routes"
import { mapGetters, mapMutations, mapActions } from "vuex"
import HelpModal from "@/components/modals/HelpModal.vue"

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
      'getPiecePadding',
      'getPuzzleContainerWidth',
      'getPuzzleContainerHeight'
    ]),
    ...mapGetters('timer', [
      'getFormattedTime'
    ]),
    pieces () {
      return this.getPuzzlePieces.map((piece) => {
        let peaceLeft = piece.x
        let peaceTop = piece.y
        let backgroundPositionX = piece.initialX
        let backgroundPositionY = piece.initialY
        if (piece.correctX > 0 && piece.correctY > 0) {
          peaceLeft -= this.getPiecePadding
          peaceTop -= this.getPiecePadding
          backgroundPositionX -= this.getPiecePadding
          backgroundPositionY -= this.getPiecePadding
        }
        else {
          if (piece.correctY !== 0) {
            peaceTop -= this.getPiecePadding
            backgroundPositionY -= this.getPiecePadding
          }
          if (piece.correctX !== 0) {
            peaceLeft -= this.getPiecePadding
            backgroundPositionX -= this.getPiecePadding
          }
        }
        return {
          id: piece.id,
          style: {
            left: peaceLeft + 'px',
            top: peaceTop + 'px',
            width: 1.4 * piece.width + 'px',
            height: 1.4 * piece.height + 'px',
            position: 'absolute',
            backgroundImage: 'url(' + piece.src + ')',
            backgroundPosition: `-${backgroundPositionX}px -${backgroundPositionY}px`,
            backgroundSize: this.getPuzzleContainerWidth + 'px ' + this.getPuzzleContainerHeight + 'px',
            maskImage: `url(#mask-${piece.id})`,
            backgroundRepeat: 'no-repeat'
          }
        }
      })
    }
  },
  mounted () {
    this.resetTimer()
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
    generatePuzzleShape(piece) {
      const shape = piece.shape || [0, 0, 0, 0]
      const width = piece.width
      const height = piece.height
      const basePadding = this.getPiecePadding
      const offsetX = (piece.correctX === 0) ? - basePadding : 0
      const offsetY = (piece.correctY === 0) ? - basePadding : 0
      const paddingX = basePadding + offsetX
      const paddingY = basePadding + offsetY
      let path = `M ${paddingX},${paddingY} `
      if (shape[0] === 0) {
        path = `M ${offsetX},${offsetY}`
        path += `L ${width + paddingX}, ${offsetY} `
      } else {
        const dir = shape[0]
        path += `L ${paddingX + width * 0.3}, ${paddingY} `
        path += `Q ${paddingX + width * 0.5}, ${paddingY - basePadding * dir} ${paddingX + width * 0.7}, ${paddingY} `
        path += `L ${paddingX + width}, ${paddingY} `
      }
      if (shape[1] === 0) {
        path += `L ${paddingX + width}, ${paddingY + height} `
      } else {
        const dir = shape[1]
        path += `L ${paddingX + width}, ${paddingY + height * 0.3} `
        path += `Q ${paddingX + width + basePadding * dir}, ${paddingY + height * 0.5} ${paddingX + width}, ${paddingY + height * 0.7} `
        path += `L ${paddingX + width}, ${paddingY + height} `
      }
      if (shape[2] === 0) {
        path += `L ${paddingX}, ${paddingY + height} `
      } else {
        const dir = shape[2]
        path += `L ${paddingX + width * 0.7}, ${paddingY + height} `
        path += `Q ${paddingX + width * 0.5}, ${paddingY + height + basePadding * dir} ${paddingX + width * 0.3}, ${paddingY + height} `
        path += `L ${paddingX}, ${paddingY + height} `
      }
      if (shape[3] === 0) {
        path += `L ${offsetX}, ${paddingY + height} `
        path += `L ${offsetX}, ${paddingY} `
      } else {
        const dir = shape[3]
        path += `L ${paddingX}, ${paddingY + height * 0.7} `
        path += `Q ${paddingX - basePadding * dir}, ${paddingY + height * 0.5} ${paddingX}, ${paddingY + height * 0.3} `
        path += `L ${paddingX}, ${paddingY} `
        if (shape[0] === 0) {
          path += `L ${paddingX}, ${offsetY} `
        }
      }
      return path
    },
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
      const piece = this.getPuzzlePieces[index]
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
      const distanceXToJoin = piece.width * 0.3
      const distanceYToJoin = piece.height * 0.3
      const isJoin = (
        distanceX < distanceXToJoin &&
        distanceY < distanceYToJoin &&
        piece.correctX === cellX &&
        piece.correctY === cellY
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
  margin-top: 35px;
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
    border: none;
    overflow: visible;
  }
  &__timer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    padding: 20px 30px;
    border: 1px solid @cBorderOne;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 20px;
    font-family: @ffThree;
  }
  &__hint-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    padding: 20px 30px;
    border: none;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
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
    width: 120px;
    padding: 20px 30px;
    border: none;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
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
    width: 390px;
    padding: 25px;
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
