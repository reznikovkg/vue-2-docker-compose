<template>
  <div class="app">
    <HeaderComponent />
    <SidebarComponent />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import SidebarComponent from '../parts/ui/SidebarComponent.vue';
import HeaderComponent from '../parts/ui/HeaderComponent.vue';

export default {
  name: 'PageLayout',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    HeaderComponent,
    SidebarComponent
  }
}
</script>

<style scoped lang="less">
.app {
  display: flex;
  height: 100vh;
  position: relative;
  z-index: 3;
}

.header {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.147);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  color: white;
  z-index: 2;
  background: linear-gradient(to right, #3a89c9 7%, #f5f6f8 7%);
}

.sidebar {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 0;
  width: 7%;
  background: #4baaf4;
  color: white;
  z-index: 1;
  box-shadow: 8px 0 15px rgba(0, 0, 0, 0.219);
}

.content {
  margin-left: 7%;
  margin-top: 60px;
  width: 93%;
  height: calc(100% - 60px);
  overflow: auto;
  background-color: #f5f6f7;
}
</style>