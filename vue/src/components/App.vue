<template>
  <div>
    <NavigationBar :links="links"/>
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";
import NavigationBar from "./parts/Navbar.vue";

export default {
  components: {
    ModalContainer,
    NavigationBar,
  },
  data() {
    return {
      links: [
        { to: "/", title: "Recipes" },
        { to: "/create", title: "Create recipe" },
      ],
    };
  },
};
</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

body {
  margin: 0;
  padding: 0;
  background-color: #E7E8DE;
  font-family: @alte-reg;
}

a {
  text-decoration: none;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: @alte-bold;
  color: @cBaseThree;
  margin: 0;
}

.p-16 {
  padding: 16px;
}

</style>
