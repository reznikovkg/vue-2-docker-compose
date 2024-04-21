import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/pages/Home.vue";
import CreateRecipe from "../components/pages/Recipe.vue";
import { RouteNames } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: HomePage,
  },
  {
    path: "/create",
    name: RouteNames.CREATE,
    component: CreateRecipe,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
