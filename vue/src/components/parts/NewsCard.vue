<template>
  <div class="wrapper">
    <div class="img" :style="`background-image: url(${img})`" />
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="caption">{{ caption }}</div>

      <div class="info">
        <div class="info__part"><unicon name="schedule" fill="currentColor"></unicon>{{date}}</div>
        <div class="info__part"><unicon name="user" fill="currentColor"></unicon>by {{user}}</div>
        <div class="info__part"><unicon name="comment" fill="currentColor"></unicon>{{comments}}</div>
      </div>
      <a :href="`/news/${id}`" class="button">Read more</a>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NewsCard',
    props: ['img', 'id', 'caption', 'title', 'date', 'user', 'comments']
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    position: relative;
    width: calc((1200px - 40px) / 3);
    overflow: hidden;
    color: black;
  }
  .img {
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 65%;
    top: 20px;
    left: 0;
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
  }
  .priceWrapper {
    display: flex;
    align-items: flex-end;
    column-gap: 12px;
    margin-top: 28px;
    margin-bottom: 8px;
  }
  .button {
    background: transparent;
    color: black;
    border: 1px solid gray;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    column-gap: 8px;
    margin-block: 8px;
    width: fit-content;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
  }
  .info {
    display: flex;
    align-items: center;
    column-gap: 12px;
    color: gray;
    margin-block: 14px;

    &__part {
      display: flex;
      align-items: center;
      column-gap: 4px;
    }
  }
  .title {
    font-size: 24px;
    font-weight: bold;
  }
  .caption {
    display:inline-block;
    text-overflow: ellipsis;
    max-width: 100%;
    height: 3.5em;
    color: gray;
    overflow: hidden;
    margin-top: 12px;
  }
</style>
