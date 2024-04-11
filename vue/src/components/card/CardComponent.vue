<template>
  <div class="card">
    <div class="img-container">
      <img :src="link" class="card__img" />
    </div>
    <div class="info-container">
      <div class="card__title">{{ title.toUpperCase() }}</div>
      <div class="card__desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: ['imgUrl', 'title', 'desc'],
  computed: {
    link() {
      return (
        this.imgUrl ||
        'https://pho-hoai-vietnamese.com/img/placeholders/grey_fork_and_knife.png?clckid=8abfa2cc'
      );
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  max-width: 300px;
  border-radius: 9px;
  border: 1px solid #eee;
  font: 600 22px / 26px 'sf pro display';
  &:hover {
    cursor: pointer;
  }
  &:hover .card__img {
    transform: scale(1.04);
  }
  .img-container {
    max-width: 300px;
    height: 200px;
    border-radius: 6px;
    transition: 0.4s;
    overflow: hidden;
  }
  .info-container {
    padding: 16px 20px;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.4s;
  }
  &__title {
  }
  &__desc {
    margin: 3px 0 0 0;
    color: rgba(0, 0, 0, 0.4);
    font: 15px / 18px 'sf pro display';
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
