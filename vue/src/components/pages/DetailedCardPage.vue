<template>
  <PageLayout>
    <DetailedProductCard />
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/parts/PageLayout.vue';
import DetailedProductCard from '@/components/cards/DetailedProductCard.vue';

export default {
  name: 'ProductCardDetailPage',
  components: {
    PageLayout,
    DetailedProductCard
  }
}
</script>