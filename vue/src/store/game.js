import gameScenes from '@/game/gameScenes';

export default {
  namespaced: true,
  state: {
    currentSceneId: 'room',
    inventory: [],
    selectedItem: null,
    scenes: gameScenes,
    openedDoors: []
  },
  getters: {
    currentScene: (state) => state.scenes[state.currentSceneId],
    inventory: (state) => state.inventory,
    selectedItem: (state) => state.selectedItem
  },
  mutations: {
    setCurrentScene(state, sceneId) {
      state.currentSceneId = sceneId;
    },
    addToInventory(state, item) {
      state.inventory.push(item);
    },
    removeFromInventory(state, itemId) {
      state.inventory = state.inventory.filter(i => i.id !== itemId);
    },
    markItemCollected(state, itemId) {
      const scene = state.scenes[state.currentSceneId];
      const item = scene.items.find(i => i.id === itemId);
      if (item) item.collected = true;
    },
    markDoorOpened(state, doorId) {
      if (!state.openedDoors.includes(doorId)) {
        state.openedDoors.push(doorId);
      }
    }
  },
  actions: {
    selectItem({ commit }, item) {
      commit('setSelectedItem', item);
    },
    takeItem({ commit }, item) {
      if (!item.collected) {
        commit('addToInventory', { ...item, collected: true });
        commit('markItemCollected', item.id);
        return true;
      }
      return false;
    },
    interactWithSpot({ commit, state }, spot) {
      if (!spot.requires) {
        if (spot.type === 'door') {
          commit('setCurrentScene', spot.targetScene);
          return spot.successMessage || `Вы перешли в ${spot.name}`;
        }
        if (spot.type === 'container') {
          if (spot.rewards && !state.inventory.some(i => i.id === spot.rewards.id)) {
            commit('addToInventory', {
              ...spot.rewards,
              collected: true
            });
            return `Вы нашли: ${spot.rewards.name}`;
          }
          return spot.description || 'Контейнер пуст';
        }
        return spot.description || 'Ничего интересного';
      }
      if (spot.type === 'door' && state.openedDoors.includes(spot.id)) {
        commit('setCurrentScene', spot.targetScene);
        return spot.successMessage;
      }
      const hasRequiredItem = state.inventory.some(item => item.id === spot.requires);
      if (!hasRequiredItem) {
        return spot.description;
      }
      switch (spot.type) {
        case 'door':
          if (hasRequiredItem) {
            commit('setCurrentScene', spot.targetScene);
            commit('removeFromInventory', spot.requires);
            commit('markDoorOpened', spot.id);
            return spot.successMessage || 'Дверь открыта!';
          }
          return spot.failMessage;
        case 'container':
          if (hasRequiredItem) {
            commit('addToInventory', spot.rewards);
            commit('removeFromInventory', spot.requires);
            return spot.successMessage || `Вы открыли ${spot.name}`;
          }
          return spot.failMessage;
        default:
          return spot.description || 'Произошло взаимодействие';
      }
    }
  }
};