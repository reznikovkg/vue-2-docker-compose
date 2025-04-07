<template>
    <PageLayout>
        <MenuListLayout class="side-menu__wrapper">
            <div class="menu__block__wrapper">
                <div class="menu__tag primary-text">Character</div>
            </div>
            <div class="menu__block__wrapper">
                <span class="stats__text detail-text">{{ character.stats.money }}</span>
                <img class="stats__icon" src="@/assets/img/rupee.svg" alt="">
                <span v-if="moneyChangeStatus!==0" v-bind:class="moneyChangeTypeClass" class="stats__change__text detail-text">{{ moneyChangeText }}</span>
            </div>
            <div class="menu__block__wrapper">
                <span class="stats__text detail-text">{{ character.stats.energy }}/100</span>
                <img class="stats__icon" src="@/assets/img/energy_bolt.svg" alt="">
                <span v-if="energyChangeStatus!==0" v-bind:class="energyChangeTypeClass" class="stats__change__text detail-text">{{ energyChangeText }}</span>
            </div>
            <div class="menu__block__wrapper">
                <button v-on:click="openItemsModal" class="modal-button">
                    <div class="modal-button__tag detail-text">Items</div>
                    <img class="modal-button__icon" src="@/assets/img/items.svg" alt="">
                </button>
            </div>
            <div class="menu__block__wrapper">
                <button v-on:click="openTasksModal" class="modal-button">
                    <div class="modal-button__tag detail-text">Tasks</div>
                    <img class="modal-button__icon" src="@/assets/img/tasks.svg" alt="">
                </button>
            </div>
        </MenuListLayout>

        <div id="char-screen__wrapper">
            <div id="char__info__wrapper">
                <p class="primary-text" id="char-name">{{ character.name }}</p>
                <p class="detail-text" id="char-status">{{ character.charStatus }}</p>
            </div>
            <img id="char-img" :src="require(`@/assets/${character.iconPath}`)" alt="">
        </div>

        <MenuListLayout class="side-menu__wrapper">
            <div class="menu__block__wrapper">
                <div class="menu__tag primary-text">Actions</div>
            </div>
            <div v-for="(action, index) in character.actions" :key="index" class="menu__block__wrapper">
                <button v-on:click="charAction(action)" class="action-button"
                v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip"
                v-bind:data-desc="action.desc">
                    <div class="action-button__tag detail-text">{{ action.name }}</div>
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
            <!-- TODO TASKS MENU -->
        </MenuGridModalLayout>

        <TooltipLayout v-if="isTooltipVisible" :style="{top: `${tooltipYpos}px`, left: `${tooltipXpos}px`}" id="tooltip__wrapper">
            <p class="detail-text" id="tooltip__text">{{ tooltipText }}</p>
        </TooltipLayout>

        <TooltipLayout v-if="isErrorRaised" id="error__wrapper">
            <p class="detail-text" id="error__text">{{ errorText }}</p>
        </TooltipLayout>
    </PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import TooltipLayout from '../parts/TooltipLayout.vue';
import MenuGridModalLayout from '../parts/MenuGridModalLayout.vue';
import { char } from '@/char.js';


export default {
    name: 'CharPage',
    components: {
        PageLayout,
        MenuListLayout,
        TooltipLayout,
        MenuGridModalLayout
    },

    data () {
        return {
            character: null,
            stats: null,
            multipliers: null,
            items: null,
            oldStatsCache: null,

            energyRegenTimeout: null,
            isTooltipVisible: false,
            energyChangeStatus: 0,
            moneyChangeStatus: 0,
            isErrorRaised: false,
            tooltipYpos: 0,
            tooltipXpos: 0,
            tooltipText: '',
            moneyChangeText: '',
            energyChangeText: '',
            errorText: ''
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
        this.loadCharData(JSON.parse(localStorage.charInfo), JSON.parse(localStorage.charStats), JSON.parse(localStorage.charMultipliers), JSON.parse(localStorage.charItems));
    },
    mounted () {
        this.energyRegenTimeout = setInterval(this.energyRegenInterval, 5000);
    },
    beforeDestroy () {
        clearInterval(this.energyRegenTimeout);
    },
    watch: {
        stats: {
            handler (newStats) {
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
                localStorage.charMultipliers = JSON.stringify(newMultipliers);
            },
            deep: true
        },
        items: {
            handler (newItems) {
                localStorage.charItems = JSON.stringify(newItems);
            },
            deep: true
        }
    },

    methods: {
        loadCharData (charInfo, charStats, charMultipliers, charItems) {
            this.character = new char(charInfo.name, charInfo.iconPath, charStats, charMultipliers, charInfo.actions, charItems, charInfo.tasks);
            this.stats = this.character.stats;
            this.oldStatsCache = {energy: this.stats.energy, money: this.stats.money};
            this.multipliers = this.character.multipliers;
            this.items = this.character.items;
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
        // activateTask (task) {
        //     // TODO
        // },

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

                setTimeout(() => {
                    this.isErrorRaised = false;
                }, 2000)
            }
        },

        openItemsModal () {
            this.$refs.itemsModal.openRootModal();
        },
        openTasksModal () {
            this.$refs.tasksModal.openRootModal();
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
        }
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

.menu {
    &__block__wrapper {
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