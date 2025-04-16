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
        this.reqProps = {textInput: true};

        this.targetLength = getRandomInRange(this.lengthRange.min, this.lengthRange.max);
        this.targetWord = ''
        let len = 0;
        while (len < this.targetLength) {
            this.targetWord += String.fromCharCode(getRandomInRange(65, 126));
            len++;
        }

        this.name = 'Character sequence task';
        this.howto = `Type <span class="text__highlight">${this.targetWord}</span> into the field`;
        this.desc = `Repeat a sequence of characters`;

        console.log(`Created ${this.type} task for ${this.returns.energy} energy and ${this.returns.money} money`);
    }

    doTask (formData) {
        const inputWord = formData.get('textInput');

        console.log(`trying task ${this} of ${this.type} type with ${formData} data`)
        console.log(`${this.targetWord} === ${inputWord}`, this.targetWord === inputWord)
        if (this.targetWord !== inputWord) {
            throw 'Incorrect sequence';
        }
    }
}


export { CharSequenceTask };