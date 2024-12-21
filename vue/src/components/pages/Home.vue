<template>
    <PageLayout>
        <div class="home-page">
            <WorkField ref="workField" />
            <BlockForm @submit="handleSubmitBlockForm" />
        </div>
    </PageLayout>
</template>

<script>
import { mapActions } from 'vuex';
import PageLayout from '../parts/PageLayout';
import WorkField from '../parts/WorkField.vue';
import BlockForm from '../parts/BlockForm.vue';

export default {
    name: 'HomePage',
    components: {
        WorkField,
        PageLayout,
        BlockForm,
    },
    methods: {
        ...mapActions('blocks', ['addItemToBlocks']),
        handleSubmitBlockForm(blockData) {
            this.addItemToBlocks(blockData);
            this.$refs.workField.$el.focus();
        },
    },
};
</script>

<style>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
}
</style>
