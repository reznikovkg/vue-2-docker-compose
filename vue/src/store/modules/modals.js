const state = {
    modals: [],
    zIndex: 1000,
    isBodyLocked: false
};

const getters = {
    activeModals: (state) => state.modals,
    topModal: (state) => state.modals.length > 0
        ? state.modals[state.modals.length - 1]
        : null,
    isBodyLocked: (state) => state.isBodyLocked,
    getModalByName: (state) => (name) =>
        state.modals.find(modal => modal.name === name)
};

const mutations = {
    OPEN_MODAL(state, modal) {
        const zIndex = state.zIndex + state.modals.length + 1;

        state.modals.push({
            name: modal.name,
            component: modal.component,
            props: {
                ...modal.props,
                zIndex
            },
            id: `modal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            createdAt: new Date().toISOString()
        });

        if (state.modals.length === 1) {
            state.isBodyLocked = true;
            document.body.style.overflow = 'hidden';
        }
    },

    CLOSE_MODAL(state, modalName) {
        const index = state.modals.findIndex(m => m.name === modalName);
        if (index !== -1) {
            state.modals.splice(index, 1);

            if (state.modals.length === 0) {
                state.isBodyLocked = false;
                document.body.style.overflow = '';
            }
        }
    },

    CLOSE_ALL_MODALS(state) {
        state.modals = [];
        state.isBodyLocked = false;
        document.body.style.overflow = '';
    },

    UPDATE_MODAL_PROPS(state, { modalName, props }) {
        const modal = state.modals.find(m => m.name === modalName);
        if (modal) {
            modal.props = {
                ...modal.props,
                ...props
            };
        }
    }
};

const actions = {
    openModal({ commit, state }, modal) {
        if (!state.modals.some(m => m.name === modal.name)) {
            commit('OPEN_MODAL', modal);
        }
    },

    closeModal({ commit }, modalName) {
        commit('CLOSE_MODAL', modalName);
    },

    closeAllModals({ commit }) {
        commit('CLOSE_ALL_MODALS');
    },

    updateModalProps({ commit }, payload) {
        commit('UPDATE_MODAL_PROPS', payload);
    },

    openPrivacyModal({ dispatch }) {
        dispatch('openModal', {
            name: 'privacy-settings',
            component: 'AgreementModal',
            props: {
                persistent: false
            }
        });
    },

    showAlert({ dispatch }, { title, message }) {
        dispatch('openModal', {
            name: 'alert',
            component: 'AlertModal',
            props: { title, message }
        });
    },

    showConfirm({ dispatch }, { title, message, onConfirm }) {
        dispatch('openModal', {
            name: 'confirm',
            component: 'ConfirmModal',
            props: { title, message, onConfirm }
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