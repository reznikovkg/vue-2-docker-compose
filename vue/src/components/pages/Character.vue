<template>
    <PageLayout>
        <MenuListLayout class="side-menu__wrapper">
            <div class="menu__block__wrapper">
                <div class="menu__tag text__primary">Character</div>
            </div>
            <div class="menu__block__wrapper">
                <span class="stats__text text__secondary">{{ character.stats.money }}</span>
                <img class="stats__icon" src="@/assets/img/rupee.svg" alt="">
                <span v-if="moneyChangeStatus!==0" v-bind:class="moneyChangeTypeClass" class="stats__change__text text__secondary">{{ moneyChangeText }}</span>
            </div>
            <div class="menu__block__wrapper">
                <span class="stats__text text__secondary">{{ character.stats.energy }}/100</span>
                <img class="stats__icon" src="@/assets/img/energy_bolt.svg" alt="">
                <span v-if="energyChangeStatus!==0" v-bind:class="energyChangeTypeClass" class="stats__change__text text__secondary">{{ energyChangeText }}</span>
            </div>
            <div class="menu__block__wrapper">
                <button v-on:click="openItemsModal" class="modal-button">
                    <div class="modal-button__tag text__secondary">Items</div>
                    <img class="modal-button__icon" src="@/assets/img/items.svg" alt="">
                </button>
            </div>
            <div class="menu__block__wrapper">
                <button v-on:click="openTasksModal" class="modal-button">
                    <div class="modal-button__tag text__secondary">Tasks</div>
                    <img class="modal-button__icon" src="@/assets/img/tasks.svg" alt="">
                </button>
            </div>
            <div class="menu__block__wrapper">
                <button v-on:click="openActiveTasksModal" class="modal-button wide-button">
                    <div class="modal-button__tag text__secondary">Active Tasks</div>
                    <img class="modal-button__icon" src="@/assets/img/tasks.svg" alt="">
                </button>
            </div>
        </MenuListLayout>
        
        <div id="char-screen__wrapper">
            <div id="char__info__wrapper">
                <p class="text__primary" id="char-name">{{ character.name }}</p>
                <p class="text__secondary" id="char-status">{{ character.charStatus }}</p>
            </div>
            <img id="char-img" :src="require(`@/assets/${character.iconPath}`)" alt="">
        </div>
        
        <MenuListLayout class="side-menu__wrapper">
            <div class="menu__block__wrapper">
                <div class="menu__tag text__primary">Actions</div>
            </div>
            <div v-for="(action, index) in character.actions" :key="index" class="menu__block__wrapper">
                <button v-on:click="charAction(action)" class="action-button"
                v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip"
                v-bind:data-desc="action.desc" v-bind:disabled="action.isOnCooldown">
                <div class="action-button__tag text__secondary">{{ action.name }}</div>
            </button>
        </div>
    </MenuListLayout>
    
    
    <MenuGridModalLayout ref="itemsModal">
        <div v-for="(item, index) in character.items" :key="index" class="grid-menu__button__wrapper">
            <button v-on:click="buyItem(item)" v-bind:class="{'item__equipped': item.isEquipped}" v-bind:disabled="item.isEquipped" class="item__button"
            v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip" v-bind:data-desc="item.desc+'\n'+'Price:'+item.cost">
            <img :src="require(`@/assets/${item.iconPath}`)" alt="" class="item__icon">
        </button>
    </div>
</MenuGridModalLayout>
<MenuGridModalLayout ref="tasksModal">
    <div v-for="(task, index) in inactiveTasks" :key="index" class="grid-menu__button__wrapper">
        <button v-on:click="activateTask(task, index)" v-bind:data-taskid="index" class="task__button">
            <img :src="require(`@/assets/img/tasks/${task.type}.svg`)" alt="" class="task__icon">
            <p class="task__name text__secondary">{{ task.name }}</p>
            <p class="task__desc text__secondary">{{ task.desc }}</p>
        </button>
    </div>
