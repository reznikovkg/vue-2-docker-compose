<template>
  <el-container>
    <el-header v-bind:height="100">
      <HeaderComponent />
    </el-header>
    <el-header class="dark-header">
      <MenuComponent />
    </el-header>
<!--    <el-main>-->
<!--      <div class="content">-->
        <slot />
<!--      </div>-->
<!--    </el-main>-->
  <FooterComponent />
  </el-container>
</template>

<script>
import HeaderComponent from "./Header.vue";
import FooterComponent from "./Footer.vue";
import MenuComponent from "./Menu.vue";
import ElementUI from "element-ui";
export default {
  name: "PageLayout",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ElContainer: ElementUI.Container,
    ElHeader: ElementUI.Header,
    ElFooter: ElementUI.Footer,
    // ElMain: ElementUI.Main,
  },
};
</script>

<style scoped lang="less">
* {
  font-family: Arial, sans-serif;
}
.el-header {
  background: white;
}
.dark-header {
  background: #022E40;
  color: #FAFAFA;
}
.content {
  margin: 0 auto;
  padding: 20px 34px;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  max-width: 1000px;
}
</style>
