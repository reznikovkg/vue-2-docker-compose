<template>
  <div class="lorem">
    <p class="lorem__p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore omnis laboriosam ea corporis sint deleniti doloremque quibusdam.</p>
    <p class="lorem__p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum distinctio beatae ut vero aut quia molestias est, illum hic, eveniet corporis quae dicta animi, aliquam architecto ratione vel.</p>
    <a href="#" target="_blank" class="lorem__link">Instagram</a>
  </div>
</template>

<script>
export default {
  name:'LoremBlock'
};
</script>

<style lang="less" scoped>
.lorem {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 360px;
  &__p {
    letter-spacing: 1px;
    color: black;
  }
  &__link {
    text-decoration: underline;
  }
}
</style>
