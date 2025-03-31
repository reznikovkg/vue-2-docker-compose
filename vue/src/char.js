class char {
    constructor () {
        this.energy = 100;
        this.money = 0;
        this.charStatus = 'idle';
    }
    
    addEnergy (incriment) {
        if (this.energy < 100 && this.energy + incriment >= 100) {
            this.energy = 100;
        } else if (this.energy < 100) {
            this.energy += incriment;
        }
    }

    reduceEnergy (incriment) {
        if (this.energy > 0 && this.energy - incriment <= 100) {
            this.energy = 0;
        } else if (this.energy > 0) {
            this.energy += incriment;
        }
    }
}

export default char;