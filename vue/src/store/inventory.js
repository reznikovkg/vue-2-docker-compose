export default{
    namespaced:true,
    state:{
      cellItems: Array(9).fill().map(() => []),
      itemId: 0,
      items: {
        1: { url: require('@/assets/Fish1.png') },
        2: { url: require('@/assets/Fish2.png') },
        3: { url: require('@/assets/Fish3.png') },
        4: { url: require('@/assets/Fish4.png') }
  }
    },
    getters:{
      getInv: (state) => state.cellItems,
    },
    mutations:{
      ADD_ITEM(state, {id, pos}) {
        const newItem = {
          src: state.items[id].url,
          id: state.itemId++,
          type: id
        };
        state.cellItems[pos].push(newItem);
      },
      CLEAR_INVENTORY(state) {
        state.cellItems = Array(9).fill().map(() => []);
        state.itemId = 0;
      },
      LOAD_INVENTORY(state, inventoryData) {
        state.cellItems = Array(9).fill().map(() => []);
        inventoryData.forEach((type, index) => {
          if (type !== null && state.items[type]) {
            state.cellItems[index] = [{
              src: state.items[type].url,
              id: index,
              type: type
            }];
          }
        });
        state.itemId = state.cellItems.reduce((max, cell) => {
        return cell.length > 0 ? Math.max(max, cell[0].id + 1) : max;}, 0);
      }
    },
    actions:{
      addItem({ commit, state }, id) {
        for (let i = 0; i < state.cellItems.length; i++) {
          if (state.cellItems[i].length === 0) {
            commit('ADD_ITEM', {id, pos: i});
            localStorage.setItem('inventory', JSON.stringify(
              state.cellItems.map(cell => cell.length ? cell[0].type : null)));
            return;
            }
        }
        },
      clearInventory({ commit }) {commit('CLEAR_INVENTORY');},
      loadInventory({ commit }) {
        const saved = localStorage.getItem('inventory');
        if (saved) {
          commit('LOAD_INVENTORY', JSON.parse(saved));
        }
      }
    }
}