<template>
  <PageLayout>
    <ContentContainer class="container">
      <div class="layout">
        <div class="info">
          <h1 class="title">{{el.title}}</h1>
          <div class="caption">{{el.caption}}</div>
          <div class="description">{{el.description}}</div>
        </div>
        <img class="img" :src="`${el.img}`" />
      </div>
    </ContentContainer>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import {productTypesModel} from "@/components/mock";
import ContentContainer from "@/components/parts/Container.vue";

export default {
  name: 'PartsPage',
  components: {
    ContentContainer,
    PageLayout,
  },
  data() {
    return {
      el: productTypesModel.getOne(this.$route.params.id)
    }
  }
}
</script>

<style scoped>
  .layout {
    padding-block: 60px;
    display: flex;
    justify-content: space-between;
    column-gap: 40px;
  }
  .info {
    display: flex;
    flex-direction: column;
  }
  .container {
    min-height: calc(100vh - 180px - 258px);
  }
  .img {
    max-width: 50%;
  }
  .title {
    font-size: 40px;
    text-transform: uppercase;
  }
  .description {
    font-size: 18px;
    margin-top: 20px;
  }
</style>
