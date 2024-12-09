<template>
  <PageLayout>
    <ColorPicker />
  </PageLayout>
</template>

<script>
import ColorPicker from '../parts/ColorPicker.vue';
import PageLayout from '../parts/PageLayout'

export default {
  name: 'HomePage',
  components: {
    PageLayout,
    ColorPicker
  }
}
</script>

<style>
</style>
