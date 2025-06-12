import HomePage from "@/components/pages/HomePage.vue";
import GamePage from "@/components/pages/GamePage.vue";
import LocationSelect from "@/components/pages/LocationSelect.vue";
import Shop from "@/components/pages/ShopPage.vue";
import InventoryPage from "@/components/pages/InventoryPage.vue";

const routes = [
  {
    name: "Home",
    component: HomePage
  },
  {
    name: "Game",
    component: GamePage
  },
  {
    name: "Locations",
    component: LocationSelect
  },
  {
    name: "Shop",
    component: Shop
  },
  {
    name: "Inventory",
    component: InventoryPage
  }
]

export default {
  namespaced: true,
  state: {
    currentRoute: "Home",
    history: ["Home"],
  },
  getters: {
    getCurrentRoute: (state) => routes.find(route => route.name === state.currentRoute),
    getRoutes: () => routes,
  },
  mutations: {
    REPLACE_CURRENT_ROUTE: (state, route) => {
      state.currentRoute = route;
    },
    SET_ROUTE: (state, route) => {
      if (state.currentRoute !== route) {
        state.history.push(state.currentRoute);
      }
      state.currentRoute = route;
    },
    GO_BACK(state) {
      if (state.history.length > 0) {
        state.currentRoute = state.history.pop();
      }
    }
  },
  actions: {
    back({commit, state}) {
      if (state.history.length) {
        commit('GO_BACK');
      }
    },
  }
}
