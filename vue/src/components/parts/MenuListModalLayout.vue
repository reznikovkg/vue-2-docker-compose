<template>
    <ModalContainer ref="rootModal">
        <MenuListLayout class="menu-list">
            <slot />
        </MenuListLayout>
    </ModalContainer>
</template>

<script>
import ModalContainer from '../modals/ModalContainer.vue';
import MenuListLayout from './MenuListLayout.vue';

export default {
    name: 'MenuGridModalLayout',
    components: {
        ModalContainer,
        MenuListLayout
    },
    methods: {
        openModal () {
            this.$refs.rootModal.openModal();
        },
    }
}
</script>

<style scoped lang="less">
.menu-list {
    vertical-align: top;
    height: 100%;
    overflow-y: scroll;
}
</style>