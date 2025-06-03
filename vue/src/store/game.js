import gameScenes from '@/game/gameScenes';

const loadState = () => {
  const savedState = localStorage.getItem('gameState');
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    currentSceneId: 'house',
    scenes: gameScenes.scenes,
    inventory: [],
    characters: {
      player: {
        x: 0,
        y: 100,
        direction: 1
      }
    },
    dialog: {
      show: false,
      params: { ...gameScenes.dialogs.default }
    },
    gameFlags: {},
    targets: {
      currentTarget: null,
      reachedTargets: []
    },
    selectedItem: null
  };
};

const state = loadState();

function saveStateToLocalStorage(state) {
  const stateToSave = {
    currentSceneId: state.currentSceneId,
    inventory: state.inventory,
    characters: state.characters,
    gameFlags: state.gameFlags,
    dialog: state.dialog,
    targets: state.targets,
    selectedItem: state.selectedItem
  };
  localStorage.setItem('gameState', JSON.stringify(stateToSave));
}

const getters = {
  currentScene: (state) => gameScenes.scenes[state.currentSceneId],
  inventoryItems: (state) => state.inventory.map(id => ({
    ...gameScenes.items[id],
    id
  })),
  character: (state) => state.characters.player,
  hasItem: (state) => itemId => state.inventory.includes(itemId),
  dialog: (state) => state.dialog,
  selectedItem: (state) => state.selectedItem ? {
    ...gameScenes.items[state.selectedItem],
    id: state.selectedItem
  } : null,
  isFlagSet: (state) => flag => state.gameFlags[flag] || false
};

const mutations = {
  LOAD_STATE: (state, savedState) => {
    state.currentSceneId = savedState.currentSceneId || 'house';
    state.inventory = savedState.inventory || [];
    state.characters = savedState.characters || {
      player: { x: 0, y: 100, direction: 1 }
    };
    state.gameFlags = savedState.gameFlags || {};
    state.dialog = savedState.dialog || { show: false, params: { ...gameScenes.dialogs.default } };
    state.targets = savedState.targets || { currentTarget: null, reachedTargets: [] };
    state.selectedItem = savedState.selectedItem || null;
  },
  SAVE_STATE: (state) => {
    saveStateToLocalStorage(state);
  },

  SET_SCENE:(state, sceneId) => {
    state.currentSceneId = sceneId;
    state.characters.player.x = 0;
    saveStateToLocalStorage(state);
  },

  ADD_ITEM:(state, itemId) => {
    if (!state.inventory.includes(itemId)) {
      state.inventory.push(itemId);
      saveStateToLocalStorage(state);
    }
  },

  REMOVE_ITEM:(state, itemId) => {
    state.inventory = state.inventory.filter(id => id !== itemId);
    saveStateToLocalStorage(state);
  },

  SET_FLAG:(state, { flag, value }) => {
    state.gameFlags[flag] = value;
    saveStateToLocalStorage(state);
  },

  MOVE_CHARACTER:(state, { x, direction }) => {
    state.characters.player.x = x;
    if (direction !== undefined) {
      state.characters.player.direction = direction;
    }
  },

  SET_DIALOG:(state, params)=> {
    state.dialog = {
      show: true,
      params: { ...gameScenes.dialogs.default, ...params }
    };
  },

  HIDE_DIALOG:(state) => {
    state.dialog.show = false;
    saveStateToLocalStorage(state);
  },

  RESET_GAME:(state) => {
    state.currentSceneId = 'house';
    state.inventory = [];
    state.gameFlags = {};
    state.characters.player = { x: 0, y: 100, direction: 1 };
    state.dialog = { show: false, params: { ...gameScenes.dialogs.default } };
    state.targets = { currentTarget: null, reachedTargets: [] };
    state.selectedItem = null;
    localStorage.removeItem('gameState');
  },

  SET_TARGET:(state, target) => {
    state.targets.currentTarget = target;
  },

  REACHED_TARGET:(state, targetId) => {
    state.targets.reachedTargets.push(targetId);
  },

  SET_SELECTED_ITEM:(state, itemId) => {
    state.selectedItem = itemId;
  }
};

