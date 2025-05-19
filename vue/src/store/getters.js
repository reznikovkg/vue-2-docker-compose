export default {
    isGameActive: state => state.gameStarted && !state.gameOver,
}