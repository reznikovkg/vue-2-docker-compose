<template>
  <PageLayout>
    <ColorPicker format="rgb" @color="(value) => this.color = value" />
    <span> {{ color }} </span>
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
  },
  data() {
        return {
            color: 0
        };
    },
}
</script>

<style>
</style>
