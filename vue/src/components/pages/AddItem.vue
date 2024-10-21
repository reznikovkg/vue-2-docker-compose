<template>
    <PageLayout>
        <ItemForm :handleParseData="onSave" />
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout';
import ItemForm from '../forms/ItemForm.vue';
import { mapActions } from 'vuex';

export default {
    name: 'AddItemPage',
    components: {
        PageLayout,
        ItemForm,
    },
    methods: {
        ...mapActions('catalog', ['addItemToCatalog']),
        onSave(itemObject) {
            this.addItemToCatalog(itemObject);
            this.$router.replace('/');
        },
    },
};
</script>
