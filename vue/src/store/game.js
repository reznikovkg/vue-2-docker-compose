import { actions, addedEnergyMultCap, addedMoneyMultCap, hats } from "./const";


export default {
  namespaced: true,
  state: {
    money: 1000,
    addedMoneyMult: 1.0,
    energy: 100,
    addedEnergyMult: 1.0,
    currentAction: null,
    actionsTimeout: null,
    availableHatsNames: [],
    currentHatName: null,
    availableTasks: []
  },
  getters: {
    money: (state) => state.money,
    addedMoneyMult: (state) => state.addedMoneyMult,
    energy: (state) => state.energy,
    addedEnergyMult: (state) => state.addedEnergyMult,
    currentAction: (state) => state.currentAction,
    actionsOnTimeout: (state) => Boolean(state.currentAction),
    availableHatsNames: (state) => state.availableHatsNames,
    currentHatName: (state) => state.currentHatName,
    availableTasks: (state) => state.availableTasks
  },
  mutations: {
    setMoney: (state, newMoneyValue) => {
      state.money = newMoneyValue; 
    },
    setAddedMoneyMult: (state, newMoneyMultValue) => {
      state.addedMoneyMult = newMoneyMultValue;
    },
    setEnergy: (state, newEnergyValue) => {
      state.energy = newEnergyValue;
    },
    setAddedEnergyMult: (state, newEnergyMultValue) => {
      state.addedEnergyMult = newEnergyMultValue;
    },
    setCurrentAction: (state, newCurrentAction) => {
      state.currentAction = newCurrentAction;
    },
    setActionsTimeout: (state, newTimeoutObject) => {
      state.actionsTimeout = newTimeoutObject;
    },
    addAvailableHat: (state, newHatName) => {
      state.availableHatsNames.push(newHatName);
    },
    setCurrentHat: (state, newCurrentHatName) => {
      state.currentHatName = newCurrentHatName;
    },
    setAvailableTasks: (state, newAvailableTasks) => {
      state.availableTasks = newAvailableTasks;
    },
    removeTask: (state, targetIndex) => {
      state.availableTasks.splice(targetIndex, 1);
    }
  },
  actions: {
    changeMoney: ({state, commit}, amount) => {
      if (amount !== 0) {
        const currentMoney = state.money;
        if (amount > 0) {
          const multipliedAmount = amount * state.addedMoneyMult;
          if (currentMoney + multipliedAmount >= 1000000) {
            commit('setMoney', 1000000);
          }
          else {
            commit('setMoney', currentMoney + multipliedAmount);
          }
        }
        else {
          if (currentMoney + amount <= 0) {
            commit('setMoney', 0);
          }
          else {
            commit('setMoney', currentMoney + amount);
          }
        }
      }
    },
    changeMoneyMult: ({commit}, amount) => {
      if (amount >= addedMoneyMultCap) {
        commit('setAddedMoneyMult', addedMoneyMultCap);
      }
      else if (amount <= 0) {
        commit('setAddedMoneyMult', 0.1);
      }
      else {
        commit('setAddedMoneyMult', amount);
      }
    },
    changeEnergy: ({state, commit}, amount) => {
      if (amount !== 0) {
        const currentEnergy = state.energy;
        if (amount > 0) {
          const multipliedAmount = amount * state.addedEnergyMult;
          if (currentEnergy + multipliedAmount >= 100) {
            commit('setEnergy', 100);
          }
          else {
            commit('setEnergy', currentEnergy + multipliedAmount);
          }
        }
        else {
          if (currentEnergy + amount <= 0) {
            commit('setEnergy', 0);
          }
          else {
            commit('setEnergy', currentEnergy + amount);
          }
        }
      }
    },
    changeEnergyMult: ({commit}, amount) => {
      if (amount >= addedEnergyMultCap) {
        commit('setAddedEnergyMult', addedEnergyMultCap);
      }
      else if (amount <= 0) {
        commit('setAddedEnergyMult', 0.1);
      }
      else {
        commit('setAddedEnergyMult', amount);
      }
    },
    startEnergyTicker: ({dispatch}) => {
      setInterval(() => {
        dispatch('changeEnergy', 1);
      }, 3000);
    },
    performAction: ({state, commit, dispatch}, actionName) => {
      clearTimeout(state.actionsTimeout);
      const actionInfo = actions[actionName];
      
      dispatch('changeMoney', -actionInfo.requires.money);
      dispatch('changeMoney', actionInfo.gives.money);
      dispatch('changeEnergy', -actionInfo.requires.energy);
      dispatch('changeEnergy', actionInfo.gives.energy);
      
      commit('setCurrentAction', actionName);
      commit('setActionsTimeout', setTimeout(() => {
        commit('setCurrentAction', null);
      }, actionInfo.duration));
    },
    buyHat: ({state, commit, dispatch}, newHatName) => {
      if (!state.availableHatsNames.includes(newHatName)) {
        const newHatInfo = hats[newHatName];
        dispatch('changeMoney', -newHatInfo.cost);
        commit('addAvailableHat', newHatName);
      }
    },
    unequipCurrentHat: ({state, commit, dispatch}) => {
      if (state.currentHatName) {
        dispatch('changeMoneyMult', 1);
        dispatch('changeEnergyMult', 1);
        commit('setCurrentHat', null);
      }
    },
    equipHat: ({state, commit, dispatch}, newCurrentHatName) => {
      if (state.availableHatsNames.includes(newCurrentHatName)) {
        const newCurrentHatInfo = hats[newCurrentHatName]
        dispatch('unequipCurrentHat');
        dispatch('changeMoneyMult', newCurrentHatInfo.effects.moneyMult);
        dispatch('changeEnergyMult', newCurrentHatInfo.effects.energyMult);
        commit('setCurrentHat', newCurrentHatName);
      }
    },
    repopulateTasks: ({commit}) => {
      let res = []
      const taskCount = 5;
      for (let i = 0; i < taskCount; i++) {
        const charPool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const len = 6;
        let targetSequence = '';
        for (let i = 0; i < len; i++) {
          targetSequence += charPool.charAt(Math.floor(Math.random() * charPool.length));
        }
        res.push({
          type: 'repeat sequence',
          target: targetSequence,
          reward: 700,
          description: `Repeat sequence ${targetSequence}`,
          tryTask () {
            const promptRes = prompt(this.description);
            return promptRes === targetSequence;
          }
        });
      }
      commit('setAvailableTasks', res);
    },
    performTask: ({state, commit, dispatch}, taskIndex) => {
      if (taskIndex >= 0 && taskIndex < state.availableTasks.length) {
        const taskInfo = state.availableTasks[taskIndex];
        if (taskInfo.tryTask()) {
          dispatch('changeMoney', taskInfo.reward);
          commit('removeTask', taskIndex);
        }
        else {
          alert('Task unsuccessful!');
        }
      }
    }
  }
}