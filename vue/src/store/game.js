import gameScenes from '@/game/gameScenes';

const DEFAULT_DIALOG = {
  title: 'Информация',
  buttons: [{
    text: 'OK',
    afterClick: 'emitClose'
  }]
};

const state = () => ({
  currentSceneId: 'house',
  inventory: [],
  selectedItem: null,
  scenes: gameScenes,
  openedDoors: [],
  gameFlags: {},
  gameCompleted: false,
  dialog: {
    show: false,
    params: { ...DEFAULT_DIALOG }
  }
});

const getters = {
  currentScene: (state) => {
    state.scenes[state.currentSceneId]
  },
  inventory: (state) => {
    state.inventory
  },
  selectedItem: (state) => {
    state.selectedItem
  },
  gameCompleted: (state) => {
    state.gameCompleted
  }
};

const mutations = {
  setDialog: (state, dialog) => {
    state.dialog = dialog;
  },
  resetDialog: (state) => {
    state.dialog = {
      show: false,
      params: {
        title: 'Информация',
        message: '',
        buttons: [{
          text: 'OK',
          afterClick: 'emitClose'
        }]
      }
    };
  },
  setCurrentScene: (state, sceneId) => {
    state.currentSceneId = sceneId;
  },
  setGameFlag: (state, { flag, value }) => {
    state.gameFlags[flag] = value;
  },
  completeGame: (state) => {
    state.gameCompleted = true;
  },
  resetGame: (state) => {
    state.currentSceneId = 'house';
    state.inventory = [];
    state.selectedItem = null;
    state.scenes = gameScenes;
    state.openedDoors = [];
    state.gameFlags = {};
    state.gameCompleted = false;
  },
  addToInventory: (state, item) => {
    state.inventory.push(item);
  },
  removeFromInventory: (state, itemId) => {
    state.inventory = state.inventory.filter(i => i.id !== itemId);
  },
  markItemCollected: (state, itemId) => {
    const scene = state.scenes[state.currentSceneId];
    const item = scene.items.find((i) => {
      return i.id === itemId;
    });
    if (item) {
      item.collected = true;
    }
  },
  markDoorOpened: (state, doorId) => {
    if (!state.openedDoors.includes(doorId)) {
      state.openedDoors.push(doorId);
    }
  },
  setSelectedItem: (state, item) => {
    state.selectedItem = item;
  }
};

const actions = {
  selectItem: ({ commit }, item) => {
    commit('setSelectedItem', item);
  },
  takeItem: ({ commit }, item) => {
    if (!item.collected) {
      commit('addToInventory', { ...item, collected: true });
      commit('markItemCollected', item.id);
      return true;
    }
    return false;
  },
  showItemDescription: (_, item) => {
    return item.description || 'Описание отсутствует';
  },
  interactWithSpot: ({ commit, state }, spot) => {
    const hasRequiredItem = state.inventory.some((item) => {
      return item.id === spot.requires;
    });
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
          return `Вы нашли ${spot.rewards.name}`;
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
      case 'mechanism':
        if (spot.requires && hasRequiredItem) {
          commit('removeFromInventory', spot.requires);
          if (spot.setFlags) {
            spot.setFlags.forEach(flag => {
              commit('setGameFlag', { flag, value: true });
            });
          }
          if (spot.winCondition && spot.winCondition.every(flag => state.gameFlags[flag])) {
            commit('completeGame');
            return {
              message: spot.successMessage,
              gameCompleted: true
            };
          }
          return spot.successMessage;
        }
        return spot.description;
      default: {
        return spot.description || 'Ничего интересного';
      }
    }
  },
  restartGame: ({ commit }) => {
    commit('resetGame');
    commit('resetDialog');
  },
  closeDialog: ({ commit }) => {
    commit('setDialog', { show: false });
  },
  showDialog: ({ commit }, params) => {
    commit('setDialog', {
      show: true,
      params: { ...DEFAULT_DIALOG, ...params }
    });
  },
  handleGameComplete: ({ dispatch, state }, message) => {
    console.log('handleGameComplete called', { gameCompleted: state.gameCompleted });
    if (state.gameCompleted) {
      dispatch('showDialog', {
        title: 'Поздравляем!',
        message: `${message}\n\nИгра завершена!`,
        buttons: [
          {
            text: 'Начать заново',
            action: () => dispatch('restartGame')
          },
          {
            text: 'Осмотреться',
            afterClick: 'emitClose'
          }
        ]
      });
    } else {
      dispatch('showDialog', { message });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};