<template>
  <div>
    <RecipeDetails
      :id="cardData.id"
      :title="cardData.title"
      :desc="cardData.desc"
      :imgUrl="cardData.imgUrl"
    />
  </div>
</template>

<script>
import RecipeDetails from "../pages/RecipeDetails.vue";

export default {
  name: "RecipeLayout",
  data: () => {
    return {
      cardData: {},
    };
  },
  components: { RecipeDetails },

  mounted() {
    const arrPath = this.$router.currentRoute.path.split("/");
    const findestId = arrPath[arrPath.length - 1];

    this.cardData = this.$store.getters.getCardById(findestId);
  },
};
</script>

<style lang="less" scoped>
.recipe-layout {
  border: 2px solid red;
}
</style>
