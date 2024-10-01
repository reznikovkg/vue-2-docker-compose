<template>
  <PageLayout>
    <section class="p-16">
      Homepage
      <button @click="() => openHelpModal()">Open modal</button>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";

export default {
  name: 'ModalHomePage',
  mixins: [helpModal],
  components: {
    PageLayout
  }
}
</script>

<style>
</style>
