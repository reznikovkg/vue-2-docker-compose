<template>
  <div class="header">
    <div class="header__logo">WBLOG</div>
    <nav class="header__nav">
      <ul class="header__nav__list">
        <RouterLink
          v-if="currentRoute != 'HOME'"
          class="header__nav__list__elem" 
          :to="{name: 'HOME'}"
        >
          Home
        </RouterLink>
        <RouterLink
          v-if="currentRoute != 'POSTS'"
          class="header__nav__list__elem" 
          :to="{name: 'POSTS'}"
        >
          Posts
        </RouterLink>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }
}
</script>

<style scoped lang="less">
.header {
  width: 100%;
  background: #000000;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  &__logo {
    font-size: 32px;
    color: white;
    font-weight: 600;
    padding-left: 64px;
  }
  &__nav {
    padding-right: 64px;
    &__list {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 20px;
      &__elem {
        color: white;
        font-size: 20px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
