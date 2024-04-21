<template>
  <router-link :to="to"> {{ title }} </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: ["to", "title"],
};
</script>

<style lang="less" scoped></style>
