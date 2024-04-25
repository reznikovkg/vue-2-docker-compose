<template>
  <div class="post">
    <img class="post__img" :src="post.images[0]" alt="">
    <div class="post__info">
      <span class="post__info__date">{{ post.dateCreated }}</span>
      <span class="post__info__author">By {{ post.author }}</span>
    </div>
    <div class="post__content">
      <span class="post__content__title">{{ post.title }}</span>
      <span class="post__content__subtitle">{{ post.subtitle }}</span>
    </div>
    <RouterLink
      class="post__view"
      :to="{name: 'POST', params: { id: post.id }}"
    >
      →View details
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.post {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 30%;
  padding: 12px;
  &__view {
    font-size: 18px;
    color: white;
    background-color: black;
    border-radius: 12px;
    border: 1px solid white;
    padding: 12px;
    transition: all .3s ease-in-out;
  }
  &__view:hover {
    color: black;
    background-color: white;
    padding: 16px;
  }
  &__img {
    width:100%;
    height: 300px;
    object-fit: cover;
  }
  &__info {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__title {
      font-size: 20px;
      font-weight: 600;
    }
    &__subtitle {
      color: grey;
      font-size: 16px;
    }
  }
}
</style>
