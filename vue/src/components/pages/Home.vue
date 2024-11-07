<template>
  <PageLayout>
    <section class="p-16">
      Homepage
      <button @click="() => openHelpModal()">Open modal</button>
    </section>
    <p><router-link :to="{ name: RouteNames.GAME }">
      Game
    </router-link></p>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals"
import { RouteNames } from '@/router/routes'

export default {
  name: 'HomePage',
  computed: {
      RouteNames() {
          return RouteNames
      }
  },
  mixins: [helpModal],
  components: {
    PageLayout
  }
}
</script>

<style>
</style>
