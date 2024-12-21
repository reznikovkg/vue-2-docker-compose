<template>
    <div
        class="work-field"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerdown="handlePointerDown"
        @keydown="handleKeyDown"
        @keyup="handleKeyUp"
        @wheel="handleScale"
        tabindex="0"
        ref="field"
    >
        <MovableBlock
            v-for="block in getBlocks"
            :key="block.id"
            :data-id="block.id"
            :startLeft="block.left"
            :startTop="block.top"
            :selected="block.selected"
            :color="block.color"
            :textData="{ name: block.name, description: block.description }"
            :handleMoved="
                (left, top) => {
                    handleBlockMoved(left, top, block.id);
                }
            "
            :handleStartConnection="handleStartConnection"
            :handleEndConnection="handleEndConnection"
        />
        <ConnectionBlock
            v-for="connection in getConnections"
            :key="connection.id"
            :connection="connection"
        />
        <ConnectionBlock v-if="current.start.blockId" :connection="current" />
        <div
            v-if="selectionStartPoint.top"
            class="work-field__selection-area"
            :style="computeSelectionAreaStyle"
        ></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MovableBlock from './MovableBlock.vue';
import ConnectionBlock from './ConnectionBlock.vue';

export default {
    name: 'WorkField',
    components: {
        MovableBlock,
        ConnectionBlock,
    },
    data() {
        return {
            current: { start: {}, end: {} },
            isPointerDown: false,
            isShiftPressed: false,
            selectionStartPoint: { top: null, left: null },
            selectionEndPoint: { top: null, left: null },
            isCreatingConnection: false,
            isMovingField: false,
            moveStartCoordinates: { top: 0, left: 0 },
        };
    },
    computed: {
        ...mapGetters('blocks', ['getBlocks', 'getConnections', 'getBlock']),
        computeSelectionAreaStyle() {
            return {
                top: `${Math.min(
                    this.selectionEndPoint.top,
                    this.selectionStartPoint.top
                )}px`,
                left: `${Math.min(
                    this.selectionEndPoint.left,
                    this.selectionStartPoint.left
                )}px`,
                width: `${Math.abs(
                    this.selectionEndPoint.left - this.selectionStartPoint.left
                )}px`,
                height: `${Math.abs(
                    this.selectionEndPoint.top - this.selectionStartPoint.top
                )}px`,
            };
        },
    },
    methods: {
        ...mapActions('blocks', [
            'changeBlockById',
            'addConnection',
            'chooseBlockByArea',
            'clearSelection',
            'changeSize',
            'changeView',
        ]),
        handleKeyDown(e) {
            if (e.key === 'Shift') {
                this.isShiftPressed = true;
            }
        },
        handleKeyUp(e) {
            if (e.key === 'Shift') {
                this.isShiftPressed = false;
                this.selectionStartPoint = { top: null, left: null };
            }
        },
        handleBlockMoved(left, top, id) {
            if (!this.getBlock(id).selected) {
                this.clearSelection();
                this.selectionStartPoint = { top: null, left: null };
            }

            this.changeBlockById({ id, newBlockData: { left, top } });
        },
        handleStartConnection(event) {
            this.current.start = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isCreatingConnection = true;
        },
        handleEndConnection(event) {
            this.current.end = {
                blockId: event.target.offsetParent.dataset.id,
            };
            this.isCreatingConnection = false;

            this.addConnection(this.current);
            this.current = { start: {}, end: {} };
        },
        handlePointerMove(event) {
            if (this.isShiftPressed) {
                this.selectionEndPoint = {
                    top: event.pageY,
                    left: event.pageX,
                };
            } else if (this.isCreatingConnection) {
                this.current = {
                    ...this.current,
                    end: {
                        left: event.pageX,
                        top: event.pageY,
                    },
                };
            } else if (this.isMovingField) {
                this.clearSelection();
                this.selectionStartPoint = { top: null, left: null };
                this.changeView({
                    left: event.pageX - this.moveStartCoordinates.left,
                    top: event.pageY - this.moveStartCoordinates.top,
                });
                this.moveStartCoordinates.left = event.pageX;
                this.moveStartCoordinates.top = event.pageY;
            }
        },
        handleScale(event) {
            const scale = -event.deltaY * 0.001;

            this.changeSize({
                scale,
                coords: {
                    top: event.pageY,
                    left: event.pageX,
                },
            });
        },
        handlePointerDown(event) {
            this.clearSelection();
            this.selectionStartPoint = { top: null, left: null };

            if (this.isShiftPressed) {
                event.stopPropagation();
                this.selectionStartPoint = {
                    top: event.pageY,
                    left: event.pageX,
                };
            } else {
                this.isMovingField = true;
                this.moveStartCoordinates = {
                    left: event.pageX,
                    top: event.pageY,
                };
                this.$refs.field.setPointerCapture(event.pointerId);
            }
        },
        handlePointerUp(event) {
            if (this.isShiftPressed) {
                event.stopPropagation();
                this.chooseBlockByArea({
                    top: Math.min(
                        this.selectionEndPoint.top,
                        this.selectionStartPoint.top
                    ),
                    left: Math.min(
                        this.selectionEndPoint.left,
                        this.selectionStartPoint.left
                    ),
                    width: Math.abs(
                        this.selectionEndPoint.left -
                            this.selectionStartPoint.left
                    ),
                    height: Math.abs(
                        this.selectionEndPoint.top -
                            this.selectionStartPoint.top
                    ),
                });
                this.selectionStartPoint = { top: null, left: null };
            } else {
                if (this.isCreatingConnection) {
                    this.current = { start: {}, end: {} };
                }
                this.isMovingField = false;
                this.moveStartCoordinates = {
                    left: 0,
                    top: 0,
                };
                this.$refs.field.releasePointerCapture(event.pointerId);
            }
        },
    },
};
</script>

<style scoped lang="less">
.work-field {
    position: relative;
    width: 800px;
    height: 800px;
    border-radius: 10px;
    background-color: @cBaseThree;
    overflow: hidden;

    &__selection-area {
        position: absolute;
        background-color: #ffffff;
        opacity: 0.3;
        box-shadow: inset @cBaseBlack 2px;
        z-index: 5;
    }
}
</style>
