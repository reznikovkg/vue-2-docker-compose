<template>
  <PageLayout>
    <ContentContainer class="container">
      <h1 class="title">{{el.title}}</h1>
      <img class="img" :src="`${el.img}`" />
      <div class="caption">{{el.caption}}</div>
    </ContentContainer>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import {newsModel} from "@/components/mock";
import ContentContainer from "@/components/parts/Container.vue";

export default {
  name: 'NewsPage',
  components: {
    ContentContainer,
    PageLayout
  },
  data() {
    return {
      el: newsModel.getOne(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  .container {
    min-height: calc(100vh - 180px - 258px);
  }
  .title {
    margin-block: 40px 20px;
    font-size: 40px;
    text-transform: uppercase;
  }
  .caption {
    margin-top: 20px;
  }
  .img {
    max-width: 100%;
  }
</style>
