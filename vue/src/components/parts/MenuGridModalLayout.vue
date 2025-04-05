<template>
    <ModalContainer ref="rootModal">
        <section class="menu-grid">
            <slot />
        </section>
    </ModalContainer>
</template>

<script>
import ModalContainer from '../modals/ModalContainer.vue';

export default {
    name: 'MenuGridModalLayout',
    components: {
        ModalContainer
    },
    methods: {
        openRootModal () {
            this.$refs.rootModal.openModal();
        },
    }
}
</script>

<style lang="less">
.modal__contents-wrapper {
    position: absolute;
    background-color: @cPrimary;
    border: 2px solid @cAccent;
    height: 500px;
    width: 1000px;
    padding: 10px;
}

.menu-grid {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>