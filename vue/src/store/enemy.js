import enemyAction from "@/components/common/enemyAction";
import rarity from "@/components/common/rarity";

export default {
  namespaced: true,
  state: {
    enemies: [
      {
        id: 0,
        name: "Die Of Doom",
        image: require("../assets/enemies/DieOfDoom.png"),
        rarity: rarity.RARE,
        maxHealth: 36,
        actionPatterns: [
          {
            probability: 3,
            pattern: [
              {
                type: enemyAction.ATTACK,
                values: [4],
                randomRange: 1,
              },
            ]
          },
          {
            probability: 2,
            pattern: [
              {
                type: enemyAction.DEFEND,
                values: [5],
                randomRange: 2,
              },
            ],
          },
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.ATTACK_MULTIPLE,
                values: [1, 6],
                randomRange: 0,
              },
            ],
          },
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [3, 2],
                randomRange: 0,
              },
            ],
          },
          {
            probability: 4,
            pattern: [
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [6, 6],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [5, 4],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [4, 4],
                randomRange: 0,
              },
            ],
          },
          {
            probability: 5,
            pattern: [
              {
                type: enemyAction.ATTACK_MULTIPLE,
                values: [3, 3],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_MULTIPLE,
                values: [2, 2],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [1, 1],
                randomRange: 0,
              },
            ],
          },
          {
            probability: 2,
            pattern: [
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [6, 6],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_MULTIPLE,
                values: [5, 2],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [4, 3],
                randomRange: 0,
              },
              {
                type: enemyAction.ATTACK_AND_DEFEND,
                values: [2, 5],
                randomRange: 0,
              },
            ],
          },
        ], //patterns
      },
      {
        name: "",
        image: "",
        rarity: rarity.DEFAULT,
        maxHealth: 0,
        actionPatterns: [
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.ATTACK,
                values: [0],
                randomRange: 2,
              },
            ]
          },
          {
            probability: 1,
            pattern: [
              {
                type: enemyAction.DEFEND,
                values: [0],
                randomRange: 0,
              },
            ],
          },
        ], //patterns
      },
    ],
  },
  getters: {
    getEnemies: (state) => state.enemies.filter((enemy) => enemy.rarity > rarity.DEFAULT),
    getEnemyById: (state) => (id) => state.enemies[id],
  },
};
