<template>
    <div class="line-wrapper" :style="lineWrapperStyle">
        <div class="line-wrapper__line" :style="lineStyle"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ConnectionBlock',
    props: {
        connection: Object,
    },

    computed: {
        ...mapGetters('blocks', ['getBlock', 'getSize']),
        coordinates() {
            const startblock = this.getBlock(this.connection.start.blockId);
            const endBlock = this.connection.end?.blockId
                ? {
                      top:
                          this.getBlock(this.connection.end?.blockId).top +
                          this.getSize + 6,
                      left:
                          this.getBlock(this.connection.end?.blockId).left +
                          Math.floor(this.getSize / 2),
                  }
                : {
                      top: this.connection.end?.top,
                      left: this.connection.end?.left,
                  };
            if (this.connection.start) {
                return {
                    start: {
                        top: startblock.top + this.getSize + 6,
                        left: startblock.left + Math.floor(this.getSize / 2),
                    },
                    end: {
                        top: endBlock?.top,
                        left: endBlock?.left,
                    },
                };
            }
            return {
                start: {},
                end: {},
            };
        },
        lineStyle() {
            const a = Math.abs(
                this.coordinates.start?.top - this.coordinates.end?.top
            ); // Получаем высоту
            const b = Math.abs(
                this.coordinates.start?.left - this.coordinates.end?.left
            ); // Получаем ширину

            const d = Math.sqrt(a * a + b * b); // Высчитываем диагональ
            const sin = a / d; // Синус угла
            let deg = Math.asin(sin) * (180 / Math.PI); // Угол

            if (
                (this.coordinates.start.top < this.coordinates.end.top &&
                    this.coordinates.start.left > this.coordinates.end.left) ||
                (this.coordinates.start.top > this.coordinates.end.top &&
                    this.coordinates.start.left < this.coordinates.end.left)
            ) {
                deg = -deg;
            }

            return {
                width: `${d}px`, // Задаем длину диагонали
                transform: `rotate(${deg}deg)`, // Угол наклона
            };
        },
        lineWrapperStyle() {
            const left =
                this.coordinates.start?.left < this.coordinates.end?.left
                    ? this.coordinates.start?.left
                    : this.coordinates.end?.left;
            const top =
                this.coordinates.start?.top < this.coordinates.end?.top
                    ? this.coordinates.start?.top
                    : this.coordinates.end?.top;
            const width = Math.abs(
                this.coordinates.start?.left - this.coordinates.end?.left
            );
            const height = Math.abs(
                this.coordinates.start?.top - this.coordinates.end?.top
            );

            return {
                left: `${left}px`,
                top: `${top}px`,
                width: `${width}px`,
                height: `${height}px`,
            };
        },
    },
};
</script>

<style scoped lang="less">
.line-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    pointer-events: none;
    &__line {
        z-index: 3;
        flex-shrink: 0;
        border-top: 1px solid red;
        transform-origin: 50% 50%;
        background-color: orange;
    }
}
</style>
