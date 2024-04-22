<template>
  <div class="container content">
    <NavLink :to="'/catalog'" :title="'В каталог'" />
    <section class="card-wrapper">
      <div class="img-container">
        <img class="card__img" :src="imgUrl" alt="" />
      </div>
      <div class="desc-container">
        <h1 class="card__title">{{ title }}</h1>
        <hr />
        Описание:
        <p class="card__desc">{{ desc }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import NavLink from "../parts/NavLink.vue";
export default {
  name: "RecipeDetails",
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    imgUrl: { type: String, required: true },
  },
  components: {
    NavLink,
  },
};
</script>

<style lang="less" scoped>
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 25px;
  font-family: "Jost", sans-serif;
}
.img-container {
  max-width: 500px;
  max-height: 500px;
  border-radius: 6px;
  transition: 0.4s;
  overflow: hidden;
}
.desc-container {
  max-width: 350px;
}
.card {
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.4s;
  }
  &__title {
    font-size: 2.8em;
  }
  &__desc {
    color: #595653;
  }
}
</style>
