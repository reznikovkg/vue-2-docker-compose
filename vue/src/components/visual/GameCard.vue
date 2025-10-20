<template>
  <div 
    class="card" 
    :class="{ 'card--face-down': faceDown, 'card--active': !faceDown && !onBoard }" 
    draggable="true"
    @mousedown="(e) => checkMove(e)" 
    @mousemove="(e) => processDrag(e)" 
    @mouseup="(e) => stopDrag(e)"
    @touchstart="makeMove()" 
  >
    <div 
      v-if="!faceDown" 
      class="card__content" 
      :class="{ 'card__content--small': !onBoard }"
    >
      <span class="card__content__rank--top">
        {{ card.rank }}
      </span>

      <span class="card__content__name">
        {{ card.name }}
      </span>

      <span class="card__content__rank--bottom">
        {{ card.rank }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "GameCard",
  props: {
    card: {
      type: Object,
      default: null,
      required: true
    },
    faceDown: {
      type: Boolean,
      default: false,
      required: false
    },
    onBoard: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      dragInfo: {
        elem: null,
        xStart: null,
        yStart: null,
        deltaX: 0,
        deltaY: 0,
        dragged: false,
      },
      oldPosition: {
        parent: null,
        nextSibling: null,
        position: null,
        left: null,
        top: null,
        zIndex: null
      }
    }
  },
  computed: {
    ...mapGetters('gameEngine', [
      'getTurn'
    ])
  },
  methods: {
    ...mapActions('gameEngine', [
      'makePlayerMove'
    ]),
    makeMove() {
      if (!this.faceDown && !this.onBoard && this.getTurn) {
        this.makePlayerMove(this.card.id)
      }
    },
    checkMove(event) {
      event.preventDefault()
      if (this.faceDown || this.onBoard || !this.getTurn) {
        return
      }
      
      this.dragInfo = {
        elem: event.currentTarget,
        xStart: event.clientX,
        yStart: event.clientY
      }

      // сохраняем положение, с которого началось перетягивание, на случай отмены
      const elem = this.dragInfo.elem
      this.oldPosition = {
        parent: elem.parentNode,
        nextSibling: elem.nextSibling,
        position: elem.position || '',
        left: elem.left || '',
        top: elem.top || '',
        zIndex: elem.zIndex || ''
      }
    },
    processDrag(event) {
      event.preventDefault()
      if (!this.dragInfo.elem) return;

      // перетаскивание относительно начальной позиции (элемент только начали перетаскивать)
      if (!this.dragInfo.dragged) {
        this.dragInfo.dragged = true

        const coords = this.getCoords(this.dragInfo.elem)
        this.dragInfo.deltaX = this.dragInfo.xStart - coords.left
        this.dragInfo.deltaY = this.dragInfo.yStart - coords.top

        this.startDrag(); // отобразить начало переноса
      }

      // продолжение перетаскивания
      this.dragInfo.elem.style.left = event.pageX - this.dragInfo.deltaX + 'px'
      this.dragInfo.elem.style.top = event.pageY - this.dragInfo.deltaY + 'px'
    },
    getCoords(elem) {
      const box = elem.getBoundingClientRect()
      return {
        top: box.top + window.scrollY,
        left: box.left + window.scrollX
      }
    },
    startDrag() {
      const target = this.dragInfo.elem

      document.body.appendChild(target)
      target.style.zIndex = 9999
      target.style.position = 'absolute'
    },
    stopDrag(event) {
      event.preventDefault()

      // событие перетягивания
      if (this.dragInfo.dragged) {
        const dropElem = this.findDroppable(event) 

        if (dropElem) { // карту перенесли на игровое поле
          this.dragInfo.elem.style.display = 'none'
          this.makeMove()
        } 
        const old = this.oldPosition
        old.parent.insertBefore(this.dragInfo.elem, old.nextSibling)
        this.dragInfo.elem.style = {
          position: old.position,
          left: old.left,
          top: old.top,
          zIndex: old.zIndex
        }
      // событие клика  
      } else {
        this.makeMove()
      }

      this.dragInfo.elem = null
      this.dragInfo.dragged = false
    },
    findDroppable(event) {
      // спрячем переносимый элемент
      this.dragInfo.elem.hidden = true

      // получить самый вложенный элемент под курсором мыши
      const elem = document.elementFromPoint(event.clientX, event.clientY)

      // показать переносимый элемент обратно
      this.dragInfo.elem.hidden = false;

      if (elem == null) {
        return null;
      }

      return elem.closest('.droppable');
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  height: 100%;
  min-height: 158px;
  max-height: 420px;
  aspect-ratio: 2 / 3; // соотношение сторон 2:3
  background-color: #F3E9D2;
  border: solid 2px #999488;
  border-radius: 12px;
  box-sizing: border-box;

  &__content {
    height: inherit;
    padding: 8%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Neucha", cursive;
    font-size: 36px;
    color: #17211E;

    &__name {
      text-align: center;
    }

    &__rank--bottom {
      text-align: right;
    }

    &--small {
      font-size: 24px;
    }
  }

  &--active {
    margin-right: -13px;
    margin-top: 4px;

    &:hover {
      z-index: 3;
      min-height: 170px;
      max-height: 435px;
      margin-top: -8px;
      cursor: pointer;
    }
  }

  &--face-down {
    min-height: 85px;
    background-color: #DA667B;
    border: solid 2px #804651;
    border-radius: 8px;
    margin-right: 5px;
  }
}

@media(max-width: 1015px) {
  .card {
    min-height: 133px;
    max-height: 380px;
    border-radius: 8px;

    &__content {
      font-size: 28px;

      &--small {
        font-size: 20px;
      }
    }

    &--active {
      margin-right: -11px;

      &:hover {
        min-height: 130px;
        max-height: 380px;
      }
    }

    &--face-down {
      min-height: 75px;
      border-radius: 6px;
      margin-right: -9px;
    }
  }
}

@media(max-width: 560px) {
  .card {
    min-height: 96px;
    max-height: 210px;
    z-index: 0;

    &__content {
      font-size: 20px;

      &--small {
        font-size: 15px;
      }
    }

    &--active {
      margin-bottom: -32px;

      &:hover {
        z-index: 0;
        min-height: 96px;
        max-height: 210px;
        margin-top: 4px;
      }
    }

    &--face-down {
      min-height: 52px;
      margin-right: -11px;
      margin-bottom: -32px;
    }
  }
}
</style>
