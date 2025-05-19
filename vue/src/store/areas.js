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
      checkArea:({ commit, rootGetters }) => {
        const { x = 0, y = 0 } = rootGetters['movement/getPos'] || {};
        const zones = [
          { x: 290,  y: 213,  r: 50,  level: 'Высокий' },
          { x: 960,  y: 446,  r: 50,  level: 'Высокий' },
          { x: 843,  y: 1,    r: 150, level: 'Средний' },
          { x: 668,  y: 350,  r: 150, level: 'Средний' },
          { x: -213, y: 109,  r: 150, level: 'Средний' }
        ];
        const activeZone = zones.find(({ x: zx, y: zy, r }) => 
          Math.pow(x - zx, 2) + Math.pow(y - zy, 2) < Math.pow(r, 2)
        );
        commit('SET_AREA', activeZone?.level || 'Низкий');
      }
    }
  }