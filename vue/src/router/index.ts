import Vue from "vue";
import Router from "vue-router";
import GameView from "@/components/game/GameView.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "GameView",
      component: GameView,
    },
  ],
});
