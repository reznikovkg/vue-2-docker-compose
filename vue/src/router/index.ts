import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/pages/Home.vue";
import CreateRecipe from "../components/pages/Recipe.vue";
import RecipeLayout from "../components/parts/RecipeLayout.vue";
import { RouteNames } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/catalog",
  },
  {
    path: "/catalog",
    name: RouteNames.HOME,
    component: HomePage,
  },
  {
    path: "/catalog/:id",
    name: RouteNames.DETAILS,
    component: RecipeLayout,
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
