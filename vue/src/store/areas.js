export default {
    namespaced: true,
    state: {
      area: "Низкий"
    },
    getters: {
      getArea: state => state.area
    },
    mutations: {
      SET_AREA(state, newArea) {
        state.area = newArea;
      }
    },
    actions: {
      checkArea({ commit, rootGetters }) {
        const pos = rootGetters['movement/getPos'] || {};
        const x = pos.x;
        const y = pos.y;
  
        if ( ((Math.pow((x-290),2)) + (Math.pow((y-213),2))) < 50 **2 )  {
          commit('SET_AREA', 'Высокий');
          return;
        }
        if ( ((Math.pow((x-960),2)) + (Math.pow((y-446),2))) < 50 **2 )  {
          commit('SET_AREA', 'Высокий');
          return;
        }
        if ( ((Math.pow((x-843),2)) + (Math.pow((y-1),2))) < 150 **2 )  {
          commit('SET_AREA', 'Средний');
          return;
        }
        if ( ((Math.pow((x-668),2)) + (Math.pow((y-350),2))) < 150 **2 ) {
          commit('SET_AREA', 'Средний');
          return;
        }
        if ( ((Math.pow((x+213),2)) + (Math.pow((y-109),2))) < 150 **2 ) {
          commit('SET_AREA', 'Средний');
          return;
        }
        commit('SET_AREA', 'Низкий');
      }
    }
  }