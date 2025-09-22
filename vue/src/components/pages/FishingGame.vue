<template>
  <div class="fishing-game">
    <div class="header">
      <h1>Рыболовная лодка</h1>
      <div class="header-controls">
        <div class="boat-info">
          <span>Позиция: X: {{ boatPosition.x }}, Y: {{ boatPosition.y }}</span>
          <span> | </span>
          <span>Зона: <span :class="['zone-indicator', 'zone-' + currentZone]">{{ getZoneName(currentZone) }}</span></span>
          <span> | </span>
          <span>Улов: {{ fishCaught }}</span>
        </div>
        <button @click="resetGame" class="new-game-btn">Новая игра</button>
      </div>
    </div>
    <div class="fishing-minigame" v-if="isFishing">
      <h2>Ловля рыбы</h2>
      <p>Нажимайте пробел</p>
      <div class="fishing-bar">
        <div class="target-zone"></div>
        <div class="moving-bar" :style="{ bottom: barPosition + 'px' }"></div>
      </div>
      <div class="fishing-stats">
        <p>Попытки: {{ fishingAttempts }}</p>
        <p>Успешно: {{ fishingSuccess }}</p>
      </div>
      <button @click="stopFishing" class="stop-fishing-btn">
        Завершить
      </button>
    </div>
    <div class="game-area" ref="gameArea">
      <img
          :src="boatImage"
          class="boat-image"
          :style="boatStyle"
          alt="Лодка"
      >
      <div
          v-for="(zone, index) in fishingZones"
          :key="index"
          class="fishing-zone"
          :class="zoneClass(zone)"
          :style="zoneStyle(zone)"
          :title="`${getZoneName(zone.type)} зона`"
      ></div>
    </div>
    <div class="inventory">
      <h2>Инвентарь</h2>
      <div class="inventory-list">
        <div v-for="(fish, index) in inventory" :key="index" class="fish-item" :data-type="fish.type">
          <img
              :src="getFishImage(fish.type)"
              class="fish-image"
              :alt="fish.name"
          >
          <div class="fish-info">
            <div class="fish-name">{{ fish.name }}</div>
            <div class="fish-count">Количество: {{ fish.count }}</div>
          </div>
        </div>
        <div v-if="inventory.length === 0" class="empty-inventory">
          Инвентарь пуст
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import boatImage from '@/assets/boat.png'
import fishLowImage from '@/assets/fish-low.png'
import fishMediumImage from '@/assets/fish-medium.png'
import fishHighImage from '@/assets/fish-high.png'
export default {
  name: 'FishingGame',
  data() {
    return {
      barPosition: 0,
      barDirection: 1,
      barSpeed: 3,
      barAnimation: null,
      boatSpeed: 5,
      boatImage,
      fishImages: {
        low: fishLowImage,
        medium: fishMediumImage,
        high: fishHighImage
      }
    }
  },
  computed: {
    ...mapGetters([
      'boatPosition',
      'currentZone',
      'fishingZones',
      'inventory',
      'fishCaught',
      'isFishing',
      'fishingAttempts',
      'fishingSuccess',
      'fishTypes'
    ]),
    boatStyle() {
      return {
        left: `${this.boatPosition.x}px`,
        top: `${this.boatPosition.y}px`
      }
    }
  },
  mounted() {
    this.loadGameData()
    this.setupControls()
    this.startBarAnimation()
  },
  beforeDestroy() {
    this.removeControls()
    if (this.barAnimation) {
      clearInterval(this.barAnimation)
    }
  },
  methods: {
    ...mapActions([
      'moveBoat',
      'catchFish',
      'startFishing',
      'stopFishing',
      'loadGameData',
      'incrementFishingAttempts',
      'incrementFishingSuccess',
      'resetGame'
    ]),
    getFishImage(fishType) {
      return this.fishImages[fishType] || this.fishImages.low
    },
    getZoneName(zoneType) {
      const zoneNames = {
        low: 'Низкая',
        medium: 'Средняя',
        high: 'Высокая'
      }
      return zoneNames[zoneType] || zoneType
    },
    setupControls() {
      window.addEventListener('keydown', this.handleKeyPress)
      window.addEventListener('keyup', this.handleSpacePress)
    },
    removeControls() {
      window.removeEventListener('keydown', this.handleKeyPress)
      window.removeEventListener('keyup', this.handleSpacePress)
    },
    handleKeyPress(event) {
      if (this.isFishing) return
      switch(event.key) {
        case 'ArrowUp':
          this.moveBoat({ x: 0, y: -this.boatSpeed })
          break
        case 'ArrowDown':
          this.moveBoat({ x: 0, y: this.boatSpeed })
          break
        case 'ArrowLeft':
          this.moveBoat({ x: -this.boatSpeed, y: 0 })
          break
        case 'ArrowRight':
          this.moveBoat({ x: this.boatSpeed, y: 0 })
          break
      }
    },
    handleSpacePress(event) {
      if (event.code === 'Space') {
        event.preventDefault()
        if (this.isFishing) {
          this.attemptCatch()
        } else {
          this.startFishing()
        }
      }
    },
    zoneClass(zone) {
      return `${zone.type}-zone`
    },
    zoneStyle(zone) {
      return {
        left: `${zone.x}px`,
        top: `${zone.y}px`,
        width: `${zone.radius * 2}px`,
        height: `${zone.radius * 2}px`
      }
    },
    startBarAnimation() {
      this.barAnimation = setInterval(() => {
        if (this.isFishing) {
          this.barPosition += this.barDirection * this.barSpeed

          if (this.barPosition >= 180 || this.barPosition <= 0) {
            this.barDirection *= -1
          }
        }
      }, 50)
    },
    attemptCatch() {
      this.incrementFishingAttempts()
      if (this.barPosition >= 0 && this.barPosition <= 20) {
        this.incrementFishingSuccess()
        this.catchFish()

        if (this.fishingSuccess >= 3) {
          setTimeout(() => {
            this.stopFishing()
          }, 500)
        }
      }
    }
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');
.fishing-game {
  height: 100vh;
  display: grid;
  grid-template-columns: 300px 1fr 300px;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
     "header header header"
     "fishing game inventory";
  gap: 2px;
  font-family: 'Jost', sans-serif;
}
.header {
  grid-area: header;
  background-color: #FAFAFA;
  padding: 16px;
  border-bottom: 2px solid #CFCFCF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  h1 {
    margin: 0;
    color: #022E40;
    text-align: center;
  }
}
.fishing-minigame {
  grid-area: fishing;
  background-color: #FAFAFA;
  padding: 16px;
  border-right: 2px solid #CFCFCF;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h2 {
    margin: 0;
    color: #022E40;
  }
}
.inventory {
  grid-area: inventory;
  background-color: #FAFAFA;
  padding: 16px;
  border-left: 2px solid #CFCFCF;
  overflow-y: auto;
  h2 {
    margin: 0 0 16px 0;
    color: #022E40;
  }
}
.game-area {
  grid-area: game;
  position: relative;
  background: linear-gradient(to bottom, #87CEEB, #4682B4);
  overflow: hidden;
  cursor: pointer;
}
.boat-image {
  position: absolute;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  z-index: 10;
  transition: all 0.2s ease;
}
.fishing-zone {
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  z-index: 5;
  transform: translate(-50%, -50%);
}
.low-zone {
  background: radial-gradient(circle, rgba(0,128,255,0.4) 0%, rgba(0,128,255,0.1) 70%);
  border: 2px dashed rgba(0,128,255,0.8);
}
.medium-zone {
  background: radial-gradient(circle, rgba(0,255,0,0.4) 0%, rgba(0,255,0,0.1) 70%);
  border: 2px dashed rgba(0,255,0,0.8);
}
.high-zone {
  background: radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.1) 70%);
  border: 2px dashed rgba(255,215,0,0.8);
}
.fishing-bar {
  width: 100%;
  height: 200px;
  background: #2C3E50;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #34495E;
}
.target-zone {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #27AE60, #2ECC71);
  z-index: 2;
  border-radius: 0 0 10px 10px;
}
.moving-bar {
  position: absolute;
  width: 100%;
  height: 20px;
  background: linear-gradient(to right, #E74C3C, #C0392B);
  z-index: 1;
  border-radius: 5px;
  transition: bottom 0.05s ease;
}
.fish-image {
  width: 40px;
  height: 40px;
  margin-right: 12px;
  object-fit: contain;
}
.fish-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  background: linear-gradient(135deg, #EBEEF2, darken(#EBEEF2, 10%));
  border-radius: 8px;
  border-left: 4px solid;
}
.fish-info {
  flex: 1;
  .fish-name {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 14px;
    color: #022E40;
  }
  .fish-count {
    color: #022E40;
    font-size: 12px;
    opacity: 0.8;
  }
}
.fish-item[data-type="low"] { border-left-color: #3498DB; }
.fish-item[data-type="medium"] { border-left-color: #27AE60; }
.fish-item[data-type="high"] { border-left-color: #F39C12; }
.stop-fishing-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #E74C3C, #C0392B);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-family: 'Jost', sans-serif;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
  }
}
.empty-inventory {
  text-align: center;
  color: #7F8C8D;
  padding: 20px;
  font-style: italic;
}
.boat-info {
  display: flex;
  gap: 20px;
  font-family: 'Courier New', monospace;
  background: rgba(255,255,255,0.9);
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #BDC3C7;
  color: #022E40;
  justify-content: center;
  align-items: center;
}
.zone-indicator {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  color: white;
}
.zone-low { background: #3498DB; }
.zone-medium { background: #27AE60; }
.zone-high { background: #F39C12; }
.fishing-stats {
  display: flex;
  gap: 20px;
  justify-content: center;
  p {
    margin: 0;
    padding: 8px 16px;
    background: #ECF0F1;
    border-radius: 6px;
    font-weight: bold;
    color: #022E40;
  }
}
.new-game-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #3498DB, #2980B9);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  font-family: 'Jost', sans-serif;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
}
.header-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}
body {
  margin: 0;
  padding: 0;
  background-color: #EBEEF2;
  font-family: 'Jost', sans-serif;
  overflow: hidden;
}
</style>
