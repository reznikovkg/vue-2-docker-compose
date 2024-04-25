<template>
  <PageLayout>
    <WidePostCard :post="randomPost"/>
    <section class="section-posts">
      <div class="section-posts__header">
        <h1>Latest Posts</h1>
        <RouterLink
          class="section-posts__header__btn" 
          :to="{name: 'POSTS'}"
        >
          View all posts
        </RouterLink>
      </div>
      <ListContainer :posts="posts"/>
    </section>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";
import WidePostCard from "@/components/cards/WidePostCard.vue";
import ListContainer from "@/components/parts/ListContainer.vue";
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    WidePostCard,
    ListContainer
  },
  data () {
    return {
      randomID: 1,
    }
  },
  mounted () {
    this.randomID = this.getRandomID
  },
  computed: {
    ...mapGetters('posts', [
      'getPostByID',
      'getPosts',
      'getRandomID',
      'getLatestPosts'
    ]),
    randomPost () {
      return this.getPostByID(this.randomID)
    },
    posts () {
      return [this.getLatestPosts[0], this.getLatestPosts[1], this.getLatestPosts[2]]
    }
  }
}
</script>

<style scoped lang="less">
.section-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 32px;
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &__btn {
      font-size: 18px;
      font-weight: 600;
      color: white;
      padding: 12px;
      background: black;
      border-radius: 12px;
    }
  }
}
</style>
