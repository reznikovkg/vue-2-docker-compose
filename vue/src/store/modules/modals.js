const state = {
    modals: []
};

const getters = {
    activeModals: (state) => state.modals
};

const mutations = {
    OPEN_MODAL(state, modal) {
        state.modals.push({
            name: modal.name,
            component: modal.component,
            props: modal.props || {}
        });
    },

    CLOSE_MODAL(state, modalName) {
        state.modals = state.modals.filter(m => m.name !== modalName);
    }
};

const actions = {
    openModal({ commit }, modal) {
        commit('OPEN_MODAL', modal);
    },

    closeModal({ commit }, modalName) {
        commit('CLOSE_MODAL', modalName);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};