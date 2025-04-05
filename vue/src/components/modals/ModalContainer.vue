<template>
    <div v-on:click="closeModal" v-if="isVisible" class="modal__overlay">
        <div class="modal__contents-wrapper" @click.stop>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalContainer',

    data () {
        return {
            isVisible: false
        };
    },

    methods: {
        openModal () {
            this.isVisible = true;
        },
        closeModal () {
            this.isVisible = false;
        }
    }
}
</script>

<style scoped lang="less">
.modal__overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
}
</style>