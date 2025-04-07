class char {
    constructor (_name, _iconPath, _stats, _multipliers, _actions, _items, _tasks) {
        this.name = _name;
        this.stats = _stats;
        this.multipliers = _multipliers;
        this.charStatus = 'idle';
        this.actions = _actions;
        this.items = _items;
        this.tasks = _tasks;
        this.iconPath = _iconPath;
    }
    
    addEnergy (amount) {
        let multipliedAmount = amount * this.multipliers.energy;

        if (this.stats.energy < 100 && this.stats.energy + multipliedAmount >= 100) {
            this.stats.energy = 100;
        } else if (this.stats.energy < 100) {
            this.stats.energy += multipliedAmount;
        }
    }

    reduceEnergy (amount) {
        if (this.stats.energy - amount == 0) {
            this.stats.energy = 0;
        } else if (this.stats.energy > 0 && this.stats.energy - amount > 0) {
            this.stats.energy -= amount;
        } else {
            throw 'Not enough energy left.';
        }
    }

    addMoney (amount) {
        this.stats.money += amount * this.multipliers.money;
    }

    takeMoney (amount) {
        if (this.stats.money - amount == 0) {
            this.stats.money = 0;
        } else if (this.stats.money > 0 && this.stats.money - amount > 0) {
            this.stats.money -= amount;
        } else {
            throw "Not enough money left."
        }
    }

    doAction (action) {
        if (action.isOnCooldown) {
            throw 'Action is on cooldown.';
        } else if (this.charStatus !== 'idle') {
            throw 'Character is busy.';
        }

        if (action.requirements && action.returns) {
            if (action.returns && action.returns.energy && this.stats.energy == 100) {
                throw 'Energy already full.';
            }

            if (action.requirements) {
                if (action.requirements.energy) {
                    this.reduceEnergy(action.requirements.energy);
                }
                if (action.requirements.money) {
                    this.takeMoney(action.requirements.money)
                }
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
            
        }, action.duration);
        setTimeout(() => {
            action.isOnCooldown = false;
            
        }, action.actionCooldown);
    }

    equipItem (item) {
        if (item.isEquipped) {
            throw 'Item already equipped.';
        }

        this.takeMoney(item.cost);
        item.isEquipped = true;
        this.multipliers.energy += item.multipliers.energy;
        this.multipliers.money += item.multipliers.money
    }
}


const initialCatChar = new char(
    'Cat',
    'img/char/cat.png',
    {energy: 100, money: 0},
    {energy: 1.0, money: 1.0},
    // actions
    [
        {
            name: 'Sing',
            verb: 'Singing',
            cooldown: 30,
            isOnCooldown: false,
            requirements: {energy: 30},
            returns: {money: 100},
            actionCooldown: 15000,
            duration: 5000,
            desc: 'Get a bit of money for a bit of energy.'
        },
        {
            name: 'Spin',
            verb: 'Spinning',
            cooldown: 60,
            isOnCooldown: false,
            requirements: {energy: 90},
            returns: {money: 1000},
            actionCooldown: 10000,
            duration: 2000,
            desc: 'Earn a lot of money for a lot of energy.'
        },
        {
            name: 'Sleep',
            verb: 'Sleeping',
            cooldown: 120,
            isOnCooldown: false,
            requirements: {energy:0, money:400},
            returns: {energy: 100},
            actionCooldown: 30000,
            duration: 10000,
            desc: 'Restore energy at the cost of some money.'
        }
    ],
    // items
    [
        {
            name: 'Hat',
            iconPath: 'img/items/hat.webp',
            isEquipped: false,
            cost: 300,
            multipliers: {energy: 0.1, money: 0.2},
            desc: 'A funny hat. Gives you a bit more money and energy.'
        },
        {
            name: 'Necklace',
            iconPath: 'img/items/necklace.png',
            isEquipped: false,
            cost: 1200,
            multipliers: {energy: 2.0, money: 0.0},
            desc: 'A weird necklace that looks like a pine tree. Gives you twice as much energy.'
        }
    ],
    // tasks
    [
        {
            name: 'click_task',
            returns: {energy: 100, money: 1000000},
            desc: 'Click the button to complete the task'
        }
    ]
);


export {
    initialCatChar,
    char
};