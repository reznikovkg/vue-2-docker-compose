<template>
  <div class="container content">
    <NavLink :to="'/catalog'" :title="'Back to recipes'" />
    <section class="card-wrapper">
      <div class="img-container">
        <img class="card__img" :src="imgUrl" alt="" />
      </div>
      <div class="desc-container">
        <h1 class="card__title">{{ title }}</h1>
        <!-- <hr /> -->
        Description:
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
}
.img-container {
  width: 400px;
  height: 400px;
  border: 3px solid black;
  transition: 0.4s;
  overflow: hidden;
}
.desc-container {
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 25px;
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
    color: black;
    text-transform: capitalize;
    position: relative;
    width: fit-content;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 50%;
      border-bottom: 3px solid;
      bottom: 0;
    }
  }
  &__desc {
    letter-spacing: 1px;
    color: black;
    text-align: justify;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 50%;
      border-bottom: 1px solid;
      bottom: 0;
      left: 50%;
    }
  }
}
</style>