</MenuGridModalLayout>
<MenuListModalLayout ref="activeTasksModal">
    <div v-for="(task, index) in activeTasks" :key="index" class="menu__block__wrapper task__menu__block__wrapper">
        <form v-on:submit="tryTask(task, index, $event)" class="task__form">
            <img :src="require(`@/assets/img/tasks/${task.type}.svg`)" class="task__icon">
            <h3 class="task__form__title text__primary">{{ task.name }}</h3>
            <p class="task__form__howto text__secondary" v-html="task.howto"></p>
            <div>
                <input v-if="task.reqProps.textInput" type="text" class="task__form__text-input" name="textInput">
            </div>
            <button type="submit" class="task__form__submit-button text__primary">Finish task</button>
        </form>
    </div>
</MenuListModalLayout>

<TooltipLayout v-if="isTooltipVisible" :style="{top: `${tooltipYpos}px`, left: `${tooltipXpos}px`}" id="tooltip__wrapper">
    <p class="text__secondary" id="tooltip__text">{{ tooltipText }}</p>
</TooltipLayout>

<TooltipLayout v-if="isErrorRaised" id="error__wrapper">
    <p class="text__secondary" id="error__text">{{ errorText }}</p>
</TooltipLayout>
</PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import TooltipLayout from '../parts/TooltipLayout.vue';
import MenuGridModalLayout from '../parts/MenuGridModalLayout.vue';
import MenuListModalLayout from '../parts/MenuListModalLayout.vue';
import { CatChar } from '@/char';


