<template>
  <div class="display_buttons_horizontal">
    <SmallButton
    :iconSrc="require('@/assets/img/items.svg')" 
    :clickCallback="openHatsModal"
    />
    <SmallButton
    :iconSrc="require('@/assets/img/tasks.svg')" 
    :clickCallback="openTasksModal"
    />
  </div>
</template>

<script>
import SmallButton from '@/components/parts/SmallButton.vue';
import { hatsMenuModal, tasksMenuModal } from '@/mixins/modals';

export default {
  name: 'InventoryButtonsDisplay',
  mixins: [
    hatsMenuModal,
    tasksMenuModal
  ],
  components: {
    SmallButton
  }
}
</script>

<style scoped lang="less">

</style>