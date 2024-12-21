export default {
    namespaced: true,
    state: {
        blocks: [],
        connections: [],
        size: 100,
        defaultSize: 100,
        view: {
            top: 0,
            left: 0,
        },
    },
    getters: {
        getBlocks: (state) => {
            const view = state.view; // потому что вью тупой и не видит что геттер зависит от стейта view
            return state.blocks.map((block) => ({
                ...block,
                top: block.top - view.top,
                left: block.left - view.left,
            }));
        },
        getBlock: (state) => (id) => {
            const view = state.view; // потому что вью тупой и не видит что геттер зависит от стейта view

            const block = state.blocks.find((block) => block.id == id);

            return {
                ...block,
                top: block.top - view.top,
                left: block.left - view.left,
            };
        },
        getConnections: (state) => state.connections,
        getSize: (state) => state.size,
        getDefaultSize: (state) => state.defaultSize,
    },
    mutations: {
        ADD_ITEM_TO_BLOCKS: (state, { blockData }) => {
            state.blocks.push({
                id: Date.now(),
                ...blockData,
                top: state.view.top,
                left: state.view.left,
                selected: false,
            });
        },
        CHANGE_BLOCK: (state, { id, newBlockData }) => {
            const currentBlock = state.blocks.find((block) => block.id === id);

            if (currentBlock.selected) {
                const changeX = currentBlock.left - newBlockData.left,
                    changeY = currentBlock.top - newBlockData.top;

                state.blocks = state.blocks.map((elem) => {
                    if (elem.selected) {
                        return {
                            id,
                            ...elem,
                            left: state.view.left + elem.left - changeX,
                            top: state.view.top + elem.top - changeY,
                        };
                    }

                    return elem;
                });
            } else {
                state.blocks = state.blocks.map((elem) => {
                    if (elem.id == id) {
                        return {
                            id,
                            ...elem,
                            left: state.view.left + newBlockData.left,
                            top: state.view.top + newBlockData.top,
                        };
                    }
                    return elem;
                });
            }
        },
        ADD_CONNECTION: (state, connection) => {
            state.connections.push({ id: Date.now(), ...connection });
        },
        SELECT_BLOCK_BY_AREA: (state, areaInfo) => {
            state.blocks = state.blocks.map((block) =>
                block.left + state.size > state.view.left + areaInfo.left &&
                block.left <=
                    state.view.left + areaInfo.left + areaInfo.width &&
                block.top + state.size > state.view.top + areaInfo.top &&
                block.top <= state.view.top + areaInfo.top + areaInfo.height
                    ? { ...block, selected: true }
                    : block
            );
        },
        CLEAR_SELECTION: (state) => {
            state.blocks = state.blocks.map((block) => ({
                ...block,
                selected: false,
            }));
        },
        CHANGE_SIZE: (state, { scale, coords }) => {
            if (state.size * (1 + scale) < 50) return;

            const oldSize = state.size;

            state.size = state.size * (1 + scale);

            const scaleFactor = state.size / oldSize;

            const globalCoords = {
                top: coords.top + state.view.top,
                left: coords.left + state.view.left,
            };

            state.blocks = state.blocks.map((block) => {
                const deltaX = block.left - globalCoords.left;
                const deltaY = block.top - globalCoords.top;

                return {
                    ...block,
                    left: globalCoords.left + deltaX * scaleFactor,
                    top: globalCoords.top + deltaY * scaleFactor,
                };
            });
        },
        CHANGE_VIEW: (state, coordinates) => {
            state.view.top -= coordinates.top;
            state.view.left -= coordinates.left;
        },
    },
    actions: {
        addItemToBlocks({ commit }, blockData) {
            commit('ADD_ITEM_TO_BLOCKS', { blockData });
        },
        changeBlockById({ commit }, { id, newBlockData }) {
            commit('CHANGE_BLOCK', { id, newBlockData });
        },
        addConnection({ commit }, connection) {
            commit('ADD_CONNECTION', connection);
        },
        chooseBlockByArea({ commit }, areaInfo) {
            commit('SELECT_BLOCK_BY_AREA', areaInfo);
        },
        clearSelection({ commit }) {
            commit('CLEAR_SELECTION');
        },
        changeSize({ commit }, scale) {
            commit('CHANGE_SIZE', scale);
        },
        changeView({ commit }, scale) {
            commit('CHANGE_VIEW', scale);
        },
    },
};
