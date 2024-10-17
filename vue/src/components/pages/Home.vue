<template>
  <PageLayout>
    <section class="p-16">
      Homepage
      <button @click="() => openHelpModal()">Open modal</button>
    </section>

    <DeckComponent/>

  </PageLayout>
</template>

<script>
import DeckComponent from '../deck/DeckComponent.vue';
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    //CardComponent,
    DeckComponent,
  }
}
</script>

<style>
</style>
