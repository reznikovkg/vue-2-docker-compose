<template>
  <CustomButton 
    type="back" 
    @click="goBack"
  > 
    Назад 
  </CustomButton>
</template>

<script>
import CustomButton from "./CustomButton.vue";
import { RouteNames } from "@/router/routes";
import { RouteTree } from "@/GameEngine/RouteTree";

export default {
  name: "BackButton",
  components: {
    CustomButton,
  },
  methods: {
    goBack() {
      const currentRoute = this.$route.name;
      const previousRoute = RouteTree[currentRoute] || RouteNames.HOME;
      this.$router.push({ name: previousRoute });
    },
  },
};
</script>
