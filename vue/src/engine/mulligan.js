export class Mulligan {
  player = null;
  indexesToRemove = null;

  constructor(player) {
    this.player = player;
    this.reset();
  }

  perform() {
    this.player.performMulligan([...this.indexesToRemove]);
    this.reset();
  }

  reset() {
    this.indexesToRemove = new Set();
  }
}
