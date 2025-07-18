import { mapMutations } from "vuex";
import HatsMenuModal from "@/components/modals/HatsMenuModal.vue";
import TasksMenuModal from "@/components/modals/TasksMenuModal.vue";

export const hatsMenuModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openHatsModal (params = {}) {
      this.openModal({
        component: HatsMenuModal,
        params
      })
    }
  }
}
export const tasksMenuModal = {
  methods: {
    ...mapMutations('modals', [
      'openModal'
    ]),
    openTasksModal (params = {}) {
      this.openModal({
        component: TasksMenuModal,
        params
      })
    }
  }
}