import {getRandomFloat, getRandomInt} from "@/utils";
import {Bait, Line, Lure, Reel, Rod} from "@/models/item";
import {FISHES} from "@/store/game";

export const ITEMS = [
  new Bait({name: "Конфета", image: "candy", price: 80, effectiveness: 0.8, type: "omnivorous"}),
  new Bait({
    name: "Хлебный мякиш",
    description: "Простой и бесплатный вариант наживки. Эффективен для травоядной рыбы, но быстро размокает.",
    image: "bread",
    price: 0,
    effectiveness: 0.3,
    type: "herbivorus"
  }),
  new Bait({name: "Тесто", image: "dough", price: 10, effectiveness: 0.5, type: "herbivorus"}),
  new Bait({
    name: "Червь",
    description: "Классика рыбалки, эффективен для всех видов рыб.",
    image: "worm",
    price: 80,
    effectiveness: 0.7,
    type: "omnivorous"
  }),
  new Bait({name: "Живец", image: "fish", price: 100, effectiveness: 0.7, type: "predator",}),
  new Reel({
    name: "Кусок доски",
    description: "Вместо катушки, зато бесплатно.",
    image: "reel-basic",
    price: 0,
    timeLimit: 10,
    handleWeight: 10
  }),
  new Reel({
    name: "Катушка",
    description: "Обычная металлическая катушка, классика рыбалки.",
    image: "reel-advanced",
    price: 500,
    timeLimit: 20,
    handleWeight: 30
  }),
  new Reel({
    name: "Продвинутая катушка",
    description: "Катушка с современным поворотным механизмом.",
    image: "reel-pro",
    price: 1500,
    timeLimit: 25,
    handleWeight: 100
  }),
  new Rod({
    name: "Деревянная удочка",
    description: "Какая-то палка найденная в лесу, очень хрупкая.",
    image: "rod-basic",
    baseDelay: 1500,
    price: 0,
    handleWeight: 10
  }),
  new Rod({
    name: "Пластиковая удочка",
    description: "Стандартная удочка для рыбалки.",
    image: "rod-advanced",
    price: 1000,
    baseDelay: 2000,
    handleWeight: 25
  }),
  new Rod({
    name: "Удочка из композитного материала",
    description: "Удочка для истинных рыбаков, выдерживает серьёзные нагрузки.",
    image: "rod-pro",
    baseDelay: 2500,
    price: 5000,
    handleWeight: 100
  }),
  new Line({
    name: "Нитка",
    description: "Нитки вырванные из старой одежды. Можно использовать в качестве лески.",
    price: 0,
    handleWeight: 4,
    image: "string-basic"
  }),
  new Line({
    name: "Леска",
    description: "Обычная серая леска, ничего особенного",
    price: 10,
    handleWeight: 10,
    image: "string-basic"
  }),
  new Line({
    name: "Продвинутая леска",
    description: "Леска которая способна выдерживать более сильные нагрузки.",
    price: 100,
    handleWeight: 50,
    image: "string-advanced"
  }),
  new Line({
    name: "Леска из углеродных нанотрубок",
    description: "Леска нового поколения, способна выдерживать очень высокие нагрузки.",
    price: 240,
    handleWeight: 200,
    image: "string-pro"
  }),
  new Lure(),
];


