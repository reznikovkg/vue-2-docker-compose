import modals from './modals'
import game from "@/store/game";
import inventory from "@/store/inventory";
import locations from "@/store/locations";
import notice from "@/store/notice";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  modules: {
    modals,
    game,
    locations,
    inventory,
    notice
  }
}
