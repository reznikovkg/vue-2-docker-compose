import Vue from 'vue';
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
    getConfig: (state) => state.config,
    getSettings: (state) => state.settings,
    isInitialized: (state) => state.initialized,
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
    },
    getModalVisibility: (state) => state.modalVisible,
    isFirstVisit: (state) => state.firstVisit
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
                    sectionAcc[item.id] = item.enabled || false;
                    return sectionAcc;
                }, {});
                return acc;
            }, {});
        }
        state.initialized = true;
    },

    TOGGLE_SETTING(state, { sectionId, itemId, value }) {
        if (!state.settings[sectionId]) {
            Vue.set(state.settings, sectionId, {});
        }
        Vue.set(state.settings[sectionId], itemId, value);
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
                sectionAcc[item.id] = section.required;
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

    SET_MODAL_VISIBILITY(state, visible) {
        state.modalVisible = visible;
    }
};

const actions = {
    initialize({ commit }) {
        commit('INITIALIZE');
    },

    toggleSetting({ commit, getters }, { sectionId, itemId, value }) {
        if (getters.isSectionRequired(sectionId)) return;

        const section = getters.getConfig.sections.find(s => s.id === sectionId);
        if (!section) return;

        const item = section.items.find(i => i.id === itemId);
        if (!item || item.immutable) return;

        commit('TOGGLE_SETTING', { sectionId, itemId, value });
    },

    acceptAll({ commit }) {
        commit('ACCEPT_ALL');
        //commit('SAVE_SETTINGS');
    },

    rejectAll({ commit }) {
        commit('REJECT_ALL');
        //commit('SAVE_SETTINGS');
    },

    saveSettings({ commit }) {
        commit('SAVE_SETTINGS');
    },

    showModal({ commit }) {
        commit('SET_MODAL_VISIBILITY', true);
    },

    hideModal({ commit }) {
        commit('SET_MODAL_VISIBILITY', false);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};