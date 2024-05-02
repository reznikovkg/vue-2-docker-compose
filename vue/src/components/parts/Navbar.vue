<template>
  <nav class="container">
    <ul class="nav">
      <li v-for="(link, index) in links" :key="index" class="nav__li">
        <NavLink :to="link.to" :title="link.title" />
      </li>
    </ul>
  </nav>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
  name: "NavigationBar",
  props: ["links"],
  components: {
    NavLink,
  },
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: center;
  gap: 35px;
  &__li {
    list-style-type: none;
  }
}
</style>
