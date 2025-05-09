import gameScenes from '@/game/gameScenes';

export default {
  namespaced: true,
  state: {
    currentSceneId: 'bedroom',
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
    showItemDescription(item) {
      return item.description || 'Описание отсутствует';
    },
    interactWithSpot({ commit, state }, spot) {
      const hasRequiredItem = state.inventory.some(item => item.id === spot.requires);
      switch (spot.type) {
        case 'door':
          if (!spot.requires) {
            commit('setCurrentScene', spot.targetScene);
            return spot.successMessage || `Вы перешли в ${spot.name}`;
          }
          if (hasRequiredItem) {
            commit('setCurrentScene', spot.targetScene);
            commit('removeFromInventory', spot.requires);
            commit('markDoorOpened', spot.id);
            return spot.successMessage || 'Дверь открыта!';
          }
          if (state.openedDoors.includes(spot.id)) {
          commit('setCurrentScene', spot.targetScene);
          return spot.successMessage;
          }
          return spot.description;
        case 'container':
          if (!spot.requires && spot.rewards && !state.inventory.some(i => i.id === spot.rewards.id)) {
            commit('addToInventory', {
              ...spot.rewards,
              collected: true
            });
            return `Вы нашли: ${spot.rewards.name}`;
          }
          if (hasRequiredItem) {
            commit('addToInventory', spot.rewards);
            commit('removeFromInventory', spot.requires);
            return spot.successMessage || `Вы открыли ${spot.name}`;
          }
          return spot.description || 'Пусто';
        case 'info':
          if (!spot.requires) {
            if (!spot.currentMessageIndex) spot.currentMessageIndex = 0;
            const message = spot.messages[spot.currentMessageIndex];
            spot.currentMessageIndex = (spot.currentMessageIndex + 1) % spot.messages.length;
            return message || 'Что-то написано';
          }
          return 'Написанного не разобрать';
        default:
          return spot.description || 'Ничего интересного';
      }
    }
  }
};