import cardEffect from "@/components/common/cardEffect";
import rarity from "@/components/common/rarity";

export default {
  namespaced: true,
  state: {
    cards: [
      {
        id: 0,
        title: "Attack",
        image: require("@/assets/cards/Archer_Charged_Shot.png"),
        cost: 1,
        rarity: rarity.BASIC,
        targeted: true,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [6],
          },
        ],
      },
      {
        id: 1,
        title: "Defend",
        image: require("@/assets/cards/Mage_Explode.png"),
        cost: 1,
        rarity: rarity.BASIC,
        targeted: false,
        effects: [
          {
            type: cardEffect.DEFEND,
            values: [6],
          },
        ],
      },
      {
        id: 2,
        title: "Riposte",
        image: require("@/assets/cards/Archer_Back_Up.png"),
        cost: 2,
        rarity: rarity.COMMON,
        targeted: true,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [6],
          },
          {
            type: cardEffect.DEFEND,
            values: [4],
          },
        ],
      },
      {
        id: 3,
        title: "Fury Swipes",
        image: require("@/assets/cards/Archer_Rapid_Fire.png"),
        cost: 1,
        rarity: rarity.COMMON,
        targeted: true,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [1, 5],
          },
        ],
      },
      {
        id: 4,
        title: "Combat Roll",
        image: require("@/assets/cards/Archer_Explosive_Arrow.png"),
        cost: 0,
        rarity: rarity.RARE,
        targeted: false,
        effects: [
          {
            type: cardEffect.DISCARDRANDOM,
            values: [1],
          },
          {
            type: cardEffect.DRAW,
            values: [2],
          },
        ],
      },
      {
        title: "",
        image: "",
        cost: 0,
        rarity: rarity.DEFAULT,
        targeted: true,
        effects: [
          {
            type: cardEffect.ATTACK,
            values: [0],
          },
        ],
      },
    ],
  },
  getters: {
    getCards: (state) => state.cards.filter((card) => card.rarity > rarity.DEFAULT),
    getCardById: (state) => (id) => state.cards.find((card) => card.id == id),
  },
};
