import { mapMutations } from "vuex";
const ResultGameModal = () => import("@/components/modals/ResultGameModal.vue");
const StartGameModal = () => import("@/components/modals/StartGameModal.vue");
const NoSubscriptionModal = () => import("@/components/modals/NoSubscriptionModal.vue");

export const gameModals = {

  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),

    openStartGameModal (params = {}) {
      this.openModal({
        component: StartGameModal,
        params
      })
    },

    openResultGameModal (params = {}) {
      this.openModal({
        component: ResultGameModal,
        params
      })
    },

    openNoSubscriptionModal (params = {}) {
      this.openModal({
        component: NoSubscriptionModal,
        params
      })
    }
  }
}
