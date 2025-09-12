<template>
  <PageLayout>
    <div class="explorer-header">
      <h1 class="explorer__head">File Explorer</h1>
      <button class="home-button" @click="goHome">← Home</button>
    </div>

    <div class="explorer">
      <!-- Navigation -->
      <div class="explorer__nav">
        <button
            class="explorer__nav-button"
            @click="navigateUp"
            :disabled="currentPath === '/'"
        >
          ↑ Up
        </button>
        <span class="explorer__path">{{ currentPath }}</span>
      </div>

      <!-- Toolbar -->
      <div class="explorer__toolbar">
        <div class="toolbar-left">
          <button
              class="explorer__view-button"
              :class="{ active: viewMode === 'grid' }"
              @click="setViewMode('grid')"
          >
            Grid
          </button>
          <button
              class="explorer__view-button"
              :class="{ active: viewMode === 'list' }"
              @click="setViewMode('list')"
          >
            List
          </button>
          <button
              class="explorer__view-button"
              :class="{ active: viewMode === 'free-grid' }"
              @click="setViewMode('free-grid')"
          >
            Free Grid
          </button>
        </div>

        <div class="toolbar-right">
          <button
              class="explorer__action-button"
              @click="handleCreateNewFolder"
          >
            New Folder
          </button>
          <button
              class="explorer__action-button danger"
              @click="deleteSelected"
              :disabled="selectedItems.length === 0"
          >
            Delete
          </button>
          <button
              class="explorer__action-button success"
              @click="downloadSelected"
              :disabled="selectedItems.length === 0 || !isFileSelected"
          >
            Download
          </button>
        </div>
      </div>

      <!-- Content -->
      <div
          class="explorer__content"
          :class="'explorer__content--' + viewMode"
          @dragover.prevent
          @drop="onContentDrop"
      >
        <!-- Grid View -->
        <div v-if="viewMode === 'grid'" class="grid-view">
          <div
              v-for="item in currentFolderChildren"
              :key="item.id"
              class="grid-item"
              :class="{
                selected: isSelected(item),
                'is-folder': item.type === 'folder',
                'is-dragover': isDragOverTarget(item),
                'can-drop': canDropToItem(item)
              }"
              draggable="true"
              @dragstart="onDragStart(item, $event)"
              @dragover.prevent="onItemDragOver(item, $event)"
              @dragleave="onItemDragLeave(item)"
              @drop="onItemDrop(item, $event)"
              @dragend="onDragEnd"
              @click="onItemClick(item, $event)"
              @dblclick="onItemDoubleClick(item)"
          >
            <div class="grid-item__icon">
              {{ item.type === 'folder' ? '📁' : getFileIcon(item.name) }}
            </div>
            <div class="grid-item__name">{{ item.name }}</div>
            <div v-if="item.type === 'file'" class="grid-item__size">{{ item.size }}</div>
          </div>
        </div>

        <!-- List View -->
        <div v-else-if="viewMode === 'list'" class="list-view">
          <div class="list-header">
            <div class="list-header__name">Name</div>
            <div class="list-header__type">Type</div>
            <div class="list-header__size">Size</div>
          </div>
          <div
              v-for="item in currentFolderChildren"
              :key="item.id"
              class="list-item"
              :class="{
                selected: isSelected(item),
                'is-folder': item.type === 'folder',
                'is-dragover': isDragOverTarget(item),
                'can-drop': canDropToItem(item)
              }"
              draggable="true"
              @dragstart="onDragStart(item, $event)"
              @dragover.prevent="onItemDragOver(item, $event)"
              @dragleave="onItemDragLeave(item)"
              @drop="onItemDrop(item, $event)"
              @dragend="onDragEnd"
              @click="onItemClick(item, $event)"
              @dblclick="onItemDoubleClick(item)"
          >
            <div class="list-item__icon">
              {{ item.type === 'folder' ? '📁' : getFileIcon(item.name) }}
            </div>
            <div class="list-item__name">{{ item.name }}</div>
            <div class="list-item__type">{{ item.type === 'folder' ? 'Folder' : 'File' }}</div>
            <div class="list-item__size">{{ item.size || '-' }}</div>
          </div>
        </div>

        <!-- Free Grid View -->
        <div v-else-if="viewMode === 'free-grid'" class="free-grid-view">
          <div
              v-for="item in currentFolderChildren"
              :key="item.id"
              class="free-grid-item"
              :class="{
                selected: isSelected(item),
                'is-folder': item.type === 'folder',
                'is-dragover': isDragOverTarget(item),
                'can-drop': canDropToItem(item)
              }"
              :style="getFreeGridItemStyle(item)"
              draggable="true"
              @dragstart="onFreeGridDragStart(item, $event)"
              @dragover.prevent="onItemDragOver(item, $event)"
              @dragleave="onItemDragLeave(item)"
              @drop="onItemDrop(item, $event)"
              @drag="onFreeGridDrag(item, $event)"
              @dragend="onFreeGridDragEnd()"
              @click="onItemClick(item, $event)"
              @dblclick="onItemDoubleClick(item)"
          >
            <div class="free-grid-item__icon">
              {{ item.type === 'folder' ? '📁' : getFileIcon(item.name) }}
            </div>
            <div class="free-grid-item__name">{{ item.name }}</div>
            <div v-if="item.type === 'file'" class="free-grid-item__size">{{ item.size }}</div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="currentFolderChildren.length === 0" class="explorer__empty">
          This folder is empty. Create folders to get started.
        </div>
      </div>

      <!-- Status -->
      <div class="explorer__status">
        {{ selectedItems.length }} item(s) selected •
        {{ currentFolderChildren.length }} item(s) total •
        View: {{ viewMode }}
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'FileExplorer',
  components: {
    PageLayout
  },
  data() {
    return {
      freeGridDragOffset: null,
      isFreeGridDragging: false,
      dragOverTarget: null
    }
  },
  computed: {
    ...mapGetters('explorer', [
      'getViewMode',
      'getSelectedItems',
      'getCurrentPath',
      'getCurrentFolder',
      'getFreeGridPositions',
      'getDragItem'
    ]),
    viewMode() {
      return this.getViewMode
    },
    selectedItems() {
      return this.getSelectedItems
    },
    currentPath() {
      return this.getCurrentPath
    },
    currentFolder() {
      return this.getCurrentFolder
    },
    currentFolderChildren() {
      return this.currentFolder?.children || []
    },
    isFileSelected() {
      return this.selectedItems.some(item => item.type === 'file')
    },
    dragItem() {
      return this.getDragItem
    }
  },
  methods: {
    ...mapActions('explorer', [
      'updateViewMode',
      'selectItems',
      'startDrag',
      'endDrag',
      'navigateTo',
      'navigateUp',
      'updateFreeGridPosition',
      'performDrop',
      'deleteSelected'
    ]),

    goHome() {
      this.$router.push({ name: 'HOME' })
    },

    setViewMode(mode) {
      this.updateViewMode(mode)
    },

    onDragStart(item, event) {
      this.startDrag(item)
      event.dataTransfer.setData('text/plain', item.path)
      event.dataTransfer.effectAllowed = 'move'
    },

    onDragEnd() {
      this.dragOverTarget = null
      this.endDrag()
    },

    onItemDragOver(item, event) {
      if (this.canDropToItem(item)) {
        event.dataTransfer.dropEffect = 'move'
        this.dragOverTarget = item
      } else {
        event.dataTransfer.dropEffect = 'none'
      }
    },

    onItemDragLeave(item) {
      if (this.dragOverTarget === item) {
        this.dragOverTarget = null
      }
    },

    onItemDrop(targetItem, event) {
      event.preventDefault()
      if (this.canDropToItem(targetItem)) {
        this.performDrop({
          fromPath: this.dragItem.path,
          toPath: targetItem.path
        })
      }
      this.dragOverTarget = null
    },

    canDropToItem(targetItem) {
      return this.dragItem &&
          targetItem.type === 'folder' &&
          this.dragItem.path !== targetItem.path &&
          !this.isItemDescendant(this.dragItem, targetItem)
    },

    isItemDescendant(item, potentialParent) {
      if (item.path === potentialParent.path) return true
      if (item.type === 'folder' && item.children) {
        return item.children.some(child =>
            this.isItemDescendant(child, potentialParent)
        )
      }
      return false
    },

    isDragOverTarget(item) {
      return this.dragOverTarget === item && this.canDropToItem(item)
    },

    onFreeGridDragStart(item, event) {
      this.isFreeGridDragging = true
      this.startDrag(item)

      const rect = event.target.getBoundingClientRect()
      this.freeGridDragOffset = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }

      event.dataTransfer.setData('text/plain', item.path)
      event.dataTransfer.effectAllowed = 'move'
    },

    onFreeGridDrag(item, event) {
      if (this.isFreeGridDragging && this.freeGridDragOffset) {
        const containerRect = this.$el.querySelector('.free-grid-view').getBoundingClientRect()
        const newX = event.clientX - containerRect.left - this.freeGridDragOffset.x
        const newY = event.clientY - containerRect.top - this.freeGridDragOffset.y

        const boundedX = Math.max(0, Math.min(containerRect.width - 120, newX))
        const boundedY = Math.max(0, Math.min(containerRect.height - 120, newY))

        this.updateFreeGridPosition({
          itemId: item.id,
          position: { x: boundedX, y: boundedY }
        })
      }
    },

    onFreeGridDragEnd() {
      this.isFreeGridDragging = false
      this.freeGridDragOffset = null
      this.dragOverTarget = null
      this.endDrag()
    },

    getFreeGridItemStyle(item) {
      const position = this.getFreeGridPositions[item.id] || item.position || { x: 0, y: 0 }
      return {
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: this.isFreeGridDragging ? 'grabbing' : 'grab'
      }
    },

    onContentDrop(event) {
      event.preventDefault()
      const itemPath = event.dataTransfer.getData('text/plain')
      if (itemPath) {
        this.performDrop({
          fromPath: itemPath,
          toPath: this.currentPath
        })
      }
    },

    onItemClick(item, event) {
      if (this.viewMode === 'free-grid') return

      if (event.ctrlKey) {
        const newSelection = this.selectedItems.includes(item)
            ? this.selectedItems.filter(selected => selected !== item)
            : [...this.selectedItems, item]
        this.selectItems(newSelection)
      } else {
        this.selectItems([item])
      }
    },

    onItemDoubleClick(item) {
      if (item.type === 'folder') {
        this.navigateTo(item.path)
      } else {
        this.downloadFile(item)
      }
    },

    isSelected(item) {
      return this.selectedItems.includes(item)
    },

    getFileIcon(filename) {
      const extension = filename.split('.').pop().toLowerCase()
      const icons = {
        pdf: '📄',
        txt: '📝',
        jpg: '🖼️',
        js: '📜',
        vue: '⚡',
      }
      return icons[extension] || '📄'
    },

    downloadSelected() {
      this.selectedItems.forEach(item => {
        if (item.type === 'file') {
          this.downloadFile(item)
        }
      })
    },

    downloadFile(file) {
      try {
        const blob = new Blob([file.content], { type: file.blobType })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading file:', error)
        alert('Error downloading file. Please try again.')
      }
    },

    async handleCreateNewFolder() {
      const folderName = prompt('Enter folder name:')
      if (folderName && folderName.trim()) {
        try {
          await this.$store.dispatch('explorer/createNewFolder', folderName.trim())
          this.$forceUpdate()
        } catch (error) {
          alert(error.message || 'Error creating folder')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.is-dragover {
  background-color: #e3f2fd !important;
  border: 2px dashed #2196f3 !important;
}

.can-drop {
  border: 2px solid #4CAF50 !important;
}

.explorer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.home-button {
  padding: 10px 20px;
  border: 1px solid @cBorderOne;
  background-color: @cBaseOne;
  border-radius: 4px;
  cursor: pointer;
  font-family: @ffThree;
  color: @cBaseThree;

  &:hover {
    background-color: @cBaseTwo;
  }
}

.explorer {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  &__head {
    font-size: 32px;
    margin: 0;
    font-family: @ffThree;
    color: @cBaseThree;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    padding: 16px;
    background-color: @cBaseOne;
    border-radius: 2px;

    &-button {
      padding: 8px 16px;
      border: 1px solid @cBorderOne;
      background-color: @cBaseOne;
      border-radius: 4px;
      cursor: pointer;
      font-family: @ffThree;
      color: @cBaseThree;

      &:hover:not(:disabled) {
        background-color: @cBaseTwo;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  &__path {
    font-family: @ffThree;
    color: @cBaseThree;
    font-size: 14px;
  }

  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 16px;
    background-color: @cBaseOne;
    border-radius: 2px;

    .toolbar-left,
    .toolbar-right {
      display: flex;
      gap: 8px;
    }
  }

  &__view-button {
    padding: 8px 16px;
    border: 1px solid @cBorderOne;
    background-color: @cBaseOne;
    border-radius: 4px;
    cursor: pointer;
    font-family: @ffThree;
    color: @cBaseThree;

    &.active {
      background-color: @cBaseThree;
      color: white;
    }

    &:hover {
      background-color: @cBaseTwo;
    }
  }

  &__action-button {
    padding: 8px 16px;
    border: 1px solid @cBorderOne;
    background-color: @cBaseOne;
    border-radius: 4px;
    cursor: pointer;
    font-family: @ffThree;
    color: @cBaseThree;

    &:hover:not(:disabled) {
      background-color: @cBaseTwo;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.success {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;

      &:hover:not(:disabled) {
        background-color: #45a049;
      }
    }

    &.danger {
      background-color: @cBaseFive;
      color: white;
      border-color: @cBaseFive;

      &:hover:not(:disabled) {
        background-color: darken(@cBaseFive, 10%);
      }
    }
  }

  &__content {
    flex: 1;
    min-height: 400px;
    border: 1px solid @cBorderOne;
    border-radius: 2px;
    background-color: @cBaseOne;
    overflow: auto;
    position: relative;
    padding: 16px;

    &--grid {
      .grid-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 16px;
      }

      .grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        border: 1px solid @cBorderOne;
        border-radius: 2px;
        background-color: @cBaseOne;
        cursor: pointer;
        transition: all 0.2s ease;
        user-select: none;

        &:hover {
          background-color: @cBaseTwo;
          transform: translateY(-2px);
        }

        &.selected {
          background-color: @cBaseFour;
          color: white;
          border-color: @cBaseFour;
        }

        &__icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        &__name {
          font-family: @ffThree;
          font-size: 12px;
          text-align: center;
          word-break: break-word;
        }

        &__size {
          font-family: @ffThree;
          font-size: 10px;
          color: @cBaseThree;
          margin-top: 4px;
        }
      }
    }

    &--list {
      .list-view {
        display: flex;
        flex-direction: column;
      }

      .list-header {
        display: grid;
        grid-template-columns: 1fr 100px 100px;
        gap: 16px;
        padding: 8px 16px;
        border-bottom: 1px solid @cBorderOne;
        font-family: @ffThree;
        font-weight: bold;
        color: @cBaseThree;

        &__name {
          grid-column: 1;
        }

        &__type {
          grid-column: 2;
        }

        &__size {
          grid-column: 3;
          text-align: right;
        }
      }

      .list-item {
        display: grid;
        grid-template-columns: 1fr 100px 100px;
        gap: 16px;
        padding: 8px 16px;
        border-bottom: 1px solid @cBorderOne;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: @cBaseTwo;
        }

        &.selected {
          background-color: @cBaseFour;
          color: white;
        }

        &__icon {
          grid-column: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        &__name {
          grid-column: 1;
          font-family: @ffThree;
        }

        &__type {
          grid-column: 2;
          font-family: @ffThree;
          color: @cBaseThree;
        }

        &__size {
          grid-column: 3;
          text-align: right;
          font-family: @ffThree;
          color: @cBaseThree;
        }
      }
    }

    &--free-grid {
      .free-grid-view {
        position: relative;
        min-height: 500px;
      }

      .free-grid-item {
        position: absolute;
        width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 16px;
        border: 1px solid @cBorderOne;
        border-radius: 2px;
        background-color: @cBaseOne;
        cursor: grab;
        transition: all 0.2s ease;
        user-select: none;
        z-index: 1;

        &:hover {
          background-color: @cBaseTwo;
          z-index: 2;
        }

        &.selected {
          background-color: @cBaseFour;
          color: white;
          border-color: @cBaseFour;
          z-index: 3;
        }

        &:active {
          cursor: grabbing;
        }

        &__icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        &__name {
          font-family: @ffThree;
          font-size: 12px;
          text-align: center;
          word-break: break-word;
        }

        &__size {
          font-family: @ffThree;
          font-size: 10px;
          color: @cBaseThree;
          margin-top: 4px;
        }
      }
    }
  }

  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    font-family: @ffThree;
    color: @cBaseThree;
    font-size: 18px;
  }

  &__status {
    margin-top: 16px;
    padding: 8px 16px;
    background-color: @cBaseOne;
    border-radius: 2px;
    font-family: @ffThree;
    color: @cBaseThree;
    font-size: 14px;
  }
}
</style>