export default {
    name: 'CharPage',
    components: {
        PageLayout,
        MenuListLayout,
        TooltipLayout,
        MenuGridModalLayout,
        MenuListModalLayout
    },
    
    data () {
        return {
            character: null,
            stats: null,
            multipliers: null,
            items: null,
            oldStatsCache: null,
            
            inactiveTasks: [],
            activeTasks: [],
            
            isTooltipVisible: false,
            energyChangeStatus: 0,
            moneyChangeStatus: 0,
            isErrorRaised: false,
            tooltipYpos: 0,
            tooltipXpos: 0,
            tooltipText: '',
            moneyChangeText: '',
            energyChangeText: '',
            errorText: '',
            saveTimeout: null,
        };
    },
    
    computed: {
        moneyChangeTypeClass () {
            return {
                'stats__change__positive': this.moneyChangeStatus == 1,
                'stats__change__negative': this.moneyChangeStatus == -1
            };
        },
        
        energyChangeTypeClass () {
            return {
                'stats__change__positive': this.energyChangeStatus == 1,
                'stats__change__negative': this.energyChangeStatus == -1
            };
        }
    },
    
    created () {
        console.log('created')
        this.loadCharData(JSON.parse(localStorage.charStats), JSON.parse(localStorage.charMultipliers), JSON.parse(localStorage.charActions), JSON.parse(localStorage.charItems));
    },
    mounted () {
        console.log('mounted')
        setInterval(this.energyRegenInterval, 5000);
        this.populateTaskList(this.character.tasks, this.character.maxTaskCount);
    },
    
    watch: {
        stats: {
            handler (newStats) {
                console.log('stats changed', this.oldStatsCache, newStats)
                localStorage.charStats = JSON.stringify(newStats);
                
                if (newStats !== this.oldStatsCache) {
                    this.displayStatsChange(newStats, this.oldStatsCache);
                    this.oldStatsCache = {energy: newStats.energy, money: newStats.money};
                }
            },
            deep: true
        },
        multipliers: {
            handler (newMultipliers) {
                console.log('mult changed', newMultipliers)
                localStorage.charMultipliers = JSON.stringify(newMultipliers);
            },
            deep: true
        },
        items: {
            handler (newItems) {
                console.log('items changed', newItems)
                localStorage.charItems = JSON.stringify(newItems);
            },
            deep: true
        }
    },
    
    methods: {
        loadCharData (charStats, charMultipliers, charActions, charItems) {
            console.log('loading data')
            console.log(charStats, charMultipliers, charActions, charItems)
            this.character = new CatChar(charStats, charMultipliers, charActions, charItems);
            this.stats = this.character.stats;
            this.oldStatsCache = {energy: this.stats.energy, money: this.stats.money};
            this.multipliers = this.character.multipliers;
            this.items = this.character.items;
        },
        saveCharData (char) {
            console.log('saving')
            console.log(char.stats, char.multipliers, char.actions, char.items)
            localStorage.charStats = JSON.stringify(char.stats);
            localStorage.charMultipliers = JSON.stringify(char.multipliers);
            localStorage.charActions = JSON.stringify(char.actions);
            localStorage.charItems = JSON.stringify(char.items);
            console.log(JSON.parse(localStorage.charStats), JSON.parse(localStorage.charMultipliers), JSON.parse(localStorage.charActions), JSON.parse(localStorage.charItems))
        },
        
        populateTaskList (tasks, maxTaskCount) {
            for (let task of tasks) {
                let taskCountOfType = Math.floor(Math.random() * (maxTaskCount - 1) + 1);
                let countOfType = 0;
                while (countOfType < taskCountOfType) {
                    this.inactiveTasks.push(new task());
                    countOfType++;
                }
            }
        },
        
        charAction (action) {
            if (!this.isErrorRaised) {
                try {
                    this.character.doAction(action);
                }
                catch(err) {
                    this.displayErrMessage("Can't " + String(action.name).toLowerCase() + '. ' + err);
                }
            }
        },
        
        buyItem (item) {
            try {
                this.character.equipItem(item);
            }
            catch(err) {
                this.displayErrMessage("Can't equip item. " + err)
            }
        },
        
        removeInactiveTask(index) {
            this.inactiveTasks.splice(index, 1);
        },
        removeActiveTask(index) {
            this.activeTasks.splice(index, 1);
        },
        activateTask (task, index) {
            this.activeTasks.push(task);
            this.removeInactiveTask(index);
        },
        tryTask (task, index, event) {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
                this.character.tryTask(task, formData);
                this.removeActiveTask(index);
            } catch (err) {
                this.displayErrMessage(err);
            }
            
        },
        
        energyRegenInterval () {
            try {
                this.character.addEnergy(5);
            }
            catch (err) {
                if (err !== 'Energy already full.') {
                    throw err;
                }
            }
        },
        startSaveTimeout () {
            clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(this.saveCharData, 1000);
        },
        
        displayStatsChange (newStats, oldStats) {
            let energyChange = newStats.energy - oldStats.energy;
            let moneyChange = newStats.money - oldStats.money;
            
            if (energyChange > 0) {
                this.energyChangeStatus = 1;
                this.energyChangeText = '+' + String(energyChange);
            } else if (energyChange < 0) {
                this.energyChangeStatus = -1;
                this.energyChangeText = String(energyChange);
            }
            setTimeout(this.hideEnergyChange, 3000);
            
            if (moneyChange > 0) {
                this.moneyChangeStatus = 1;
                this.moneyChangeText = '+' + String(moneyChange);
            } else if (moneyChange < 0) {
                this.moneyChangeStatus = -1;
                this.moneyChangeText = String(moneyChange);
            }
            setTimeout(this.hideMoneyChange, 3000);
        },
        hideEnergyChange () {
            this.energyChangeStatus = 0;
            this.energyChangeText = '';
        },
        hideMoneyChange () {
            this.moneyChangeStatus = 0;
            this.moneyChangeText = '';
        },
        
        displayErrMessage (message) {
            if (!this.isErrorRaised) {
                this.isErrorRaised = true;
                
                this.errorText = message;
                
                setTimeout(this.hideErrMessage, 2000);
            }
        },
        hideErrMessage () {
            this.isErrorRaised = false;
        },
        
        openItemsModal () {
            this.$refs.itemsModal.openModal();
        },
        openTasksModal () {
            this.$refs.tasksModal.openModal();
        },
        openActiveTasksModal () {
            this.$refs.activeTasksModal.openModal();
        },
        
        showTooltip (event) {
            this.tooltipText = event.target.dataset.desc;
            
            this.tooltipYpos = event.target.offsetTop + event.target.offsetHeight * 0.8;
            this.isTooltipVisible = true;
        },
        hideTooltip () {
            this.isTooltipVisible = false;
            
            this.tooltipText = ''
        },
        moveTooltip (event) {
            this.tooltipXpos = event.clientX - event.target.offsetWidth;
        },
    }
}
</script>

