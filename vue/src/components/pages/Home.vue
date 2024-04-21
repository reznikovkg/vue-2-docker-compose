<template>
  <PageLayout>
    <section class="p-16">
      <Catalog />
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from "../parts/PageLayout";
import Catalog from "../catalog/CatalogComponent.vue";

export default {
  name: "HomePage",
  components: {
    PageLayout,
    Catalog,
  },
};
</script>

<style></style>
