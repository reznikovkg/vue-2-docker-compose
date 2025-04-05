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

<style scoped lang="less">
.menu-grid {
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>