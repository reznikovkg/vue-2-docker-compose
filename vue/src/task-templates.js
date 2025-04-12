const getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


class CharSequenceTask {
    
    

    constructor() {
        this.returnsRanges = {
            energy: {min: 10, max: 50},
            money: {min: 100, max: 12000}
        };
        this.type = 'sequence';
        this.lengthRange = {min: 4, max: 10};

        this.returns = {
            energy: getRandomInRange(this.returnsRanges.energy.min, this.returnsRanges.energy.max),
            money: getRandomInRange(this.returnsRanges.money.min, this.returnsRanges.money.max)
        };
        this.desc = `Rewards: ${this.returns.energy} Money: ${this.returns.money}`;

        this.targetLength = getRandomInRange(this.lengthRange.min, this.lengthRange.max);
        this.targetWord = ''
        let len = 0;
        while (len < this.targetLength) {
            this.targetWord += String.fromCharCode(getRandomInRange(65, 126));
            len++;
        }

        console.log(`Created ${this.type} task for ${this.returns.energy} energy and ${this.returns.money} money`);
    }

    doTask (input) {
        return this.targetWord === input;
    }
}


export { CharSequenceTask };