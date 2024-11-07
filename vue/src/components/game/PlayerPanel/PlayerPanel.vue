<template>
  <div class="panel">
      <div v-if="!isOtherPlayer" class="panel__hp">
          {{faceHp}}
      </div>
      <div class="panel__player">
          <div v-if="isOtherPlayer" class="panel__hand__empty">
              <div > Карт в руке: {{hand.length}}</div>

          </div>
          <div v-else class="panel__hand">
              <PlayerCard
                      v-for="(cardId, index) in hand"
                      :card-id="cardId"
                      v-bind:key="index"
              />
          </div>
          <div class="panel__content"></div>
          <div class="panel__content">
              <div>Карт в колоде: {{deck}}</div>
              <br>
              <div v-if="!isOtherPlayer">Мана: {{mana}}</div>
              <div
                  v-if="!isOtherPlayer"
                  class="panel__button"
                  @click="endMove"
              >Конец Хода</div>
          </div>
      </div>
      <div v-if="isOtherPlayer" class="panel__hp">
          {{faceHp}}
      </div>
  </div>
</template>

<script>
import PlayerCard from "@/components/game/Card/PlayerCard.vue";
import game from "@/gameLogic/engine";

export default {
    name: "PlayerPanel",
    components: {PlayerCard},
    props: ["hand", "deck", "faceHp", "isOtherPlayer", "mana"],
    methods: {
        endMove: game.endMove
    },
}
</script>

<style lang="less">
  @import "./styles/style";
</style>