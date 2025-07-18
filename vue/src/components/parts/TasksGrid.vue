<template>
  <div class="grid">
    <TaskButton v-for="(taskInfo, index) in availableTasks"
    :key="index"
    :index="index" 
    :taskInfo="taskInfo" 
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskButton from '@/components/parts/TaskButton.vue';

export default {
  name: 'TasksGrid',
  components: {
    TaskButton
  },
  computed: {
    ...mapGetters('game', [
    'availableTasks'
    ])
  }
}
</script>

<style>
.grid {
  display: flex;
  overflow-y: scroll;
  scrollbar-width: none;
  padding: 10px;
  width: 100%;
  height: 100%;
}
</style>