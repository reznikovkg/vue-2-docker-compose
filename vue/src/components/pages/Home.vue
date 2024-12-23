<template>
  <PageLayout>
    <CounterPart> </CounterPart>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import CounterPart from '../parts/Counter.vue'

export default {
  name: 'HomePage',
  components: {
    PageLayout,
    CounterPart,
  }
}
</script>

<style>
</style>
