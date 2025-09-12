// store/modules/explorer.js
const state = {
    fileSystem: {
        id: 'root',
        name: 'My Files',
        type: 'folder',
        path: '/',
        children: [
            {
                id: 'docs',
                name: 'Documents',
                type: 'folder',
                path: '/Documents',
                children: [
                    {
                        id: 'doc1',
                        name: 'report.pdf',
                        type: 'file',
                        size: '2.4 MB',
                        path: '/Documents/report.pdf',
                        content: 'This is a sample PDF report content.',
                        blobType: 'application/pdf',
                        position: { x: 0, y: 0 }
                    },
                    {
                        id: 'doc2',
                        name: 'notes.txt',
                        type: 'file',
                        size: '15 KB',
                        path: '/Documents/notes.txt',
                        content: 'These are important notes.\nLine 1\nLine 2\nLine 3',
                        blobType: 'text/plain',
                        position: { x: 0, y: 0 }
                    }
                ]
            },
            {
                id: 'images',
                name: 'Images',
                type: 'folder',
                path: '/Images',
                children: [
                    {
                        id: 'img1',
                        name: 'photo.jpg',
                        type: 'file',
                        size: '3.2 MB',
                        path: '/Images/photo.jpg',
                        content: 'Sample image content would be here',
                        blobType: 'image/jpeg',
                        position: { x: 0, y: 0 }
                    },
                    {
                        id: 'img2',
                        name: 'screenshot.png',
                        type: 'file',
                        size: '1.1 MB',
                        path: '/Images/screenshot.png',
                        content: 'Sample screenshot content',
                        blobType: 'image/png',
                        position: { x: 0, y: 0 }
                    }
                ]
            },
            {
                id: 'readme',
                name: 'README.md',
                type: 'file',
                size: '8 KB',
                path: '/README.md',
                content: '# Welcome to File Explorer\n\nThis is a sample readme file.',
                blobType: 'text/markdown',
                position: { x: 0, y: 0 }
            }
        ]
    },
    viewMode: 'grid',
    selectedItems: [],
    dragItem: null,
    currentPath: '/',
    freeGridPositions: {}
}

const getters = {
    getFileSystem: state => state.fileSystem,
    getViewMode: state => state.viewMode,
    getSelectedItems: state => state.selectedItems,
    getDragItem: state => state.dragItem,
    getCurrentPath: state => state.currentPath,
    getFreeGridPositions: state => state.freeGridPositions,
    getCurrentFolder: (state) => {
        const findFolder = (node, path) => {
            if (node.path === path) return node
            if (node.children) {
                for (const child of node.children) {
                    const found = findFolder(child, path)
                    if (found) return found
                }
            }
            return null
        }
        return findFolder(state.fileSystem, state.currentPath)
    }
}

