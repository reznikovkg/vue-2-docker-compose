<template>
    <PageLayout>
        <MenuListLayout>
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Character</div>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ character.money }}</span>
                <img class="stats-icon" src="../../assets/rupee.svg" alt="">
                <span v-if="isMoneyChangeVisible" v-bind:class="moneyChangeTypeClass" class="stats-change__text detail-text">{{ moneyChangeText }}</span>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ character.energy }}/100</span>
                <img class="stats-icon" src="../../assets/energy_bolt.svg" alt="">
                <span v-if="isEnergyChangeVisible" v-bind:class="energyChangeTypeClass" class="stats-change__text detail-text">{{ energyChangeText }}</span>
            </div>
            <div class="menu__block-wrapper">
                <button class="detail-text" id="items-button">
                    <div class="button__tag detail-text">Items</div>
                    <img id="items-icon" src="../../assets/items.svg" alt="">
                </button>
            </div>
            <div class="menu__block-wrapper">
                <button class="detail-text" id="items-button">
                    <div class="button__tag detail-text">Tasks</div>
                    <img id="items-icon" src="../../assets/tasks.svg" alt="">
                </button>
            </div>
        </MenuListLayout>
        <div class="char-screen-wrapper">
            <div class="char-info-wrapper">
                <p class="primary-text" id="char-name">{{ character.name }}</p>
                <p v-bind:class="charStatusClass" class="detail-text" id="char-status">{{ character.charStatus }}</p>
            </div>
            <img id="char-img" src="../../assets/cat.png" alt="">
        </div>
        <MenuListLayout>
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Actions</div>
            </div>
            <div v-for="action in character.actions" :key="action.id" class="menu__block-wrapper">
                <button v-on:click="charAction(action)" class="action__button"
                v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip"
                v-bind:data-action-desc="action.desc">
                    <div class="button__tag detail-text">{{ action.name }}</div>
                </button>
            </div>
        </MenuListLayout>
        <TooltipLayout v-if="isTooltipVisible" :style="{top: `${tooltipYpos}px`, left: `${tooltipXpos}px`}">
            <div class="tooltip__text detail-text">{{ tooltipText }}</div>
        </TooltipLayout>
    </PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import catChar from '@/char';
import TooltipLayout from '../parts/TooltipLayout.vue';


export default {
    name: 'CharPage',
    components: {
        PageLayout,
        MenuListLayout,
        TooltipLayout
    },

    data () {
        return {
            character: catChar,
            isTooltipVisible: false,
            isEnergyChangeVisible: false,
            isMoneyChangeVisible: false,
            isEnergyChangePositive: false,
            isMoneyChangePositive: false,
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
                'stats__change-positive': this.isMoneyChangePositive,
                'stats__change-negative': !this.isMoneyChangePositive
            };
        },

        energyChangeTypeClass () {
            return {
                'stats__change-positive': this.isEnergyChangePositive,
                'stats__change-negative': !this.isEnergyChangePositive
            };
        },

        charStatusClass () {
            return {
                'char-status-err': this.isErrorRaised,
                '': !this.isErrorRaised
            }
        }
    },

    methods: {
        charAction (action) {
            if (!this.isErrorRaised) {
                try {
                    this.character.doAction(action);
                    this.displayStatsChange(action.returns.energy, action.returns.money);
                    setTimeout(() => { this.displayStatsChange(action.requirements.energy * -1, action.requirements.money * -1) }, 4000);
                }
                catch(err) {
                    this.displayErrMessage("Can't " + String(action.name).toLowerCase() + '. ' + err);
                }
            }
        },

        displayStatsChange (energyChange, moneyChange) {
            this.isEnergyChangeVisible = true;

            if (energyChange > 0) {
                this.isEnergyChangePositive = true;
                this.energyChangeText = '+' + String(energyChange);
            } else if (energyChange < 0) {
                this.isEnergyChangePositive = false;
                this.energyChangeText = String(energyChange);
            }
            setTimeout(() => {
                    this.isEnergyChangeVisible = false;
                    this.energyChangeText = '';
                }, 3000);

            this.isMoneyChangeVisible = true;

            if (moneyChange > 0) {
                this.isMoneyChangePositive = true;
                this.moneyChangeText = '+' + String(moneyChange);
            } else if (moneyChange < 0) {
                this.isMoneyChangePositive = false;
                this.moneyChangeText = String(moneyChange);
            }
            setTimeout(() => {
                    this.isMoneyChangeVisible = false;
                    this.moneyChangeText = '';
                }, 3000);
        },

        displayErrMessage (message) {
            if (!this.isErrorRaised) {
                this.isErrorRaised = true;

                let prevStatus = this.character.charStatus;
                this.character.charStatus = message;

                setTimeout(() => {
                    this.isErrorRaised = false;
                    this.character.charStatus = prevStatus;
                }, 2000)
            }
        },

        showTooltip (event) {
            this.tooltipText = event.target.dataset.actionDesc;
            
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

<style lang="less">
.contents {
    text-align: center;
    width: 100%;
    height: 100%;
    padding-top: 5%;
}

.menu-wrapper {
    vertical-align: top;
    display: inline-block;
    width: 20%;
}

.char-screen-wrapper {
    vertical-align: top;
    display: inline-block;
    width: 50%;
    padding: 1%;
}

#char-name {
    font-size: @sizeFontLargest;
    margin-bottom: 1%;
    margin-top: 1%;
}

#char-status {
    font-size: @sizeFontBigger;
    margin-top: 0px;
    margin-bottom: 1%;
}

#char-img {
    display: block;
    margin: auto;
}

.stats-text {
    vertical-align: middle;
    font-size: @sizeFontBigger;
}

.stats-icon {
    vertical-align: middle;
    scale: 150%;
    margin-left: 2%;
    margin-right: 2%;
}

.action__button {
    width: 30%;
    height: 50px;
    background-color: @cPrimary;
    border-color: @cAccent;
}

.button__tag {
    font-size: @sizeFontBigger;
}

#items-button {
    width: 70px;
    height: 70px;
    background-color: @cPrimary;
    border-color: @cAccent;
}

#items-icon {
    scale: 150%;
}

.menu__block-wrapper {
    margin-top: 2%;
    margin-bottom: 2%;
}

.menu__tag {
    font-size: @sizeFontLarge;
}

.tooltip__text {
    margin: 4px;
}

.stats-change__text {
    font-size: @sizeFontNormal;
}

.stats__change-positive {
    color: @cGood;
}

.stats__change-negative {
    color: @cBad;
}

.char-status-err {
    color: @cBad;
    font-size: @sizeFontLarge;
}
</style>