export default {
  namespaced: true,
  state: {
    items: [],
    fishes: [],
    equipedRod: null,
    equipedReel: null,
    equipedLine: null,
    equipedBait: null,
    money: 1000,
  },
  mutations: {
    ADD_MONEY(state, amount) {
      state.money += amount;
    },

    REMOVE_MONEY(state, amount) {
      if (amount > state.money) {
        console.warn("Not enough money");
      } else {
        state.money -= amount;
      }
    },

    ADD_FISH(state, fish) {
      state.fishes.push(fish);
    },

    ADD_ITEM(state, item) {
      let index = state.items.findIndex(x => x.id === item.id);
      if (index === -1) {
        item.count = 1;
        state.items.push(item);
      } else {
        if (!state.items[index].stackable) {
          state.items[index].count = 1;
        } else {
          state.items[index].count += 1;
        }
      }
      state.money -= item.price;
    },

    EQUIP_ITEM(state, item) {
      switch (item.constructor.name) {
        case "Rod":
          state.equipedRod = item;
          break;
        case "Line":
          state.equipedLine = item;
          break;
        case "Bait":
          state.equipedBait = item;
          break;
        case "Reel":
          state.equipedReel = item;
          break;
        default:
          console.error(`Unknown item type: ${item.constructor.name}`);
          break;
      }
    },

    REMOVE_FISH(state, index) {
      state.fishes.splice(index, 1);
    },

    REMOVE_ITEM(state, {item}) {
      let foundItem = state.items.find(x => x.id === item.id);
      if (foundItem) {
        foundItem.count = Math.max(0, foundItem.count - 1)

        if (foundItem.count === 0) {
          const idx = state.items.indexOf(foundItem);
          state.items.splice(idx, 1);

          if (state.equipedRod?.id === foundItem.id) state.equipedRod = null;
          if (state.equipedReel?.id === foundItem.id) state.equipedReel = null;
          if (state.equipedLine?.id === foundItem.id) state.equipedLine = null;
          if (state.equipedBait?.id === foundItem.id) state.equipedBait = null;
        }
      } else {
        console.warn(`Could not find item with id ${item.id}`);
      }
    },

    EQUIP_ROD(state) {
      if (!state.equipedRod) {
        return;
      }
      state.equipedRod.equiped = true;
    },

    UNEQUIP_ROD(state) {
      if (!state.equipedRod) {
        return;
      }
      state.equipedRod.equiped = false;
    },
  },
  actions: {
    buyItem({commit, state}, item) {
      if (state.money >= item.price) {
        commit('ADD_ITEM', item);
        return true;
      } else {
        console.warn("Not enough money");
        return false;
      }
    },

    sellItem({commit, state}, item) {
      let foundItem = state.items.find(x => x.id === item.id && item.count > 0);
      if (foundItem) {
        commit('REMOVE_ITEM', {item: foundItem});
        commit('ADD_MONEY', foundItem.price);
      }
    },

    sellFish({commit, state}, fishIndex) {
      if (!state.fishes[fishIndex] === undefined) {
        return;
      }

      const fishData = state.fishes[fishIndex];
      const value = Math.floor(fishData.item.weight * fishData.item.fish.pricePerKg);
      commit('ADD_MONEY', value);
      commit('REMOVE_FISH', fishIndex);
    },

    equipItem({commit}, item) {
      commit('EQUIP_ITEM', item);
    },

    calculateWeights({state, commit}, weight) {
      if (state.equipedRod.handleWeight * getRandomInt(1, 3) < weight) {
        commit('REMOVE_ITEM', {item: state.equipedRod});
        return "Rod";
      }

      if (state.equipedReel.handleWeight * getRandomInt(1, 2) < weight) {
        commit('REMOVE_ITEM', {item: state.equipedReel});
        return "Reel";
      }

      if (state.equipedLine.handleWeight < weight) {
        commit('REMOVE_ITEM', {item: state.equipedLine});
        return "Line";
      }

      return null;
    },

    debugAddFishes({commit}) {
      for (let i = 0; i < 10; i++) {
        // eslint-disable-next-line no-unused-vars
        const randFish = FISHES.find(_ => getRandomInt(0, 1) == 0);
        const fish = {fish: randFish, weight: getRandomFloat(0.3, randFish.maxWeight)};
        commit('ADD_FISH', {item: fish});
      }
    },

    setStartingGear({dispatch}) {
      dispatch('buyItem', ITEMS[1]);
      dispatch('buyItem', ITEMS[5]);
      dispatch('buyItem', ITEMS[8]);
      dispatch('buyItem', ITEMS[11]);
    },
  }
}