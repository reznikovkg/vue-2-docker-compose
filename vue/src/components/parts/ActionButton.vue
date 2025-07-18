<template>
  <li>
    <LargeButton
    :isDisabled="actionsOnTimeout" 
    :displayText="displayedActionName" 
    :clickCallback="doAction"/>
  </li>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LargeButton from './LargeButton.vue';
import { capitalizeFirstLetter } from '@/tools/text';

export default {
  name: 'ActionButton',
  components: {
    LargeButton
  },
  props: {
    actionName: String,
    actionRequirements: Object
  },
  computed: {
    ...mapGetters('game', [
    'money',
    'energy',
    'actionsOnTimeout'
    ]),
    displayedActionName () {
      return capitalizeFirstLetter(this.actionName);
    }
  },
  methods: {
    ...mapActions('game', [
    'performAction'
    ]),
    doAction () {
      if (this.actionRequirements.money <= this.money && this.actionRequirements.energy <= this.energy) {
        this.performAction(this.actionName);
      }
      else {
        if (this.actionRequirements.money > this.money && this.actionRequirements.energy > this.energy) {
          alert('Not enough money and energy!')
        }
        else if (this.actionRequirements.money > this.money) {
          alert('Not enough money!')
        }
        else {
          alert('Not enough energy!')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>