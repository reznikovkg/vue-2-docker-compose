import {mapMutations} from "vuex";
import CaughtModal from "@/components/modals/CaughtModal.vue";
import NotItemsEquipedModal from "@/components/modals/NotItemsEquipedModal.vue";

export const modals = {
  methods: {
    ...mapMutations('modals', [
      'OPEN_MODAL'
    ]),

    openCaughtModal(params = {}) {
      this.OPEN_MODAL({
        component: CaughtModal,
        params
      })
    },

    openNotEquipedItemsModal(params = {}) {
      this.OPEN_MODAL({
        component: NotItemsEquipedModal,
        params
      })
    }
  }
}