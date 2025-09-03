<template>
  <div class="game-view">
    <div class="game-view__level-selector">
      <button 
        v-for="level in levels" 
        :key="level.id"
        class="game-view__level-button"
        :class="{ 'game-view__level-button--active': currentLevel === level.id }"
        @click="switchLevel(level.id)"
      >
        Level {{ level.id }}
      </button>
    </div>
    
    <div class="game-view__game-area" ref="gameArea" @click="handleClick" @contextmenu.prevent="handleRightClick">
      <Area 
        v-for="(area, index) in currentLevelData.areas" 
        :key="index"
        :points="area.points"
      />
      
      <Tower 
        v-for="tower in towers" 
        :key="'tower-' + tower.position.x + '-' + tower.position.y"
        :position="tower.position"
        :range="tower.range"
        :level="tower.level"
        :target="tower.target"
      />
      
      <Foe 
        v-for="(foe, index) in foes" 
        :key="'foe-' + index"
        :position="foe.position"
        :selected="foe.selected"
        :health="foe.health"
        @click.native.stop="selectFoe(index)"
      />
    </div>
  </div>
</template>

<script>
import { Point, Area, Tower, Foe } from '@/classes'
import AreaComponent from '@/components/Area.vue'
import TowerComponent from '@/components/Tower.vue'
import FoeComponent from '@/components/Foe.vue'

