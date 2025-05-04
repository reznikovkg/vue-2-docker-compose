<template>
  <PageLayout>
    <section class="p-16">
      Homepage
      <button @click="() => openHelpModal()">Open modal</button>
      <button @click="startGame">Start Game</button>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout
  },
  methods: {
    startGame() {
      this.$router.push('/game')
    }
  }
}
</script>

<style>
</style>