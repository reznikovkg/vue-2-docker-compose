  <template>
    <div id="app">
      <Header />
      <router-view :key="$route.fullPath"/>
    </div>
  </template>
  <script>
  import Header from '@/components/pages/Header.vue'
  export default {
    name: 'App',
    components: {
      Header
    }
  }
  </script>
	
 <style lang="less">
	@import "@/less/const.less";

	html, body, #app {
		height: 100%;
	}

	body {
		background-image: url('/public/assets/gray_black_shadow.jpg');
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		margin: 0;
	}
</style>