export default {
  name: 'GameView',
  components: {
    Area: AreaComponent,
    Tower: TowerComponent,
    Foe: FoeComponent
  },
  data() {
    return {
      currentLevel: 1,
      levels: [
        {
          id: 1,
          areas: [
            new Area([
              new Point(100, 100),
              new Point(400, 100),
              new Point(600, 300),
              new Point(400, 500),
              new Point(100, 500)
            ]),
            new Area([
              new Point(1000, 100),
              new Point(1200, 100),
              new Point(1400, 300),
              new Point(1400, 600),
              new Point(1200, 600),
              new Point(1200, 400),
              new Point(1100, 300),
              new Point(1000, 300)
            ]),
            new Area([
              new Point(800, 300),
              new Point(1000, 500),
              new Point(800, 600),
              new Point(600, 500)
            ])
          ]
        },
        {
          id: 2,
          areas: [
            new Area([
              new Point(800, 100),
              new Point(1000, 400),
              new Point(800, 600),
              new Point(600, 300)
            ]),
            new Area([
              new Point(300, 100),
              new Point(500, 200),
              new Point(500, 500),
              new Point(300, 600),
              new Point(200, 500),
              new Point(200, 200)
            ])
          ]
        },
        {
          id: 3,
          areas: [
            new Area([
              new Point(100, 100),
              new Point(1300, 100),
              new Point(1300, 200),

              new Point(400, 200),
              new Point(400, 300),
              new Point(300, 300),
              new Point(300, 200),

              new Point(100, 200)
            ]),
            new Area([
              new Point(100, 400),

              new Point(1000, 400),
              new Point(1000, 300),
              new Point(1100, 300),
              new Point(1100, 400),

              new Point(1300, 400),
              new Point(1300, 500),
              new Point(100, 500)
            ])
          ]
        }
      ],
      towers: [],
      foes: [],
      selectedFoe: null,
      lastFrameTime: 0,
      animationFrameId: null
    }
  },
  computed: {
    currentLevelData() {
      return this.levels.find(level => level.id === this.currentLevel)
    }
  },
  mounted() {
    this.startGameLoop()
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy() {
    this.stopGameLoop()
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    switchLevel(levelId) {
      this.currentLevel = levelId
      this.towers = []
      this.foes = []
      this.selectedFoe = null
    },
    handleClick(event) {
      const rect = this.$refs.gameArea.getBoundingClientRect()
      const clickPoint = new Point(
        event.clientX - rect.left,
        event.clientY - rect.top
      )
      
      // Проверка, находится ли позиция в области постройки башен
      const canBuild = this.currentLevelData.areas.some(area => area.contains(clickPoint))
      
      if (canBuild) {
        // Проверка занята позиция или нет
        const positionOccupied = [...this.towers, ...this.foes].some(obj => 
          Math.abs(obj.position.x - clickPoint.x) < 20 && 
          Math.abs(obj.position.y - clickPoint.y) < 20
        )
        
        if (!positionOccupied) {
          this.towers.push(new Tower(clickPoint))
        }
      } else {
        // Добавление противника, если клик был не в области постройки
        this.foes.push(new Foe(clickPoint))
      }
    },
    handleRightClick(event) {
      const rect = this.$refs.gameArea.getBoundingClientRect()
      const clickPoint = new Point(
        event.clientX - rect.left,
        event.clientY - rect.top
      )
      
      // Удаление башен
      this.towers = this.towers.filter(tower => 
        Math.abs(tower.position.x - clickPoint.x) >= 20 || 
        Math.abs(tower.position.y - clickPoint.y) >= 20
      )
      
      // Удаление противников
      const foeIndex = this.foes.findIndex(foe => 
        Math.abs(foe.position.x - clickPoint.x) < 20 && 
        Math.abs(foe.position.y - clickPoint.y) < 20
      )
      
      if (foeIndex !== -1) {
        if (this.selectedFoe === foeIndex) {
          this.selectedFoe = null
        }
        this.foes.splice(foeIndex, 1)
      }
    },
    selectFoe(index) {
      if (this.selectedFoe === index) {
        this.selectedFoe = null
      } else {
        this.selectedFoe = index
      }
      this.foes.forEach((foe, i) => {
        foe.selected = i === this.selectedFoe
      })
    },
    handleKeyDown(event) {
      if (this.selectedFoe === null) return
      
      const foe = this.foes[this.selectedFoe]
      if (!foe) return
      
      switch (event.key) {
        case 'ArrowUp': foe.move('up'); break
        case 'ArrowDown': foe.move('down'); break
        case 'ArrowLeft': foe.move('left'); break
        case 'ArrowRight': foe.move('right'); break
      }
    },
    startGameLoop() {
      this.lastFrameTime = performance.now()
      this.gameLoop()
    },
    stopGameLoop() {
      cancelAnimationFrame(this.animationFrameId)
    },
    gameLoop(timestamp) {
      const deltaTime = timestamp - this.lastFrameTime
      this.lastFrameTime = timestamp
      
      this.updateGame(deltaTime)
      this.animationFrameId = requestAnimationFrame(this.gameLoop)
    },
    updateGame(deltaTime) {
      // Атака противника башней
      this.towers.forEach(tower => {
        if (!tower.canAttack(this.lastFrameTime)) return
        
        // Поиск ближайшего противнка(ов)
        let foesInRange = []
        let closestFoe = null
        let closestDistance = Infinity
        
        this.foes.forEach(foe => {
          const dx = foe.position.x - tower.position.x
          const dy = foe.position.y - tower.position.y
          const distance = dx * dx + dy * dy
          
          if (distance <= tower.range*tower.range && distance < closestDistance) {
            closestDistance = distance
            closestFoe = foe

            // foesInRange.add(foe)
          }
        })

        /*

        if (foesInRange.) {
          this.foesInRange.forEach(foe => {
            const dmg = tower.attack(foe, this.lastFrameTime)
            if (foe.takeDamage(dmg)) {
              const foeIndex = this.foes.indexOf(foe)
              if (foeIndex !== -1) {
                this.foes.splice(foeIndex, 1)
                if (this.selectedFoe === foeIndex) {
                  this.selectedFoe = null
                }
              }

              tower.kills++
              if (tower.kills % 10 === 0) {
                tower.levelUp()
              }  
            }
            else {
              tower.target = null
            }
          })
        }
        */
        ///*

        if (closestFoe) {
          const damage = tower.attack(closestFoe, this.lastFrameTime)
          if (closestFoe.takeDamage(damage)) {
            // Противник уничтожен
            const foeIndex = this.foes.indexOf(closestFoe)
            if (foeIndex !== -1) {
              this.foes.splice(foeIndex, 1)
              if (this.selectedFoe === foeIndex) {
                this.selectedFoe = null
              }
            }
            
            tower.kills++
            if (tower.kills % 10 === 0) {
              tower.levelUp()
            }
          }
        } else {
          tower.target = null
        }

        //*/
      })
    }
  }
}
</script>

<style lang="less">
.game-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;

  &__level-selector {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: #2c3e50;
  }

  &__level-button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3aa876;
    }

    &--active {
      background-color: #1a7a56;
      font-weight: bold;
    }
  }

  &__game-area {
    position: relative;
    flex-grow: 1;
    background-color: #e0e0e0;
    overflow: hidden;
  }
}
</style>