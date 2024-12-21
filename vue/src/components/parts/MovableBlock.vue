<template>
    <div
        :class="computeClassForBlock"
        ref="block"
        :style="blockStyle"
        @pointermove="handlePointerMove"
        @pointerdown="handlePointerDown"
        @pointerup="handlePointerUp"
    >
        <div class="moveable-block__text-info">
            <h1 class="moveable-block__name" :style="nameFontSize">
                {{ textData.name }}
            </h1>
            <p class="moveable-block__description" :style="descriptionFontSize">
                {{ textData.description }}
            </p>
        </div>
        <div
            class="moveable-block__connector"
            ref="connector"
            @pointerdown="handleConnectorDown"
        ></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'MovableBlock',
    props: {
        startLeft: Number,
        startTop: Number,
        handleMoved: Function,
        handleStartConnection: Function,
        handleEndConnection: Function,
        color: String,
        textData: {
            name: String,
            description: String,
        },
        selected: Boolean,
    },
    data() {
        return {
            isPointerDown: false,
        };
    },
    computed: {
        ...mapGetters('blocks', ['getSize', 'getDefaultSize']),
        computeClassForBlock() {
            return [
                'moveable-block',
                this.selected ? 'moveable-block_selected' : '',
            ];
        },
        blockStyle() {
            return {
                width: `${this.getSize}px`,
                height: `${this.getSize}px`,
                left: this.startLeft + 'px',
                top: this.startTop + 'px',
                zIndex: this.isPointerDown ? 2 : 1,
                backgroundColor: this.color,
            };
        },
        nameFontSize() {
            return {
                fontSize: `${(11 * this.getSize) / this.getDefaultSize}px`,
            };
        },
        descriptionFontSize() {
            return {
                fontSize: `${(10 * this.getSize) / this.getDefaultSize}px`,
            };
        },
    },
    methods: {
        handlePointerDown(event) {
            event.stopPropagation();

            this.isPointerDown = true;
            this.$refs.block.setPointerCapture(event.pointerId);
        },
        handlePointerUp(event) {
            event.stopPropagation();
            event.preventDefault();

            if (this.isPointerDown) {
                this.isPointerDown = false;
                this.$refs.block.releasePointerCapture(event.pointerId);
            } else {
                this.handleEndConnection(event);
            }
        },
        handlePointerMove(event) {
            event.preventDefault();

            if (this.isPointerDown) {
                const newLeft =
                    event.pageX <= this.getSize / 2
                        ? 0
                        : event.pageX > 800 - this.getSize / 2
                        ? 800 - this.getSize
                        : event.pageX - this.getSize / 2;
                const newTop =
                    event.pageY <= this.getSize / 2
                        ? 0
                        : event.pageY > 800 - this.getSize / 2
                        ? 800 - this.getSize
                        : event.pageY - this.getSize / 2;

                this.handleMoved(newLeft, newTop);
            }
        },
        handleConnectorDown(event) {
            event.preventDefault();
            event.stopPropagation();
            this.handleStartConnection(event);
        },
    },
};
</script>

<style scoped lang="less">
.moveable-block {
    position: absolute;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &_selected {
        box-shadow: 0px 0px 15px green;
    }

    &__text-info {
        position: absolute;
        top: 5%;
        height: 80%;
        width: 96%;
        overflow: hidden;

        user-select: none;
    }

    &__name {
        width: 100%;
        text-align: center;
        color: @cBaseWhite;
    }

    &__description {
        width: 100%;
        text-align: center;
        color: @cBaseWhite;
        font-family: @ffOne;
        margin: 0;
    }

    &__connector {
        z-index: 4;
        position: absolute;
        bottom: -15px;
        width: 20px;
        height: 20px;
        background-color: @cBaseTwo;
        border-radius: 50%;
    }
}
</style>
