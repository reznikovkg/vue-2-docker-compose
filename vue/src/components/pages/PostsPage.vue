<template>
  <PageLayout>
    <div class="posts">
      <div class="posts__header">
        <h1 class="posts__header__title" >All posts</h1>
        <button
          class="posts__header__btn" 
          @click="() => createPost()"
        >
          Create post
        </button>
      </div>
      <ElInput 
        v-model="search" 
        class="posts__input"
        placeholder="Поиск"
        clearable
      />
      <ListContainer :posts="posts"/>
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex';
import PageLayout from '../parts/PageLayout.vue';
import ListContainer from '../parts/ListContainer.vue';

export default {
  name: 'PostsPage',
  components: {
    PageLayout,
    ListContainer
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('posts', [
      'getPosts',
      'getSearchedPosts'
    ]),
    posts () {
      if( this.search.length >= 3 ) {
        return this.getSearchedPosts(this.searchFunction)
      }
      return this.getPosts
    },
  },
  methods: {
    createPost () {
      this.$router.push({ name: 'CREATE' })
    },
    searchFunction (post) {
      return Object.keys(post).some((field) => {
        if (post[field]) {
          return post[field].toString().toLowerCase().includes(this.search.toLowerCase())
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 24px;
  &__header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    &__btn {
      border: none;
      border-radius: 12px;
      padding: 12px;
      background: #000;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      transition: all .3s ease-in-out;
    }
    &__btn:hover {
      border: 1px solid black;
      background: #fff;
      color: #000;
    }
  }
  &__input {
    width: 50%;
    border-radius: 12px;
    padding: 8px;
    font-size: 18px;

  }
}
</style>
