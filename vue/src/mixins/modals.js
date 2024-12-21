import { mapMutations } from "vuex";
import HelpModal from "@/components/modals/HelpModal";
import EndGameModal from '@/components/modals/EndGameModal.vue';
import MulliganModal from '@/components/modals/MulliganModal.vue';

export const helpModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openHelpModal(params = {}) {
      this.openModal({
        component: HelpModal,
        params
      })
    }
  }
}

export const endGameModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openEndGameModal() {
      this.openModal({ component: EndGameModal });
    }
  }
}

export const mulliganModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openMulliganModal() {
      this.openModal({ component: MulliganModal });
    }
  }
}
