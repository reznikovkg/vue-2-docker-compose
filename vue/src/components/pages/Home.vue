<template>
  <PageLayout>
    
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
    redirectToStorePage () {
      this.$router.push({ name: 'STORE' })
    }
  },
  mounted () {
    this.redirectToStorePage()
  }
}
</script>

<style>
</style>
