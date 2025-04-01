class char {
    constructor (_name, _actions, _items, _tasks) {
        this.name = _name;
        this.energy = 100;
        this.money = 0;
        this.energyRecievedMult = 1.0;
        this.moneyRecievedMult = 1.0;
        this.charStatus = 'idle';
        this.actions = _actions;
        this.items = _items;
        this.tasks = _tasks;
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

    doAction (action) {
        if (action.isOnCooldown) {
            throw 'Action is on cooldown.';
        } else if (this.charStatus !== 'idle') {
            throw 'Character is busy.';
        }

        if (action.requirements && action.returns) {
            if (action.requirements.energy) {
                this.reduceEnergy(action.requirements.energy);
            }
            if (action.requirements.money) {
                this.takeMoney(action.requirements.money)
            }
    
            if (action.returns) {
                if (action.returns.energy) {
                    this.addEnergy(action.returns.energy);
                }
                if (action.returns.money) {
                    this.addMoney(action.returns.money);
                }
            }

            action.isOnCooldown = true;
            this.charStatus = action.verb;
        }
        
        setTimeout(() => {
            this.charStatus = 'idle';
            action.isOnCooldown = false;
            
        }, action.actionCooldown);
    }
}


export default new char(
    'CREATURE',
    [
        {
            id: 1,
            name: 'Sing',
            verb: 'Singing',
            cooldown: 30,
            isOnCooldown: false,
            requirements: {energy: 30},
            returns: {money: 100},
            actionCooldown: 5000,
            desc: 'Sing a little and get a bit of money.'
        },
        {
            id: 2,
            name: 'Spin',
            verb: 'Spinning',
            cooldown: 60,
            isOnCooldown: false,
            requirements: {energy: 90},
            returns: {money: 1000},
            actionCooldown: 10000,
            desc: 'Use most of your energy to earn money.'
        },
        {
            id: 3,
            name: 'Sleep',
            verb: 'Sleeping',
            cooldown: 120,
            isOnCooldown: false,
            requirements: {energy:0, money:400},
            returns: {energy: 100},
            actionCooldown: 30000,
            desc: 'Restore energy at the cost of some money.'
        }
    ],
    [],
    []
);