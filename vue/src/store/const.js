export const addedMoneyMultBase = 1;
export const addedMoneyMultCap = 10000;
export const addedEnergyMultBase = 1;
export const addedEnergyMultCap = 100;
export const actions = {
  'sleep': {
    verb: 'sleeping',
    duration: 5000,
    requires: {
      money: 0,
      energy: 0
    },
    gives: {
      money: 0,
      energy: 100
    }
  },
  'work': {
    verb: 'working',
    duration: 30000,
    requires: {
      money: 0,
      energy: 70
    },
    gives: {
      money: 1600,
      energy: 0
    }
  },
  'go shopping': {
    verb: 'shopping',
    duration: 10000,
    requires: {
      money: 20000,
      energy: 90
    },
    gives: {
      money: 0,
      energy: 0
    }
  },
};
export const hats = {
  'cap': {
    cost: 5100,
    effects: {
      moneyMult: 2,
      energyMult: 0.2
    },
    iconPath: require('@/assets/img/hats/cap_hat.webp')
  },
  'top hat': {
    cost: 999999,
    effects: {
      moneyMult: 100,
      energyMult: 5
    },
    iconPath: require('@/assets/img/hats/top_hat.webp')
  },
  'old hat': {
    cost: 100,
    effects: {
      moneyMult: 999,
      energyMult: 1.5
    },
    iconPath: require('@/assets/img/hats/old_hat.webp')
  },
};
export const tasks = {
  'repeat sequence': {
    iconPath: require('@/assets/img/tasks/sequence.svg'),
  }
};