const actions = {
  async initGame({ commit }) {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      commit('LOAD_STATE', JSON.parse(savedState));
    } else {
      commit('RESET_GAME');
    }
  },

  async resetGame({ commit }) {
    commit('RESET_GAME');
  },

  moveToTarget:({ commit, state, dispatch }, target) => {
    commit('SET_TARGET', target);

    const moveInterval = setInterval(() => {
      const char = state.characters.player;
      const currentTarget = state.targets.currentTarget;

      if (!currentTarget || currentTarget.id !== target.id) {
        clearInterval(moveInterval);
        return;
      }

      const dx = currentTarget.x - char.x;
      const direction = dx > 0 ? 1 : -1;
      const speed = 2;

      if (Math.abs(dx) > speed) {
        commit('MOVE_CHARACTER', {
          x: char.x + (speed * direction),
          direction
        });
      } else {
        commit('MOVE_CHARACTER', {
          x: currentTarget.x,
          direction
        });
        commit('REACHED_TARGET', currentTarget.id);
        commit('SET_TARGET', null);
        clearInterval(moveInterval);

        setTimeout(() => {
          const scene = gameScenes.scenes[state.currentSceneId];
          const spot = scene.spots.find(s => s.id === target.id);
          if (spot) {
            dispatch('interactWithSpot', spot);
          }
        }, 300);
      }
    }, 16);
  },

  interactWithSpot: ({ commit, getters, state, dispatch }, spot) => {
    if (!spot) return;

    if (spot.checkFlags && spot.checkFlags.every(flag => getters.isFlagSet(flag))) {
      if (spot.action?.type === 'changeScene') {
        if (spot.action.flags?.set) {
          spot.action.flags.set.forEach(flag => {
            commit('SET_FLAG', { flag, value: true });
          });
        }
        commit('SET_SCENE', spot.action.target);
        if (spot.action.message) {
          commit('SET_DIALOG', { message: spot.action.message });
        }
      }
      return;
    }

    if (spot.requiredItem && !getters.hasItem(spot.requiredItem)) {
      commit('SET_DIALOG', {
        message: `Нужен предмет: ${gameScenes.items[spot.requiredItem].name}`
      });
      return;
    }

    if (spot.action) {
      if (spot.action.flags?.set) {
        spot.action.flags.set.forEach(flag => {
          commit('SET_FLAG', { flag, value: true });
        });
      }

      switch (spot.action.type) {
        case 'giveItem':
          if (!gameScenes.items[spot.action.item].singleUse ||
            !state.inventory.includes(spot.action.item)) {
            commit('ADD_ITEM', spot.action.item);
            commit('SET_DIALOG', {
              ...gameScenes.dialogs.itemTaken,
              message: spot.action.message || 'Вы получили предмет!'
            });
          }
          break;

        case 'changeScene':
          if (spot.action.removeItem) {
            commit('REMOVE_ITEM', spot.action.removeItem);
          }
          commit('SET_SCENE', spot.action.target);
          if (spot.action.message) {
            commit('SET_DIALOG', { message: spot.action.message });
          }
          break;

        case 'setFlags':
          spot.action.flags.forEach(flag => {
            commit('SET_FLAG', { flag, value: true });
          });
          if (spot.action.removeItem) {
            commit('REMOVE_ITEM', spot.action.removeItem);
          }
          if (spot.action.winCondition &&
            spot.action.winCondition.every(flag => getters.isFlagSet(flag))) {
            dispatch('handleGameComplete', spot.action.message);
          } else if (spot.action.message) {
            commit('SET_DIALOG', { message: spot.action.message });
          }
          break;
      }
    } else if (spot.description) {
      commit('SET_DIALOG', { message: spot.description });
    }
  },

  selectItem: ({ commit }, item) => {
    commit('SET_SELECTED_ITEM', item.id);
  },

  showDialog: ({ commit }, params) => {
    commit('SET_DIALOG', params);
  },

  closeDialog: ({ commit }) => {
    commit('HIDE_DIALOG');
  },

  async handleGameComplete({ dispatch }) {
    await dispatch('showDialog', {
      ...gameScenes.dialogs.gameComplete,
      buttons: gameScenes.dialogs.gameComplete.buttons.map(btn => ({
        ...btn,
        action: btn.action === 'restartGame' ? 'resetGame' : btn.action
      }))
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
