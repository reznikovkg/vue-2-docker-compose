<template>
  <GameObject
      :position="position"
      :dimensions="dimensions"
      color="gold"
      class="star-object"
  />
</template>

<script>
import GameObject from '@/components/core/GameObject'

export default {
  name: 'StarObject',
  components: { GameObject },
  props: {
    position: Object,
    dimensions: Object
  }
}
</script>

<style scoped lang="less">
.star-object {
  border-radius: 50%;
}
</style>