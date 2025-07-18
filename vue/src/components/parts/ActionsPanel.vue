<template>
  <ul class="list__actions">
    <ActionButton
    v-for="(actionInfo, actionName) in actions" 
    :key="actionName" 
    :actionName="actionName" 
    :actionRequirements="actionInfo.requires"
    />
  </ul>
</template>

<script>
import ActionButton from '@/components/parts/ActionButton.vue';
import { actions } from '@/store/const';

export default {
  name: 'ActionsPanel',
  components: {
    ActionButton
  },
  data () {
    return {
      actions: actions
    }
  }
}
</script>

<style scoped lang="less">
.list {
  &__actions {
    list-style: none;
  }
}
</style>