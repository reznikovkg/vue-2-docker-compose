import Vue from "vue";
import VueRouter from "vue-router";
import { RouteNames } from "./routes";
import GamePage from "../components/pages/GamePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: GamePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
