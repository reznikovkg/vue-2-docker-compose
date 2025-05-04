export default {
    namespaced: true,
    state: {
      pos: JSON.parse(localStorage.getItem('shipPos')) || { x: 0, y: 0 },
      step: 1,
      bounds: {
        left: -391,
        right: 1076,
        top: -231,
        bottom: 555
      },
      shipSize: { width: 1, height: 1 }, 
      keys: {}
    },
    getters: {
      getPos: (state) => state.pos,
    },
    mutations: {
      SET_POS(state, { x, y }) {
        state.pos = { x, y };
      },
      SET_KEY(state, {  key, value }) {
        state.keys[key] = value;
      },
      UPDATE_POSITION(state) {
        let dx = 0, dy = 0;
        if (state.keys['w']) dy -= state.step;
        if (state.keys['s']) dy += state.step;
        if (state.keys['a']) dx -= state.step;
        if (state.keys['d']) dx += state.step;
        if (state.keys['r']) {
          localStorage.clear();
          state.pos = { x: 325, y: 137 }; 
          return;
        }
        state.pos.x = Math.max(state.bounds.left,Math.min(state.pos.x + dx,state.bounds.right - state.shipSize.width));
        state.pos.y = Math.max(state.bounds.top,Math.min(state.pos.y + dy,state.bounds.bottom - state.shipSize.height));
        localStorage.setItem('shipPos', JSON.stringify(state.pos));
      }
    },
    actions: {
      init({commit}) {
        const savedPos = localStorage.getItem('shipPos');
        if (savedPos) {
          commit('SET_POS', JSON.parse(savedPos));
        }
        const handleKey = (isPressed) => (e) => {
          if (['w', 's', 'a', 'd','r'].includes(e.key)) {
            commit('SET_KEY', { key: e.key, value: isPressed });
          }
        };
        window.addEventListener('keydown', handleKey(true));
        window.addEventListener('keyup', handleKey(false));
        const update = () => {
          commit('UPDATE_POSITION');
          requestAnimationFrame(update);
        };
        update();
      },
    }
  };
