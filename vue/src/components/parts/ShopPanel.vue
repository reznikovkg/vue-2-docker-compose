<template>
  <div class="shop-panel">
    <div class="coins-display">Coins: {{ coins }}</div>
    <div class="upgrades-list">
      <button
          class="shop-button"
          @click="() => buyUpgrade('life')"
          :disabled="coins < shopPrices.life"
          title="+Life"
      >
        +1 Life
      </button>
      <button
          class="shop-button"
          @click="() => buyUpgrade('speed')"
          :disabled="coins < shopPrices.speed || upgrades.speedBoost"
          :title="`Speed Boost (${shopPrices.speed} coins)`"
      >
        Speed
      </button>
      <button
          class="shop-button"
          @click="() => buyUpgrade('tripleWeapon')"
          :disabled="coins < shopPrices.tripleWeapon || upgrades.weaponType === 'triple'"
          title="Triple Shot (15 coins, 10 sec)"
      >
        Triple Shot
      </button>
      <button
          class="shop-button"
          @click="() => buyUpgrade('spreadWeapon')"
          :disabled="coins < shopPrices.spreadWeapon || upgrades.weaponType === 'spread'"
          title="Spread Shot (15 coins, 10 sec)"
      >
        Spread Shot
      </button>
      <button
          class="shop-button"
          @click="() => buyUpgrade('clear')"
          :disabled="coins < shopPrices.clear"
          :title="`Clear Enemies (${shopPrices.clear} coins)`"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ShopPanel',
  computed: {
    ...mapGetters('game', ['getCoins', 'getUpgrades', 'getShopPrices']),
    coins() {
      return this.getCoins;
    },
    upgrades() {
      return this.getUpgrades;
    },
    shopPrices() {
      return this.getShopPrices;
    }
  },
  methods: {
    ...mapMutations('game', ['BUY_UPGRADE']),
    buyUpgrade(type) {
      this.BUY_UPGRADE({ type });
    }
  }
}
</script>

<style scoped lang="less">
.shop-panel {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.coins-display {
  color: gold;
  font-size: 18px;
  margin-bottom: 8px;
  font-family: @ffOne;
}

.upgrades-list {
  display: flex;
  gap: 8px;
}

.shop-button {
  background: @cButtonPrimary;
  color: @cBaseOne;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: darken(@cButtonPrimary, 10%);
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
