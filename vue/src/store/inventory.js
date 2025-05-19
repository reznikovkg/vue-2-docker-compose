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
      ADD_ITEM: (state, { id, pos }) => (
        state.cellItems[pos].push({
          src: state.items[id].url,
          id: state.itemId++,
          type: id
        })
      ),
      CLEAR_INVENTORY: state => {
        state.cellItems = Array.from({ length: 9 }, () => []);
        state.itemId = 0;
      },
      LOAD_INVENTORY: (state, inventoryData) => {
        state.cellItems = inventoryData.map((type, index) => 
          type && state.items[type] 
            ? [{ src: state.items[type].url, id: index, type }]
            : []
        );
        state.itemId = Math.max(
          0,
          ...state.cellItems
            .filter(cell => cell.length)
            .map(cell => cell[0].id + 1)
        );
      }
    },
    actions:{
      addItem: ({ commit, state }, id) => {
        for (let i = 0; i < state.cellItems.length; i++) {
          if (state.cellItems[i].length === 0) {
            commit('ADD_ITEM', { id, pos: i });
            localStorage.setItem(
              'inventory',
              JSON.stringify(state.cellItems.map(cell => cell.length ? cell[0].type : null))
            );
            return;
          }
        }
      },
      clearInventory:({ commit }) => {commit('CLEAR_INVENTORY');},
      loadInventory:({ commit }) => {
        const saved = localStorage.getItem('inventory');
        if (saved) {
          commit('LOAD_INVENTORY', JSON.parse(saved));
        }
      }
    }
}