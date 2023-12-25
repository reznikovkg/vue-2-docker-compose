<template>
  <div class="wrapper">
    <div class="card">
      <div class="title"><span v-for="item in title.split(' ')">{{item}}</span></div>
      <div class="caption">{{caption}}</div>
      <a :href="`/parts/${id}`">view more <unicon class="icon" name="arrow-right" width="16" height="16" fill="currentColor"></unicon></a>
      <img class="img" :src="`${img}`" />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ProductTypeCard',
    props: ['title', 'img', 'id', 'caption']
  }
</script>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 65%;
    background: black;
    overflow: hidden;

    &:first-child, &:nth-child(7) {
      background: #41b883;
    }

    &:nth-child(2), &:nth-child(4), &:nth-child(5) {
      background: #022E40;
    }
  }
  .card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 40px;
    color: white;

    a {
      display: flex;
      align-items: center;
      margin-top: 20px;
      color: white;
      cursor: pointer;
    }
  }
  .title {
    font-size: 36px;
    text-transform: uppercase;
    width: min-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span:first-child {
      font-weight: bold;
    }
    span:last-child {
      font-weight: 200;
      font-size: 26px;
    }
  }
  .caption {
    margin-top: 20px;
    font-size: 12px;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    height: 20px;
    width: 20px;
    color: gray;
    border-radius: 50%;
    margin-left: 8px;
  }
  .img {
    position: absolute;
    width: 80%;
    bottom: 0;
    right: 0;
    transform: translate(20%, 20%);
  }
</style>
