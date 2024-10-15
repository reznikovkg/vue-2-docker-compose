type Pipe = {
  direction: "up" | "down";
  height: number;
  positionX: number;
};

type UpdateCallback = (pipes: Pipe[]) => void;

export default class PipeEngine {
  private pipes: Pipe[] = [];
  private pipeInterval: number | null = null;
  private gameInterval: number | null = null;
  private updateCallbacks: UpdateCallback[] = [];

  startPipeGeneration(): void {
    this.pipeInterval = window.setInterval(() => {
      const direction: "up" | "down" = Math.random() < 0.5 ? "up" : "down";
      const height: number = this.getRandomInt(200, 600);
      this.pipes.push({
        direction,
        height,
        positionX: 100, // Начальная позиция труб
      });
      this.notifyUpdate();
    }, 1500);
  }

  startGameLoop(): void {
    this.gameInterval = window.setInterval(() => {
      this.pipes = this.pipes.map((pipe) => ({
        ...pipe,
        positionX: pipe.positionX - 1,
      }));
      this.notifyUpdate();
    }, 100);
  }

  private notifyUpdate(): void {
    this.updateCallbacks.forEach((callback) => callback(this.pipes));
  }

  onUpdate(callback: UpdateCallback): void {
    this.updateCallbacks.push(callback);
  }

  stopGame(): void {
    if (this.pipeInterval !== null) {
      clearInterval(this.pipeInterval);
    }
    if (this.gameInterval !== null) {
      clearInterval(this.gameInterval);
    }
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
