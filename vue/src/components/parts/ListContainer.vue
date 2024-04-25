<template>
  <div class="list">
    <PostCard v-for="(post, index) in posts" :key="index" :post="post"/>
  </div>
</template>

<script>
import PostCard from '@/components/cards/PostCard.vue'
export default {
  name: 'ListContainer',
  components: {
    PostCard
  },
  props: {
    posts: {
     type: Array,
     required: true 
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
