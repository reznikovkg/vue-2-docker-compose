<template>
  <div 
    class="wide-post"
    @click="() => openPage()"
  >
    <img class="wide-post__img" :src="post.images[0]" alt="">
    <div class="wide-post__info">
      <h1 class="wide-post__info__title">{{ post.title }}</h1>
      <div class="wide-post__info__content">
        <span class="wide-post__info__content__author">By {{ post.author }}</span>
        <span class="line"></span>
        <h3 class="wide-post__info__content__subtitle">{{ post.subtitle }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidePostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    openPage() {
      this.$router.push({ name: 'POST', params: { id: this.post.id } })
    }
  }
}
</script>

<style scoped lang="less">
.wide-post {
  position: relative;
  cursor: pointer;
  height: 100vh;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__info {
    position: absolute;
    top: 40%;
    left: 10%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 60%;
    color: white;
    &__title {
      color: white;
      font-weight: 600;
      font-size: 36px;
    }
    &__content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 55%;
      .line {
        width: 70px;
        border: 1px solid white;
      }
      &__author {
        text-align: center;
      }
      &__subtitle {
        text-align: center;
        color: white;
        font-weight: 500;
        width: 70%;
      }
    }
  }
}
</style>