<style scoped lang="less">
.contents {
    text-align: center;
    width: 100%;
    height: 100%;
    padding-top: 5%;
}

.side-menu__wrapper {
    vertical-align: top;
    display: inline-block;
    width: 20%;
}

#char {
    &-name {
        font-size: @sFontLargest;
        margin-bottom: 1%;
        margin-top: 1%;
    }
    
    &-status {
        font-size: @sFontBigger;
        margin-top: 0px;
        margin-bottom: 1%;
    }
    
    &-img {
        display: block;
        margin: auto;
    }
    
    &-screen__wrapper {
        vertical-align: top;
        display: inline-block;
        width: 50%;
        padding: 1%;
    }
}

.stats {
    &__text {
        vertical-align: middle;
        font-size: @sFontBigger;
    }
    
    &__icon {
        vertical-align: middle;
        scale: 150%;
        margin-left: 2%;
        margin-right: 2%;
    }
    
    &__change {
        &__text {
            font-size: @sFontNormal;
        }
        
        &__positive {
            color: @cGood;
        }
        
        &__negative {
            color: @cBad;
        }
    }
}

.action-button {
    width: 30%;
    height: 50px;
    background-color: @cPrimary;
    border-color: @cAccent;
    
    &__tag {
        font-size: @sFontBigger;
    }
}

.modal-button {
    width: 70px;
    height: 70px;
    background-color: @cPrimary;
    border-color: @cAccent;
    
    &__icon {
        scale: 150%;
    }
    
    &__tag {
        font-size: @sFontBigger;
    }
}

.wide-button {
    width: 100px;
    height: 110px;
}

.menu {
    &__block__wrapper {
        display: flex;
        justify-content: center;
        margin-top: 2%;
        margin-bottom: 2%;
    }
    
    &__tag {
        font-size: @sFontLarge;
    }
}

.grid-menu__button__wrapper {
    display: flex;
}

.task {
    &__button {
        background-color: @cPrimary;
        border-color: @cAccent;
        width: 200px;
        height: 200px;
        margin: 4px;
    }
    
    &__icon {
        height: 40%;
    }
    
    &__form {
        width: 70%;
        height: 400px;
        background-color: @cPrimary;
        border: 2px solid @cAccent;
        border-bottom: 2px solid @cShadow;
        border-right: 2px solid @cShadow;
        padding: 20px;
        
        &__title {
            font-size: @sFontBigger;
        }
        
        &__howto {
            font-size: @sFontBigger;
            user-select: none;
        }
        
        &__text-input {
            background-color: @cPrimary;
            border-color: @cAccent;
            color: @cSecondary;
        }
        
        &__submit-button {
            background-color: @cPrimary;
            border-color: @cAccent;
            border-bottom: 2px solid @cShadow;
            border-right: 2px solid @cShadow;
            padding: 4px;
            margin-top: 10px;
            font-size: @sFontBigger;
        }
    }
    
    &__menu__block__wrapper {
        flex-direction: column;
        align-items: center;
        height: auto;
    }
}

.item {
    &__button {
        background-color: @cPrimary;
        border-color: @cAccent;
        width: 200px;
        height: 200px;
        margin: 4px;
    }
    
    &__icon {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }
    
    &__equipped {
        border-color: @cSecondary;
    }
}

#tooltip__text {
    margin: 4px;
}

#error {
    &__wrapper {
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    &__text {
        margin: 6px;
        color: @cBad;
        font-size: @sFontLarge;
    }
}
</style>