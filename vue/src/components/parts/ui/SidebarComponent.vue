<template>
  <div class="sidebar">
    <nav class="sidebar__nav">
      <ul class="sidebar__nav__list">
        <li>
          <RouterLink
            class="sidebar__nav__list__elem" 
            :to="{name: 'HOME'}"
            active-class="highlighted-icon" 
            exact
          >
            <img :src="icons.HomeIcon" alt="Home">
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="sidebar__nav__list__elem" 
            :to="{name: 'CARDS'}"
            active-class="highlighted-icon"
            exact
          >
            <img :src="icons.SettingsIcon" alt="Cards"
            :class="{ 'highlighted-icon': currentRoute === 'CARDS' }">
          </RouterLink>
        </li>
        <li>
          <RouterLink
            class="sidebar__nav__list__elem" 
            :to="{name: 'CARDS'}"
            active-class="highlighted-icon"
            exact
          >
            <img 
              :src="icons.FolderIcon" 
              alt="Cards"
              :class="{ 'highlighted-icon': currentRoute === 'CARDS' }" 
            >
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import * as Icons from '@/assets/icons/icons.js';
export default {
  name: 'SidebarComponent',
  data () {
    return {
      icons: Icons
    }
  },
  computed: {
    currentRoute () {
      return this.$route.name
    }
  }
}
</script>

<style scoped lang="less">
.highlighted-icon {
  filter: brightness(150%);
  background-color: transparent;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 7%;
  background: #4baaf4;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0;
  
  &__logo {
    font-size: 28px;
    font-weight: 600;
    padding: 20px 0;
    position: relative;
  }
  &__nav {
    position: relative;
    &__list {
      gap: 40px;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100%;
      &__elem {
        margin-bottom:10px;
        position:relative;
        img {
          filter: brightness(100%);
          width: 30px;
          height: 30px;
        }
        &:hover img {
          filter: brightness(150%);
          background-color: transparent;
        }
      }
    }
  }
}
</style>