import Vue from "vue";
import VueRouter from "vue-router";

import { RouteNames } from "./routes";
import App from "@/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.GAME,
    component: App,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