const mutations = {
    SET_VIEW_MODE: (state, mode) => {
        state.viewMode = mode
    },
    SET_SELECTED_ITEMS: (state, items) => {
        state.selectedItems = items
    },
    SET_DRAG_ITEM: (state, item) => {
        state.dragItem = item
    },
    SET_CURRENT_PATH: (state, path) => {
        state.currentPath = path
    },
    SET_FREE_GRID_POSITION: (state, { itemId, position }) => {
        state.freeGridPositions = {
            ...state.freeGridPositions,
            [itemId]: position
        }
    },
    ADD_ITEM: (state, { parentPath, item }) => {
        const addToFolder = (node) => {
            if (node.path === parentPath && node.type === 'folder') {
                if (!node.children) node.children = []
                node.children.push(item)
                return true
            }
            if (node.children) {
                for (const child of node.children) {
                    if (addToFolder(child)) return true
                }
            }
            return false
        }
        addToFolder(state.fileSystem)
    },
    MOVE_ITEM: (state, { fromPath, toPath }) => {
        let itemToMove = null

        // Функция для поиска и удаления элемента
        const removeFromFolder = (node) => {
            if (node.children) {
                const index = node.children.findIndex(child => child.path === fromPath)
                if (index !== -1) {
                    itemToMove = { ...node.children[index] }
                    node.children.splice(index, 1)
                    return true
                }
                for (const child of node.children) {
                    if (removeFromFolder(child)) return true
                }
            }
            return false
        }

        // Функция для обновления путей вложенных элементов
        const updateItemPaths = (item, newBasePath) => {
            const oldPath = item.path
            item.path = newBasePath === '/' ? `/${item.name}` : `${newBasePath}/${item.name}`

            if (item.children) {
                item.children.forEach(child => {
                    const childOldPath = child.path
                    const relativePath = childOldPath.replace(oldPath, '')
                    updateItemPaths(child, item.path + relativePath)
                })
            }
        }

        // Функция для добавления элемента
        const addToFolder = (node) => {
            if (node.path === toPath && node.type === 'folder') {
                if (!node.children) node.children = []

                // Проверяем, нет ли элемента с таким же именем
                const nameExists = node.children.some(child =>
                    child.name.toLowerCase() === itemToMove.name.toLowerCase()
                )

                if (nameExists) {
                    throw new Error('Item with the same name already exists')
                }

                // Обновляем пути
                updateItemPaths(itemToMove, toPath)
                node.children.push(itemToMove)
                return true
            }
            if (node.children) {
                for (const child of node.children) {
                    if (addToFolder(child)) return true
                }
            }
            return false
        }

        // Выполняем перемещение
        removeFromFolder(state.fileSystem)
        if (itemToMove) {
            try {
                addToFolder(state.fileSystem)
            } catch (error) {
                // Если ошибка (дубликат имени), возвращаем элемент обратно
                const originalParentPath = fromPath.split('/').slice(0, -1).join('/') || '/'
                const addBack = (node) => {
                    if (node.path === originalParentPath && node.type === 'folder') {
                        node.children.push(itemToMove)
                        return true
                    }
                    if (node.children) {
                        for (const child of node.children) {
                            if (addBack(child)) return true
                        }
                    }
                    return false
                }
                addBack(state.fileSystem)
                throw error
            }
        }
    },
    DELETE_ITEM: (state, path) => {
        const deleteFromFolder = (node) => {
            if (node.children) {
                const index = node.children.findIndex(child => child.path === path)
                if (index !== -1) {
                    node.children.splice(index, 1)
                    return true
                }
                for (const child of node.children) {
                    if (deleteFromFolder(child)) return true
                }
            }
            return false
        }
        deleteFromFolder(state.fileSystem)
    },
    UPDATE_STRUCTURE: (state, newStructure) => {
        state.fileSystem = newStructure
    }
}

const actions = {
    updateViewMode: ({ commit }, mode) => {
        commit('SET_VIEW_MODE', mode)
    },
    selectItems: ({ commit }, items) => {
        commit('SET_SELECTED_ITEMS', items)
    },
    startDrag: ({ commit }, item) => {
        commit('SET_DRAG_ITEM', item)
    },
    endDrag: ({ commit }) => {
        commit('SET_DRAG_ITEM', null)
    },
    navigateTo: ({ commit }, path) => {
        commit('SET_CURRENT_PATH', path)
    },
    navigateUp: ({ commit, state }) => {
        if (state.currentPath !== '/') {
            const parentPath = state.currentPath.substring(0, state.currentPath.lastIndexOf('/'))
            commit('SET_CURRENT_PATH', parentPath || '/')
        }
    },
    updateFreeGridPosition: ({ commit }, { itemId, position }) => {
        commit('SET_FREE_GRID_POSITION', { itemId, position })
    },
    performDrop: ({ commit}, { fromPath, toPath }) => {
        try {
            commit('MOVE_ITEM', { fromPath, toPath })
            // Сбрасываем выделение после перемещения
            commit('SET_SELECTED_ITEMS', [])
        } catch (error) {
            alert(error.message || 'Error moving item')
        }
    },
    createNewFolder: ({ commit, state, getters }, folderName) => {
        // Проверяем, нет ли уже папки с таким именем
        const currentFolder = getters.getCurrentFolder
        const folderExists = currentFolder.children.some(
            item => item.name.toLowerCase() === folderName.toLowerCase() && item.type === 'folder'
        )

        if (folderExists) {
            throw new Error('A folder with this name already exists')
        }

        const newFolder = {
            id: 'folder-' + Date.now() + Math.random().toString(36).substr(2, 9),
            name: folderName,
            type: 'folder',
            path: state.currentPath === '/' ? `/${folderName}` : `${state.currentPath}/${folderName}`,
            children: [],
            position: { x: Math.random() * 300, y: Math.random() * 200 }
        }

        commit('ADD_ITEM', {
            parentPath: state.currentPath,
            item: newFolder
        })
    },
    deleteSelected: ({ commit, state }) => {
        state.selectedItems.forEach(item => {
            commit('DELETE_ITEM', item.path)
        })
        commit('SET_SELECTED_ITEMS', [])
    },
    formatFileSize: (context, bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}