<template>
  <div class="grid" :style="gridStyle">
    <GameCell
      v-for="(cell, index) in cells"
      :key="index"
      :cell="cell"
      @click="({ x, y }) => handleCellClick({ x, y })"
      @hover="({ x, y }) => handleCellHover({ x, y })"
      @leave="({ x, y }) => handleCellLeave({ x, y })"
      @delete="({ x, y }) => handleDelete({ x, y })"
    ></GameCell>
    <PersonComponent
      v-for="person in people"
      :key="person.id"
      :x="person.x"
      :y="person.y"
      :style="{ opacity: person.state === 'waiting' ? 0 : 1 }"
    />
  </div>
</template>

<script>
import GameCell from "./GameCell.vue";
import { generatePersonId } from "@/utils/idGenerator";
import PersonComponent from "./PersonComponent.vue";
import { mapState, mapActions } from "vuex";
import GateBuilding from "../buildItems/GateBuilding.vue";

export default {
  name: "GameGrid",
  components: {
    GameCell,
    PersonComponent,
  },
  props: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      cellMap: new Map(),
      canBuildStatus: true,
      selectedArea: [],
      HouseCounter: 0,
      gateX: 0,
      gateY: 0,
      people: [],
    };
  },
  watch: {
    HouseCounter(newVal) {
      this.syncPeopleWithHouses(newVal);
    },
  },
  computed: {
    ...mapState("selection", ["selectedItem"]),
    ...mapState("grid", ["cells", "buildings"]),
    gridStyle() {
      return {
        display: "grid",
        gridTemplateColumns: `repeat(${this.x}, 1fr)`,
        gridTemplateRows: `repeat(${this.y}, 1fr)`,
      };
    },
  },
  mounted() {
    this.initializeGrid({ x: this.x, y: this.y });

    let cellCount = 0;
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        this.cellMap.set(`${i}-${j}`, cellCount);
        cellCount++;
      }
    }
    let GridWidth = Math.sqrt(this.cells.length);
    let index = this.cells.length - GridWidth / 2;
    this.gateX = GridWidth - 1;
    this.gateY = GridWidth / 2;
    this.updateCells({ index: index, updates: { children: GateBuilding, type: -1, isOccupied: true } });
    this.setBuilding({
      key: `${this.gateX}-${this.gateY}`,
      building: {
        occupies: [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ],
        index: index,
      },
    });
    this.tickInterval = setInterval(this.updatePeople, 1000); // 1 раз в секунду
  },
  methods: {
    ...mapActions("grid", [
      "initializeGrid",
      "updateCells",
      "setBuilding",
      "deleteBuilding",
      "incrementCounter",
      "decrementCounter",
    ]),

    findCellIndex(x, y) {
      return this.cellMap.get(`${x}-${y}`) ?? -1;
    },
    handleCellHover({ x, y }) {
      this.canBuildStatus = true;

      if (this.selectedItem) {
        const index = this.findCellIndex(x, y);
        const cellArr = [];
        let active = "active_blue";

        for (let i = x + this.selectedItem.occupies[0].x; i <= x + this.selectedItem.occupies[1].x; i++) {
          for (let j = y + this.selectedItem.occupies[0].y; j <= y + this.selectedItem.occupies[1].y; j++) {
            const localIndex = this.findCellIndex(i, j);
            cellArr.push(localIndex);

            if (localIndex === -1 || this.cells[localIndex].isOccupied) {
              active = "active_red";
              this.canBuildStatus = false;
            }
          }
        }
        this.selectedArea = [...cellArr];

        cellArr.forEach((item) => {
          if (item >= 0) {
            this.updateCells({ index: item, updates: { activeClass: active } });
          }
        });
        this.updateCells({ index: index, updates: { temp: this.selectedItem?.component ?? null } });
      }
    },
    handleCellLeave({ x, y }) {
      const index = this.findCellIndex(x, y);
      if (this.selectedItem) {
        for (let i = x + this.selectedItem.occupies[0].x; i <= x + this.selectedItem.occupies[1].x; i++) {
          for (let j = y + this.selectedItem.occupies[0].y; j <= y + this.selectedItem.occupies[1].y; j++) {
            const localIndex = this.findCellIndex(i, j);

            if (localIndex >= 0) {
              this.updateCells({ index: localIndex, updates: { activeClass: null } });
            }
          }
        }
        this.updateCells({ index: index, updates: { temp: null } });
      }
    },
    handleCellClick({ x, y }) {
      if (!(this.selectedItem != null && this.canBuildStatus)) {
        return;
      }

      const index = this.findCellIndex(x, y);
      this.updateCells({
        index: index,
        updates: { children: this.selectedItem.component, type: this.selectedItem.type },
      });
      this.setBuilding({
        key: `${x}-${y}`,
        building: {
          occupies: this.selectedItem.occupies,
          index: index,
        },
      });
      this.HouseCounter++;
      this.canBuildStatus = false;

      this.selectedArea.forEach((index) => {
        this.updateCells({ index: index, updates: { isOccupied: true, activeClass: "active_red" } });
      });
      if (this.selectedItem.type !== 0) {
        const entry = this.selectedItem.entry;
        const entryIndex = this.findCellIndex(x + entry.x, y + entry.y);
        this.updateCells({
          index: entryIndex,
          updates: { type: 2, buildCordsX: x, buildCordsY: y, activeClass: "active_green" },
        });
      }
    },
    handleDelete({ x, y }) {
      const occupies = this.buildings.get(`${x}-${y}`).occupies;
      const index = this.findCellIndex(x, y);
      if (this.cells[index].type === -1) {
        return;
      }
      this.deleteBuilding({ x, y });
      this.HouseCounter--;
      this.updateCells({ index: index, updates: { isOccupied: false, children: null, type: null } });
      for (let i = x + occupies[0].x; i <= x + occupies[1].x; i++) {
        for (let j = y + occupies[0].y; j <= y + occupies[1].y; j++) {
          const localIndex = this.findCellIndex(i, j);
          this.updateCells({ index: localIndex, updates: { isOccupied: false, type: null } });
          //   this.cells[localIndex].activeClass = null;
        }
      }
    },
    randomBetween(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    syncPeopleWithHouses(houseCount) {
      const maxPeople = houseCount;
      console.log(maxPeople);
      const currentCount = this.people.length;

      if (currentCount < maxPeople) {
        // Добавляем новых людей
        for (let i = currentCount; i < maxPeople; i++) {
          this.people.push({
            id: generatePersonId(),
            x: this.gateX, // начальные координаты
            y: this.gateY,
            state: "waiting",
            spawnTimer: this.randomBetween(1, 10),
          });
        }
      } else if (currentCount > maxPeople) {
        // Удаляем лишних
        this.people.splice(maxPeople);
      }
    },

    updatePeople() {
      this.people.forEach((person) => {
        if (person.state === "walking") {
          const newCords = this.getRandomNearbyRoad(person.x, person.y);
          const newIndex = this.findCellIndex(newCords.x, newCords.y);
          const buildIndex = this.findCellIndex(this.cells[newIndex].buildCordsX, this.cells[newIndex].buildCordsY);
          if (newCords) {
            person.x = newCords.x;
            person.y = newCords.y;

            if (this.cells[newIndex].type === 2) {
              person.state = "waiting";
              person.spawnTimer = this.randomBetween(5, 15);
              this.incrementCounter(buildIndex);
            }
          }
        }

        if (person.state === "waiting") {
          person.spawnTimer--;
          if (person.spawnTimer <= 0) {
            const newCords = this.getRandomNearbyRoad(person.x, person.y);
            const prevIndex = this.findCellIndex(person.x, person.y);
            const buildIndex = this.findCellIndex(this.cells[prevIndex].buildCordsX, this.cells[prevIndex].buildCordsY);

            if (newCords) {
              person.state = "walking";
              person.x = newCords.x;
              person.y = newCords.y;
              console.log(prevIndex);
              if (this.cells[prevIndex].type != -1) {
                this.decrementCounter(buildIndex);
              }
            }
          }
        }
      });
    },

    getRandomNearbyRoad(x, y) {
      const directions = [
        { dx: -1, dy: 0 }, // слева
        { dx: 1, dy: 0 }, // справа
        { dx: 0, dy: -1 }, // сверху
        { dx: 0, dy: 1 }, // снизу
      ];

      const nearbyRoads = directions
        .map(({ dx, dy }) => {
          const nx = x + dx;
          const ny = y + dy;
          const index = this.findCellIndex(nx, ny);
          if (index >= 0 && this.cells[index]?.type !== null) {
            return { x: nx, y: ny };
          }
          return null;
        })
        .filter(Boolean);

      if (nearbyRoads.length === 0) {
        return null;
      }

      const randomIndex = Math.floor(Math.random() * nearbyRoads.length);
      return nearbyRoads[randomIndex];
    },
  },
};
</script>

<style lang="less">
.grid {
  z-index: 1;
  transform: rotateX(45deg) rotateZ(45deg);
  transform-origin: center;
  background: url("../../assets/grass.jpg") left / 100% 100% no-repeat;
}
</style>
