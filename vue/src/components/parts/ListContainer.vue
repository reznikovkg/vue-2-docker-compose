<template>
  <div class="list">
    <PlantCard v-for="(plant, index) in plants" :key="index" :plant="plant"/>
  </div>
</template>

<script>
import PlantCard from '@/components/cards/PlantCard.vue'
export default {
  name: 'ListContainer',
  components: {
     PlantCard
  },
  props: {
    plants: {
     type: Array,
     required: true 
    }
  }
}
</script>

<style scoped lang="less">
.list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
