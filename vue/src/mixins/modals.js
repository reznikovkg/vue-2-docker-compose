import {mapMutations} from "vuex";
import CaughtModal from "@/components/modals/CaughtModal.vue";
import NotItemsEquipedModal from "@/components/modals/NotItemsEquipedModal.vue";
import HelpModal from "@/components/modals/HelpModal.vue";

export const modals = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),

    openHelpModal (params = {}) {
      this.openModal({
        component: HelpModal,
        params
      })
    },

    openCaughtModal(params = {}) {
      this.openModal({
        component: CaughtModal,
        params
      })
    },

    openNotEquipedItemsModal(params = {}) {
      this.openModal({
        component: NotItemsEquipedModal,
        params
      })
    }
  }
}