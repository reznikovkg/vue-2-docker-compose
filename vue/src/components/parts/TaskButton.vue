<template>
  <div class="task__container">
    <SmallButton
    :iconSrc="taskIconSrc" 
    :clickCallback="doTask"/>
  </div>
</template>

<script>
import SmallButton from '@/components/parts/SmallButton.vue';
import { tasks } from '@/store/const';
import { mapActions } from 'vuex';

export default {
  name: 'TaskButton',
  components: {
    SmallButton
  },
  props: {
    index: Number,
    taskInfo: Object
  },
  computed: {
    taskIconSrc () {
      return tasks[this.taskInfo.type].iconPath;
    }
  },
  methods: {
    ...mapActions('game', [
      'performTask'
    ]),
    doTask () {
      this.performTask(this.index);
    }
  }
}
</script>

<style scoped lang="less">
.task {
  &__container {
    width: 150px;
    height: 150px;
  }
}
</style>