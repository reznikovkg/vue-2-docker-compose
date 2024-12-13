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

export default {
  name: "BackButton",
  components: {
    CustomButton,
  },
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>
