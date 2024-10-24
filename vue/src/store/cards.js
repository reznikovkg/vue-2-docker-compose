import Vue from "vue";
import Vuex from "vuex";
import cardEffect from "@/components/common/cardEffect";

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    cards: [
      {
        title: "Attack",
        image: "",
        cost: 1,
        rarity: 1,
        effects: [
          {
            type: cardEffect.Attack,
            values: [6],
          },
        ],
      },
      {
        title: "Defend",
        image: "",
        cost: 0,
        rarity: 1,
        effects: [
          {
            type: cardEffect.Defend,
            values: [6],
          },
        ],
      },
      {
        title: "Riposte",
        image: "",
        cost: 4,
        rarity: 1,
        effects: [
          {
            type: cardEffect.Attack,
            values: [4],
          },
          {
            type: cardEffect.Defend,
            values: [4],
          },
        ],
      },
      {
        title: "Fury Swipes",
        image: "",
        cost: 14,
        rarity: 1,
        effects: [
          {
            type: cardEffect.Attack,
            values: [1, 4],
          },
        ],
      },
      {
        title: "",
        image: "",
        cost: 0,
        rarity: 0,
        effects: [
          {
            type: cardEffect.Attack,
            values: [0],
          },
        ],
      },
    ],
  },
  getters: {
    getCards: (state) => state.cards,
    getCardById: (state) => (id) =>  state.cards.find((card) => card.id == id),
  },
  mutations: {

	},
  actions: {

	},
};
