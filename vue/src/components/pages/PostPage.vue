<template>
  <PageLayout>
    <div class="post">
      <div class="post__header">
        <button 
          class="post__header__btn" 
          @click="() => editPost()"
        >
          Edit
        </button>
        <button 
          class="post__header__btn" 
          @click="() => deleteCurrentPost()"
        >
          Delete
        </button>
      </div>
      <div class="post__content">
        <span class="post__content__title">{{ post.title }}</span>
        <span class="post__content__subtitle">{{ post.subtitle }}</span>
      </div>
      <img class="post__img" :src="post.images[0]" />
      <div class="post__content">
        <span class="post__content__desc">{{ post.content }}</span>
        <span class="post__content__date">{{ post.dateCreated }}</span>
        <span class="post__content__author">{{ post.author }}</span>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageLayout from '../parts/PageLayout.vue';

export default {
  name: 'PostPage',
  components: {
    PageLayout
  },
  computed: {
    ...mapGetters('posts', [
     'getPostByID'
    ]),
    id () {
      return this.$route.params.id
    },
    post () {
      console.log(this.id)
      return this.getPostByID(this.id)
    },
  },
  methods: {
    ...mapActions('posts', [
      'deletePost'
    ]),
    editPost () {
      this.$router.push({ name: 'EDIT', params: { id: this.id } })
    },
    deleteCurrentPost () {
      this.deletePost(this.post)
      this.$router.push({ name: 'POSTS' })
    }
  }
}
</script>

<style scoped lang="less">
.post {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 24px;
  &__header {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    &__btn {
    font-size: 18px;
    color: white;
    background-color: black;
    border-radius: 12px;
    border: 1px solid white;
    padding: 12px;
    transition: all .3s ease-in-out;
    cursor: pointer;
    }
    &__btn:hover {
      color: black;
      background-color: white;
      padding: 12px 16px;
    }
  }
  &__content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__title {
      font-size: 24px;
      font-weight: 600;
    }
    &__subtitle {
      color: grey;
      font-size: 22px;
    }
    &__desc {
    font-size: 20px;
    line-height: 1.6rem;
    color: #000000;
    text-align: justify;
    margin: 1rem 0;
    }
  }
  &__img {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
