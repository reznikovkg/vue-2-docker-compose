import Vue from "vue";
import VueRouter, { Route } from "vue-router";
import HomePage from "../components/pages/Home.vue";
import GamePage from "../components/pages/Game.vue";
import EditorPage from "../components/pages/Editor.vue";
import { RouteNames } from "./routes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: RouteNames.HOME,
    component: HomePage,
  },
  {
    path: "/level-:level_number",
    name: RouteNames.GAME,
    component: GamePage,
    props: (route: Route) => ({
      levelNumber: Number(route.params.level_number),
    }),
  },
  {
    path: "/editor",
    name: RouteNames.EDITOR,
    component: EditorPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
