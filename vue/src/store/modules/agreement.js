import Vue from 'vue';
import agreementConfig from '@/config/agreement.json';
import { getStorageItem, setStorageItem } from '@/utils/storage.js';

const STORAGE_KEY = 'agreement_settings';

const state = {
    config: agreementConfig,
    settings: {},
    initialized: false,
    modalVisible: false,
    firstVisit: true,
    newFields: [],
    pendingChanges: false
};

const getters = {
    getConfig: state => state.config,
    getSettings: state => state.settings,
    isInitialized: state => state.initialized,
    getSetting: state => (sectionId, itemId) => {
        return state.settings[sectionId]?.[itemId] ??
            state.config.sections
                .find(s => s.id === sectionId)?.items
                .find(i => i.id === itemId)?.enabled ?? false;
    },
    isSectionRequired: state => sectionId => {
        return state.config.sections.find(s => s.id === sectionId)?.required ?? false;
    },
    shouldShowModal: state => {
        return (state.firstVisit && state.config.modal.showOnFirstVisit) ||
            state.modalVisible ||
            state.newFields.length > 0;
    },
    getModalVisibility: state => state.modalVisible,
    isFirstVisit: state => state.firstVisit,
    getNewFields: state => state.newFields,
    hasNewFields: state => state.newFields.length > 0,
    hasPendingChanges: state => state.pendingChanges,
    isNewSection: state => sectionId => {
        return state.newFields.some(f => f.type === 'section' && f.id === sectionId);
    },
    isNewItem: state => (sectionId, itemId) => {
        return state.newFields.some(f =>
            f.type === 'item' && f.sectionId === sectionId && f.id === itemId
        );
    }
};

const mutations = {
    INITIALIZE(state, savedData) {
        if (savedData) {
            const { newFields, configChanged } = checkConfigChanges(savedData.config, state.config);

            state.newFields = newFields;
            state.settings = mergeSettings(savedData.settings, state.config);
            state.firstVisit = false;

            if (configChanged) {
                state.pendingChanges = true;
            }
        } else {
            state.settings = initializeDefaultSettings(state.config);
            state.firstVisit = true;
        }
        state.initialized = true;
    },

    TOGGLE_SETTING(state, { sectionId, itemId, value }) {
        if (!state.settings[sectionId]) {
            Vue.set(state.settings, sectionId, {});
        }
        Vue.set(state.settings[sectionId], itemId, value);
        state.pendingChanges = true;
    },

    ACCEPT_ALL(state) {
        state.settings = initializeDefaultSettings(state.config, true);
        state.newFields = [];
        state.pendingChanges = true;
    },

    REJECT_ALL(state) {
        state.settings = initializeDefaultSettings(state.config, false);
        state.newFields = [];
        state.pendingChanges = true;
    },

    SAVE_SETTINGS(state) {
        setStorageItem(STORAGE_KEY, {
            settings: state.settings,
            config: state.config,
            version: state.config.version
        });
        state.firstVisit = false;
        state.modalVisible = false;
        state.newFields = [];
        state.pendingChanges = false;
    },

    SET_MODAL_VISIBILITY(state, visible) {
        state.modalVisible = visible;
    },

    UPDATE_CONFIG(state, newConfig) {
        if (JSON.stringify(state.config) !== JSON.stringify(newConfig)) {
            state.config = newConfig;
            state.pendingChanges = true;
        }
    },

    RESET_PENDING_CHANGES(state) {
        state.pendingChanges = false;
    },
    SET_NEW_FIELDS(state, newFields) {
        state.newFields = newFields;
        state.modalVisible = true;
    }
};

const actions = {
    initialize({ commit }) {
        const savedData = getStorageItem(STORAGE_KEY);
        commit('INITIALIZE', savedData);
    },

    toggleSetting({ commit, getters }, { sectionId, itemId, value }) {
        if (getters.isSectionRequired(sectionId)) return;

        const section = getters.getConfig.sections.find(s => s.id === sectionId);
        if (!section) return;

        const item = section.items.find(i => i.id === itemId);
        if (!item || item.immutable) return;

        commit('TOGGLE_SETTING', { sectionId, itemId, value });
    },

    async acceptAll({ commit }) {
        commit('ACCEPT_ALL');
        //await dispatch('saveSettings');
    },

    async rejectAll({ commit }) {
        commit('REJECT_ALL');
        //await dispatch('saveSettings');
    },

    async saveSettings({ commit }) {
        commit('SAVE_SETTINGS');
    },

    showModal({ commit, dispatch }) {
        commit('SET_MODAL_VISIBILITY', true);
        dispatch('modals/openPrivacyModal', null, { root: true });
    },

    hideModal({ commit, dispatch }) {
        commit('SET_MODAL_VISIBILITY', false);
        dispatch('modals/closeModal', 'privacy-settings', { root: true });
    },

    updateConfig({ commit }, newConfig) {
        commit('UPDATE_CONFIG', newConfig);
    },

    resetPendingChanges({ commit }) {
        commit('RESET_PENDING_CHANGES');
    },

    async openPrivacySettings({ commit, dispatch, getters }) {
        const savedData = getStorageItem(STORAGE_KEY);

        if (savedData) {
            const { newFields } = checkConfigChanges(savedData.config, getters.getConfig);
            if (newFields.length > 0) {
                commit('SET_NEW_FIELDS', newFields);
            }
        }

        commit('SET_MODAL_VISIBILITY', true);

        try {
            await dispatch('modals/openModal', {
                name: 'privacy-settings',
                component: 'AgreementModal',
                props: {
                    forceShow: true
                }
            }, { root: true });
        } catch (error) {
            console.error('Failed to open modal:', error);
        }
    },
};

function checkConfigChanges(oldConfig, newConfig) {
    const newFields = [];
    let configChanged = false;

    if (oldConfig.version !== newConfig.version) {
        configChanged = true;
    }

    newConfig.sections.forEach(newSection => {
        const oldSection = oldConfig.sections.find(s => s.id === newSection.id);

        if (!oldSection) {
            newFields.push({ type: 'section', id: newSection.id });
            configChanged = true;
        } else {
            newSection.items.forEach(newItem => {
                if (!oldSection.items.some(i => i.id === newItem.id)) {
                    newFields.push({
                        type: 'item',
                        id: newItem.id,
                        sectionId: newSection.id
                    });
                    configChanged = true;
                }
            });
        }
    });

    return { newFields, configChanged };
}

function mergeSettings(oldSettings, newConfig) {
    const settings = {};

    newConfig.sections.forEach(section => {
        settings[section.id] = {};

        section.items.forEach(item => {
            const oldValue = oldSettings[section.id]?.[item.id];
            settings[section.id][item.id] = oldValue !== undefined ? oldValue : item.enabled;
        });
    });

    return settings;
}

function initializeDefaultSettings(config, acceptAll = false) {
    return config.sections.reduce((acc, section) => {
        acc[section.id] = section.items.reduce((sectionAcc, item) => {
            sectionAcc[item.id] = acceptAll ? true : (section.required || item.enabled);
            return sectionAcc;
        }, {});
        return acc;
    }, {});
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};