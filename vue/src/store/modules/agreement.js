import agreementConfig from '@/config/agreementConfig.js';
import { getStorageItem, setStorageItem } from '@/utils/storage.js';

const STORAGE_KEY = 'agreement_settings';

const state = {
    config: agreementConfig,
    settings: {},
    initialized: false,
    modalVisible: false,
    firstVisit: true
};

const getters = {
    getSetting: (state) => (sectionId, itemId) => {
        return state.settings[sectionId]?.[itemId] ??
            state.config.sections
                .find(s => s.id === sectionId)?.items
                .find(i => i.id === itemId)?.enabled ?? false;
    },
    isSectionRequired: (state) => (sectionId) => {
        return state.config.sections.find(s => s.id === sectionId)?.required ?? false;
    },
    shouldShowModal: (state) => {
        return (state.firstVisit && state.config.modal.showOnFirstVisit) || state.modalVisible;
    }
};

const mutations = {
    INITIALIZE(state) {
        const savedSettings = getStorageItem(STORAGE_KEY);

        if (savedSettings) {
            state.settings = savedSettings;
            state.firstVisit = false;
        } else {
            state.settings = state.config.sections.reduce((acc, section) => {
                acc[section.id] = section.items.reduce((sectionAcc, item) => {
                    sectionAcc[item.id] = item.enabled;
                    return sectionAcc;
                }, {});
                return acc;
            }, {});
        }

        state.initialized = true;
    },

    TOGGLE_SETTING(state, { sectionId, itemId, value }) {
        if (!state.settings[sectionId]) {
            state.settings[sectionId] = {};
        }
        state.settings[sectionId][itemId] = value;
    },

    ACCEPT_ALL(state) {
        state.settings = state.config.sections.reduce((acc, section) => {
            acc[section.id] = section.items.reduce((sectionAcc, item) => {
                sectionAcc[item.id] = true;
                return sectionAcc;
            }, {});
            return acc;
        }, {});
    },

    REJECT_ALL(state) {
        state.settings = state.config.sections.reduce((acc, section) => {
            acc[section.id] = section.items.reduce((sectionAcc, item) => {
                sectionAcc[item.id] = section.required ? true : false;
                return sectionAcc;
            }, {});
            return acc;
        }, {});
    },

    SAVE_SETTINGS(state) {
        setStorageItem(STORAGE_KEY, state.settings);
        state.firstVisit = false;
        state.modalVisible = false;
    },

    SHOW_MODAL(state) {
        state.modalVisible = true;
    },

    HIDE_MODAL(state) {
        state.modalVisible = false;
    }
};

const actions = {
    initialize({ commit }) {
        commit('INITIALIZE');
    },

    toggleSetting({ commit, state }, { sectionId, itemId, value }) {
        const section = state.config.sections.find(s => s.id === sectionId);
        if (!section) return;

        const item = section.items.find(i => i.id === itemId);
        if (!item || item.immutable) return;

        commit('TOGGLE_SETTING', { sectionId, itemId, value });
    },

    acceptAll({ commit }) {
        commit('ACCEPT_ALL');
    },

    rejectAll({ commit }) {
        commit('REJECT_ALL');
    },

    saveSettings({ commit }) {
        commit('SAVE_SETTINGS');
    },

    showModal({ commit }) {
        commit('SHOW_MODAL');
    },

    hideModal({ commit }) {
        commit('HIDE_MODAL');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};