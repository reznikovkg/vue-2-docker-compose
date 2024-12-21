export class Mulligan {
  MAX_MULLIGAN_CARDS_QUANTITY = 3;

  player = null;
  indexesToRemove = null;

  constructor(player) {
    this.player = player;
    this.reset();
  }

  tryGetNewCardStatus(index) {
    return this.indexesToRemove.has(index)
      ? this.unmark(index)
      : this.mark(index);
  }

  mark(index) {
    const SUCCESS_VALUE = true;

    if (this.indexesToRemove.size < this.MAX_MULLIGAN_CARDS_QUANTITY) {
      this.indexesToRemove.add(index);
      return SUCCESS_VALUE;
    }

    return !SUCCESS_VALUE;
  }

  unmark(index) {
    const SUCCESS_VALUE = false;
    this.indexesToRemove.delete(index);

    return SUCCESS_VALUE;
  }

  perform() {
    this.player.performMulligan([...this.indexesToRemove]);
    this.reset();
  }

  reset() {
    this.indexesToRemove = new Set();
  }
}
