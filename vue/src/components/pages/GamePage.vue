<template>
    <div>
        <PlayerPanel
                :hand="gameState.otherPlayerCards"
                :deck="gameState.otherPlayerDeck"
                :face-hp="gameState.otherPlayerHp"
                :is-other-player="true"
        />
        <GameField :creatures="gameState.otherPlayerCreatures"/>
        <GameField :creatures="gameState.thisPlayerCreatures"/>
        <PlayerPanel
                :hand="gameState.thisPlayerCards"
                :deck="gameState.thisPlayerDeck"
                :face-hp="gameState.thisPlayerHp"
                :mana="gameState.thisPlayerMana"
                :is-other-player="false"
        />

    </div>
</template>

<script>
import PlayerPanel from "@/components/game/PlayerPanel/PlayerPanel.vue";
import GameField from "@/components/game/Field/GameField.vue";
import game from "@/gameLogic/engine"

export default {
    name: "GamePage",
    data() {
        return {gameState: game.getGameState()}
    },
    components: {GameField, PlayerPanel},
}
</script>