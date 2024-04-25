<template>
  <div class="create">
    <PostForm v-model="form"/>
    <div class="create__controls">
      <button
        class="create__controls__btn" 
        @click="() => create()"
      >
        Создать
      </button>
      <button
        class="create__controls__btn" 
        @click="() => back()"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import PostForm from '@/components/forms/PostForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CreatePostPage',
  components: {
    PostForm
  },
  data () {
    return {
      form: {
        title: '',
        subtitle: '',
        content: '',
        author: '',
        dateCreated: '',
        images: [
          'https://w-dog.ru/wallpapers/9/16/533509633223902/priroda-nebo-oblaka-ozero-gory-pejzazh-derevya.jpg'
        ]
      }
    }
  },
  methods: {
    ...mapActions('posts', [
      "createPost"
    ]),
    create () {
      this.createPost(this.form)
      this.$router.push({ name: 'POSTS' })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.create {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  &__controls {
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
    &__btn {
      width: 150px;
      padding: 15px 10px;
      background-color: #000;
      border: none;
      border-radius: 6px;
      color: #ffffff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all .3s ease-in-out;
    }
    &__btn:hover {
      background: #ffffff;
      color: rgb(0, 0, 0);
      border: 1px solid black;
      border-radius: 12px;
      scale: 1.2;
    }
  }
}
</style>
