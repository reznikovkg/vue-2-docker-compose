import { GameEngine } from "@/engine/game-engine";

export default {
  namespaced: true,
  state: {
    engine: new GameEngine(),
  },
}
