<template>
  <div class="game">
    <GameViewport/>
    <CatchProgress v-if="game.state === 'fighting'" :percent="game.progress"/>

    <div class="game__ui">
      <button @click="() => uncastRod()" v-if="game.state === 'casting'">Смотать удочку</button>
      <button @click="() => equipRod()" v-if="!rodEquiped">Взять удочку</button>
      <button @click="() => unequipRod()" v-if="rodEquiped && game.state === 'idle'">Убрать удочку</button>
      <button v-if="haveLure" @click="() => useLure()">Прикормить</button>
    </div>

    <button class="game__exit" @click="() => exit()" v-if="game.state === 'idle' || game.state === 'casting'">
      ← Уйти
    </button>

    <div class="inventory-slots game__inventory-slots" @click="() => $router.push('/inventory')">
      <InventorySlot :item="inventory.equipedRod" text="удилище"/>
      <InventorySlot :item="inventory.equipedReel" text="катушка"/>
      <InventorySlot :item="inventory.equipedLine" text="леска"/>
      <InventorySlot :item="inventory.equipedBait" text="наживка"/>
    </div>
  </div>
</template>

<script>
import CatchProgress from "../parts/CatchProgress.vue";
import GameViewport from "../parts/GameViewport.vue";
import InventorySlot from "../parts/InventorySlot.vue";
import {mapActions, mapMutations, mapState} from "vuex";
import {modals} from "@/mixins/modals";
import {notice} from "@/mixins/notice";

export default {
  name: "GamePage",
  components: {InventorySlot, GameViewport, CatchProgress},
  mixins: [modals, notice],
  computed: {
    ...mapState({
      game: state => state.game,
      inventory: state => state.inventory
    }),

    caughtFish() {
      return this.inventory.fishes[this.inventory.fishes.length - 1];
    },

    brokenText() {
      switch (this.game.brokeSomething) {
        case "Rod":
          return "Удочка сломалась";
        case "Reel":
          return "Катушка сломалась";
        case "Line":
          return "Леска порвалась";
        default:
          return "Рыба сошла!";
      }
    },

    haveLure() {
      return this.inventory.items.find((x) => x.constructor.name == "Lure");
    },

    rodEquiped() {
      return this.inventory.equipedRod && this.inventory.equipedRod.equiped;
    }
  },

  watch: {
    // eslint-disable-next-line no-unused-vars
    'game.state'(newValue, _) {
      switch (newValue) {
        case "escaped":
          this.showNotice(this.brokenText);
          this.reset();
          return;
        case "caught":
          this.openCaughtModal(this.caughtFish);
          return;
      }
    }
  },


  beforeDestroy() {
    this.reset();
  },

  methods: {
    reset() {
      this.$store.commit("inventory/unequipRod");
      this.$store.commit("game/reset");
    },

    equipRod() {
      if (!this.inventory.equipedRod || !this.inventory.equipedReel || !this.inventory.equipedLine || !this.inventory.equipedBait) {
        this.openNotEquipedItemsModal();
        return;
      }
      this.$store.commit("inventory/equipRod");
    },

    async useLure() {
      await this.$store.dispatch("game/useLure");
    },

    exit() {
      this.$store.commit("game/reset");
      this.$router.replace('/locations');
    },

    ...mapActions({
      uncastRod: 'game/uncastRod'
    }),

    ...mapMutations({
      unequipRod: 'inventory/unequipRod'
    })
  }
}
</script>

<style lang="less" scoped>
.game {
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;

  &__ui {
    margin: 1em;
    display: flex;
    gap: 0.2em;
    position: fixed;
    bottom: 1em;
  }

  &__exit {
    position: fixed;
    right: 1em;
    top: 1em;
  }

  &__inventory-slots {
    position: fixed;
    top: 1em;
    left: 1em;
    background-color: @cBackground;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    cursor: pointer;
  }
}
</style>