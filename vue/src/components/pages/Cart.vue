<template>
    <PageLayout>
        <section class="p-16">
            <CartModule v-for="(item, index) in getCart" :key="index" :item=item />
            <CartModule :item=getCart />
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import CartModule from '../parts/CartModule.vue';

export default {
    name: 'CartPage',
    computed: {
        getCart() {
            return {
                "id": "2",
            }
        }
    },
    components: {
        PageLayout,
        CartModule,
    }
}

</script>