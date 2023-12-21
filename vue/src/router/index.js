import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../components/pages/HomeView.vue";
import StoreView from "../components/pages/StoreView.vue";
import ItemPage from "../components/pages/ItemView.vue"

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/store",
      name: "store",
      component: StoreView,
    },
    { path: '/store/:id',
      component: ItemPage,
      name: "item",
      props: true
    },
  ],
});

export default router;
