<template>
  <div class="hat__container">
    <section class="hat__display" :class="hatStatusDisplayClass">
      <SmallButton 
      :iconSrc="hatInfo.iconPath"
      :isDisabled="this.currentHatName && !this.hatInfo.equipped" 
      :clickCallback="hatClick"/>
      <section class="hat__display__effects__container">
        <HatEffectDisplay
        :iconSrc="require('@/assets/img/money.svg')" 
        :value="hatInfo.effects.moneyMult"
        />
        <HatEffectDisplay
        :iconSrc="require('@/assets/img/energy.svg')"
        :value="hatInfo.effects.energyMult"
        />
      </section>
      <section 
        v-if="!this.hatInfo.available" 
        class="hat__display__price">
        <img class="hat__display__price__icon" 
        :src="require('@/assets/img/money.svg')">
        <p class="hat__display__price__value">{{ hatInfo.cost }}</p>
      </section>
    </section>
  
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { capitalizeFirstLetter } from '@/tools/text';
import SmallButton from '@/components/parts/SmallButton.vue';
import HatEffectDisplay from '@/components/parts/HatEffectDisplay.vue';

export default {
  name: 'HatButton',
  components: {
    SmallButton,
    HatEffectDisplay
  },
  props: {
    hatName: String,
    hatInfo: Object
  },
  computed: {
    ...mapGetters('game', [
    'money',
    'currentHatName'
    ]),
    displayedHatName () {
      return capitalizeFirstLetter(this.hatName);
    },
    hatStatusDisplayClass () {
      if (this.hatInfo.equipped) {
        return 'hat__display__equipped';
      }
      else if (this.currentHatName) {
        return 'hat__display__blocked';
      }
      else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions('game', [
    'buyHat',
    'unequipCurrentHat',
    'equipHat'
    ]),
    hatClick () {
      if (this.hatInfo.equipped) {
        this.unequipCurrentHat();
      }
      else if (!this.currentHatName) {
        if (this.hatInfo.available) {
          this.equipHat(this.hatName);
        }
        else if (this.money > this.hatInfo.cost) {
          this.buyHat(this.hatName);
        }
        else {
          alert('Not enough money!');
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.hat {
  &__display {
    position: relative;

    &__equipped {
      background-color: @cGood;
    }

    &__blocked {
      background-color: @cBad;
    }
    
    &__effects {
      &__container {
        position: absolute;
        left: 20px;
        bottom: 10px;
        background-color: transparent;
      }
    }
    
    &__price {
      display: flex;
      position: absolute;
      align-items: center;
      right: 20px;
      top: 0px;
      background-color: transparent;
      
      &__icon {
        height: 40px;
        width: 40px;
        margin-right: 5px;
      }
      
      &__value {
        font-size: @sFontBigger;
      }
    }
  }
}
</style>