<template>
  <div class="content">
    <section class="section__side">
      <StatisticsPanel 
      :current-energy="100" 
      :current-money="0"/>
      <LeftButtonsDisplay/>
    </section>
    <section class="section__mid">
      <CharacterDisplay/>
    </section>
    <section class="section__side">
      <ActionsPanel/>
    </section>
  </div>
</template>

<script>
import StatisticsPanel from '@/components/parts/StatisticsPanel.vue';
import LeftButtonsDisplay from '@/components/parts/LeftButtonsDisplay.vue';
import CharacterDisplay from '@/components/parts/CharacterDisplay.vue';
import ActionsPanel from '@/components/parts/ActionsPanel.vue';
import { mapActions } from 'vuex';

export default {
  name: 'GamePage',
  components: {
    StatisticsPanel,
    LeftButtonsDisplay,
    CharacterDisplay,
    ActionsPanel
  },
  mounted () {
    this.startEnergyTicker();
    this.repopulateTasks();
  },
  methods: {
    ...mapActions('game', [
      'startEnergyTicker',
      'repopulateTasks'
    ]),
    crap () {
      console.log('gg');
    }
  }
}
</script>

<style scoped lang="less">
.content {
  background-color: @cPrimary;
  display: flex;
  padding-top: 10%;

  .section {
    &__side {
      width: 30%;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &__mid {
      width: auto;
      margin: auto;
    }
  }
}
</style>