<template>
  <router-link :to="to" class="link"> {{ title }} </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: ["to", "title"],
};
</script>

<style lang="less" scoped>
.link {
  letter-spacing: 1px;
  position: relative;
  transition: 0.2s;
  &::after {
    content: "";
    display: block;
    border-bottom: 1px solid;
    position: absolute;
    width: 100%;
    bottom: 1px;
  }
  &:hover {
    color: #5f5f5d;
  }
}
</style>
