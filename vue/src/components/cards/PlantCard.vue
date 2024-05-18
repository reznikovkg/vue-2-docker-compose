<template>
  <RouterLink class="wrapper" :to="{name: 'PLANT', params: { id: plant.id }}">
    <div class="plant">
      <div class="plant__view">
        <img class="plant__img" :src="plant.image" alt="">
        <div class="plant__name"> {{ plant.name }} </div>
        <div class="plant__price"> ${{ plant.price }} </div>
      </div>
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'plantCard',
  props: {
    plant: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  width: 300px;
  transition: all .3s ease-in-out;
  &:hover {
    background-color: #f6f6f6;
  }
}
.plant {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
  &__view {
    font-size: 18px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    padding: 12px;
  }
  &__img {
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
  &__name {
    font-weight: 600;
    margin-top: 5px;
  }
  &__price {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
}
</style>
