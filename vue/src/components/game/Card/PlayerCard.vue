<template>
    <div
        class="card"
        @click="clickCard"
    >
        <p class="card__text">{{cardStruct.name}}</p>
        <p class="card__text">цена: {{cardStruct.cost}}</p>
        <p class="card__text">атака: {{cardStruct.attack}}</p>
        <p class="card__text">защита: {{cardStruct.defence}}</p>
    </div>
</template>

<script>
import { Cards } from "@/gameLogic/cards"
import game from "@/gameLogic/engine"

export default {
    name: "PlayerCard",
    props: ["cardId"],
    computed: {
        cardStruct() {
            return Cards[this.cardId]
        },
    },
    methods: {
        clickCard(){
          game.activateCard(this.$vnode.key)
        },
    }
}
</script>

<style lang="less">
  @import "./styles/style";
</style>