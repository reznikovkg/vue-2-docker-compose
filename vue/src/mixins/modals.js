import { mapMutations } from "vuex";
import GameEndModal from "@/components/modals/GameEndModal.vue";

export const gameEndModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openGameOverModal (params = {}) {
      this.openModal({
        component: GameEndModal,
        params
      })
    }
  }
}

