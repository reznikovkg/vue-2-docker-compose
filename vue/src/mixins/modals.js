import { mapMutations } from "vuex";
import HelpModal from "@/components/modals/HelpModal.vue";

export default {
  methods: {
    ...mapMutations('modals', ['openModal']),
    openGameOverModal(score, restartCallback) {
      this.openModal({
        component: HelpModal,
        params: {
          score,
          onRestart: () => {
            restartCallback();
          }
        }
      });
    }
  }
}