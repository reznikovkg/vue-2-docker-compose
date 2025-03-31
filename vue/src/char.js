class char {
    constructor (_name, _charImagePath, _actions, _items, _tasks) {
        this.name = _name;
        this.energy = 100;
        this.money = 0;
        this.charStatus = 'idle';
        this.actions = _actions;
        this.items = _items;
        this.tasks = _tasks;
        this.charImagePath = _charImagePath;
    }
    
    addEnergy (amount) {
        if (this.energy < 100 && this.energy + amount >= 100) {
            this.energy = 100;
        } else if (this.energy < 100) {
            this.energy += amount;
        } else {
            throw 'Energy already full.';
        }
    }

    reduceEnergy (amount) {
        if (this.energy > 0 && this.energy - amount <= 100) {
            this.energy = 0;
        } else if (this.energy > 0) {
            this.energy += amount;
        } else {
            throw 'No energy left.';
        }
    }

    addMoney (amount) {
        this.money += amount;
    }

    takeMoney (amount) {
        if (this.money > 0 && this.money - amount <= 0) {
            this.money = 0;
        } else if (this.money > 0) {
            this.money -= amount;
        } else {
            throw "No money left."
        }
    }

    doAction (requirements, returns) {
        if (requirements.energy) {
            this.reduceEnergy(requirements.energy);
        }
        if (requirements.money) {
            this.takeMoney(requirements.money)
        }

        if (returns) {
            if (returns.energy) {
                this.addEnergy(returns.energy);
            }
            if (returns.money) {
                this.addMoney(returns.money);
            }
        }
    }
}


export default new char(
    'CREATURE',
    '@/assets/cat.png',
    [
        {
            id: 1,
            name: 'Sing',
            cooldown: 30,
            requirements: {energy: 30},
            gives: null
        },
        {
            id: 2,
            name: 'Spin',
            cooldown: 60,
            requirements: {energy: 90},
            gives: {money: 1000}
        },
        {
            id: 3,
            name: 'Sleep',
            cooldown: 120,
            requirements: {energy:0, money:400},
            gives: {energy: 100}
        }
    ],
    [],
    []
);