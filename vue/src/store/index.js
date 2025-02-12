import Vue from "vue";
import Vuex from "vuex";
import { items } from "@/components/engine/gameEngine";
import { recipes } from "@/components/engine/recipes";

Vue.use(Vuex);

export default {
  state: {
    items: items,
    tableItems: [],
    recipes: recipes,
  },
  mutations: {
    ADD_ITEM(state, item) {
      state.items.push(item);
    },
    ADD_TABLE_ITEM(state, item) {
      state.tableItems.push(item);
    },
    REMOVE_TABLE_ITEM(state, index) {
      state.tableItems.splice(index, 1);
    },
    CLEAR_TABLE(state) {
      state.tableItems = [];
    },
    SET_RECIPES(state, recipes) {
      state.recipes = recipes;
    },
  },
  actions: {
    addItem({ commit }, item) {
      commit("ADD_ITEM", item);
    },
    addTableItem({ commit }, item) {
      commit("ADD_TABLE_ITEM", item);
    },
    removeTableItem({ commit }, index) {
      commit("REMOVE_TABLE_ITEM", index);
    },
    clearTable({ commit }) {
      commit("CLEAR_TABLE");
    },
    setRecipes({ commit }, recipes) {
      commit("SET_RECIPES", recipes);
    },
  },
  getters: {
    items: (state) => state.items,
    tableItems: (state) => state.tableItems,
    recipes: (state) => state.recipes,
  },
};
