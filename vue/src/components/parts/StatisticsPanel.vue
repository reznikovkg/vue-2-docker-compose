<template>
  <div class="display-panel__stats">
    <StatDisplay
    :title="'Energy'"
    :iconSrc="require('@/assets/img/energy.svg')"
    :statValue="energy"
    :maxStatValue="100"
    />
    <StatDisplay
    :title="'Money'"
    :iconSrc="require('@/assets/img/money.svg')"
    :statValue="money"
    />
  </div>
</template>

<script>
import StatDisplay from '@/components/parts/StatDisplay.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'StatisticsPanel',
  components: {
    StatDisplay
  },
  props: {
    currentEnergy: Number,
    currentMoney: Number
  },
  computed: {
    ...mapGetters('game', [
      'money',
      'energy'
    ])
  }
}
</script>

<style lang="less">
.display-panel {
  &__stats {
    width: 100%;
    padding-left: 20%;
  }
}
</style>