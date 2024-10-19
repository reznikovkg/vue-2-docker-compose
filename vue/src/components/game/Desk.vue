<template>
  <div class="desk">
    <div>
      <GameDeskLine :cards="opponentRangeCards" :isMelee="false" />
      <GameDeskLine :cards="opponentMeleeCards" :isMelee="true" />
    </div>
    <div class="separator">
      <span class="line" />
      <span class="text">VS</span>
      <span class="line" />
    </div>
    <div>
      <GameDeskLine :cards="playerMeleeCards" :isMelee="true" />
      <GameDeskLine :cards="playerRangeCards" :isMelee="false" />
    </div>
  </div>
</template>

<script>
import GameDeskLine from "./DeskLine";

export default {
  components: {
    GameDeskLine,
  },
  name: "GameDesk",
  props: {
    playerMeleeCards: {
      type: Array,
      default() {
        return [];
      },
    },
    playerRangeCards: {
      type: Array,
      default() {
        return [];
      },
    },
    opponentMeleeCards: {
      type: Array,
      default() {
        return [];
      },
    },
    opponentRangeCards: {
      type: Array,
      default() {
        return [];
      },
    },
  },
}
</script>

<style scoped lang="less">
.desk {
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}

.separator {
  display: flex;

  align-items: center;
  text-align: center;

  margin: 20px 0;
}

.line {
  flex: 1;
  height: 2px;

  background-color: rgb(204, 204, 204);
  margin: 0 10px;
}

.text {
  font-weight: bold;
  color: rgb(51, 51, 51);
  font-size: 32px;
}
</style>
