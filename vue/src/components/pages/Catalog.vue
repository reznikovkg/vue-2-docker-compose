<template>
    <PageLayout>
        <section class="catalog-page">
            <CatalogCard v-for="(item) in getCatalog" :key="item.id" :item=item />
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import CatalogCard from '../parts/CatalogCard'
import { mapGetters } from 'vuex';

export default {
    name: 'CatalogPage',
    computed: {
        ...mapGetters('catalog', [
            'getCatalog'
        ]),
    },
    components: {
        PageLayout,
        CatalogCard,
    },
}
</script>

<style scoped lang="less">
.catalog-page {
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2%;
    row-gap: 50px;
}
</style>