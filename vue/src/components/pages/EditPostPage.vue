<template>
  <div class="edit">
    <PostForm v-model="form"/>
    <div class="edit__controls">
      <button
        class="edit__controls__btn" 
        @click="() => edit()"
      >
        Изменить
      </button>
      <button
        class="edit__controls__btn" 
        @click="() => back()"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import PostForm from '@/components/forms/PostForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditPostPage',
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
        'https://vsegda-pomnim.com/uploads/posts/2022-04/1649202285_8-vsegda-pomnim-com-p-priroda-zima-rassvet-foto-10.jpg'
        ]
      }
    }
  },
  mounted () {
    if (this.post) {
      this.form = {
        ...this.form,
        ...this.post
      }
    }     
  },
  computed: {
    ...mapGetters('posts', [
      'getPostByID'
    ]),
    id () {
    return this.$route.params.id
    },
    post () {
      return this.getPostByID(this.id)
    }
  },
  methods: {
    ...mapActions('posts', [
    "editPost"
    ]),
    edit () {
      this.editPost(this.form)
      this.$router.push({ name: 'POSTS', params: { id: this.id } })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.edit {
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
