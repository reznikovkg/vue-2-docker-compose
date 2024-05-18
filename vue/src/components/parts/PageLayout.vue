<template>
  <div class="background">
    <div class="content">
      <HeaderComponent @search-applied="handleSearchApply" />
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
  },
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearchApply (searchQuery) {
      this.searchQuery = searchQuery
    }
  }
}
</script>

<style scoped lang="less">
.content {
  padding: 0;
  margin: 0 auto;
  box-sizing: border-box;
  max-width: 1200px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  :link {
    color: inherit;
  }
  :visited {
    color: inherit;
  }
}
.background {
  background-color: #ffffff;
}
</style>
