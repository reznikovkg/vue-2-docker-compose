<template>
  <PageLayout>
    <FileUpload />
  </PageLayout>
</template>

<script>

import FileUpload from '../parts/FileUpload.vue';
import PageLayout from '../parts/PageLayout'

export default {
  name: 'HomePage',
  components: {
    PageLayout,
    FileUpload
  }
}
</script>

<style>
</style>
