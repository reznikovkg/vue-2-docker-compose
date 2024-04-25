<template>
  <div>
    <div class="content">
      <HeaderComponent />
        <slot />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/ui/HeaderComponent.vue'

export default {
  name: 'PageLayout',
  components: {
    HeaderComponent,
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="less">
.content {
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 1920px;
}
</style>
