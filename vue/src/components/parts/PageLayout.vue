<template>
  <div>
    <div class="content">
      <HeaderComponent />
      <slot />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/ui/HeaderComponent.vue"

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
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
