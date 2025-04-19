<template>
  <div class="app">
    <inventory-panel
        :items="inventory"
        @select="(item) => selectItem(item)"
    />

    <game-scene-view
        :scene="currentScene"
        :selected-item="selectedItem"
        @click-item="(item) => takeItem(item)"
        @click-spot="(spot) => interact(spot)"
    />

    <dialog-modal
        v-if="dialog.show"
        :params="dialog.params"
        @close="() => { dialog.show = false }"
    />
  </div>
</template>

<script>
import GameSceneView from '@/components/parts/GameSceneView.vue'
import InventoryPanel from '@/components/parts/InventoryPanel.vue'
import DialogModal from '@/components/modals/DialogModal.vue'

export default {
  components: { GameSceneView, InventoryPanel, DialogModal },
  data() {
    return {
      currentScene: {
        background: require('@/assets/room.png'),
        items: [
          {
            id: 'mat',
            name: 'Коврик',
            image: require('@/assets/logo.png'),
            x: '45%', y: '94%',
            description: 'Старый потертый коврик'
          },
          {
            id: 'flowerpot',
            name: 'Горшок',
            image: require('@/assets/logo.png'),
            x: '25%', y: '85%',
            description: 'Куст в горшке',
            collected: false
          },
          {
            id: 'box',
            name: 'Почтовый ящик',
            image: require('@/assets/logo.png'),
            x: '70%', y: '50%',
            description: 'Пустой почтовый ящик'
          },
          {
            id: 'ring',
            name: 'Дверной звонок',
            image: require('@/assets/logo.png'),
            x: '57.55%', y: '30%',
            description: 'Дверной звонок не работает'
          }
        ],
        spots: [
          {
            id: 'door',
            x: '35%', y: '5%',
            width: 248, height: 460,
            description: 'Дверь'
          }
        ]
      },
      inventory: [],
      selectedItem: null,
      dialog: {
        show: false,
        params: {
          title: '',
          message: '',
          buttons: [
            {
              text: 'OK',
              afterClick: 'emitClose'
            }
          ]
        }
      }
    }
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
    },
    takeItem(item) {
      if (item.id === 'flowerpot' && item.collected === false) {
        this.showDialog('Под кустом оказался ключ!');
        this.inventory.push({
          id: 'key',
          name: 'Ключ',
          image: require('@/assets/logo.png'),
          description: 'Ржавый ключ от двери'
        });
        item.collected = true;
      } else {
        this.showDialog(item.description);
      }
    },
    interact(spot) {
      if (spot.id === 'door') {
        if (this.selectedItem?.id === 'key') {
          this.showDialog('Дверь открыта! Поздравляю, вы прошли квест!');
          this.inventory = this.inventory.filter(i => i.id !== 'key');
        } else {
          this.showDialog('Дверь заперта. Кажется, вы забыли ключи. Попробуйте осмотреться...');
        }
      }
    },
    showDialog(message) {
      this.dialog.params.message = message;
      this.dialog.show = true;
    }
  }
}
</script>

<style>
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  overflow: hidden;
}
</style>