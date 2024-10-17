type UpdateCallback = (newHeight: number) => void;

export default class BirdEngine {
  private birdHeight: number;
  private gravity: number;
  private jumpHeight: number;
  private gameInterval: NodeJS.Timeout | null;
  private pipeInterval: NodeJS.Timeout | null;
  private updateCallbacks: UpdateCallback[];

  constructor() {
    this.birdHeight = 300;
    this.gravity = 20;
    this.jumpHeight = 150;
    this.gameInterval = null;
    this.pipeInterval = null;
    this.updateCallbacks = [];
  }

  public startGameLoop(): void {
    this.gameInterval = setInterval(() => {
      this.updateGame();
    }, 100);
  }

  private updateGame(): void {
    if (this.birdHeight + 185 < window.outerHeight) {
      this.birdHeight += this.gravity;
      this.notifyUpdate();
    }
  }

  public birdFly(): void {
    this.birdHeight -= this.jumpHeight;
    this.notifyUpdate();
  }

  private notifyUpdate(): void {
    this.updateCallbacks.forEach((callback) => callback(this.birdHeight));
  }

  public onUpdate(callback: UpdateCallback): void {
    this.updateCallbacks.push(callback);
  }

  public clearCallbacks(): void {
    this.updateCallbacks = [];
  }

  public stopGameLoop(): void {
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
    }
    if (this.pipeInterval) {
      clearInterval(this.pipeInterval);
    }
  }
}
