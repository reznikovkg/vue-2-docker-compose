import { mapMutations } from "vuex";
import DialogModal from "@/components/modals/DialogModal.vue";

export const helpModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openHelpModal (params = {}) {
      this.openModal({
        component: DialogModal,
        params
      })
    }
  }
}
