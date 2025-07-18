<template>
  <div class="grid">
    <HatButton v-for="(hatInfo, hatName) in combinedHatsInfo"
    :key="hatName" 
    :hatName="hatName" 
    :hatInfo="hatInfo"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HatButton from '@/components/parts/HatButton.vue';
import { hats } from '@/store/const';

export default {
  name: 'HatsGrid',
  components: {
    HatButton
  },
  computed: {
    ...mapGetters('game', [
    'availableHatsNames',
    'currentHatName'
    ]),
    combinedHatsInfo () {
      let res = {};
      for (const hatName in hats) {
        res[hatName] = {
          ...hats[hatName],
          available: this.availableHatsNames.includes(hatName),
          equipped: hatName === this.currentHatName
        };
      }
      return res;
    }
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