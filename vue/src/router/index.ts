import Vue from "vue";
import VueRouter from "vue-router";
import GamePage from "../components/pages/GamePage.vue";
import PipePage from "../components/pages/PipePage.vue";

import { RouteNames } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.GAME,
    component: GamePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
