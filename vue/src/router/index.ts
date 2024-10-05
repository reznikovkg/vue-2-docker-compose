import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/pages/Home.vue";
import AddItemPage from "../components/pages/AddItem.vue";
import { RouteNames } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: HomePage,
  },
  {
    path: "/add-item",
    name: RouteNames.ADD_ITEM,
    component: AddItemPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
