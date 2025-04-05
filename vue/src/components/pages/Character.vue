<template>
    <PageLayout>
        <MenuListLayout class="side-menu-wrapper">
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Character</div>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ this.character.stats.money }}</span>
                <img class="stats-icon" src="@/assets/img/rupee.svg" alt="">
                <span v-if="moneyChangeStatus!==0" v-bind:class="moneyChangeTypeClass" class="stats-change__text detail-text">{{ moneyChangeText }}</span>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ this.character.stats.energy }}/100</span>
                <img class="stats-icon" src="@/assets/img/energy_bolt.svg" alt="">
                <span v-if="energyChangeStatus!==0" v-bind:class="energyChangeTypeClass" class="stats-change__text detail-text">{{ energyChangeText }}</span>
            </div>
            <div class="menu__block-wrapper">
                <button v-on:click="openItemsModal" class="modal-button">
                    <div class="button__tag detail-text">Items</div>
                    <img class="modal-button__icon" src="@/assets/img/items.svg" alt="">
                </button>
            </div>
            <div class="menu__block-wrapper">
                <button v-on:click="openTasksModal" class="modal-button">
                    <div class="button__tag detail-text">Tasks</div>
                    <img class="modal-button__icon" src="@/assets/img/tasks.svg" alt="">
                </button>
            </div>
        </MenuListLayout>

        <div class="char-screen-wrapper">
            <div class="char-info-wrapper">
                <p class="primary-text" id="char-name">{{ character.name }}</p>
                <p class="detail-text" id="char-status">{{ character.charStatus }}</p>
            </div>
            <img id="char-img" :src="require(`@/assets/${character.iconPath}`)" alt="">
        </div>

        <MenuListLayout class="side-menu-wrapper">
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Actions</div>
            </div>
            <div v-for="(action, index) in character.actions" :key="index" class="menu__block-wrapper">
                <button v-on:click="charAction(action)" class="action__button"
                v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip"
                v-bind:data-desc="action.desc">
                    <div class="button__tag detail-text">{{ action.name }}</div>
                </button>
            </div>
        </MenuListLayout>


        <MenuGridModalLayout ref="itemsModal">
            <div v-for="(item, index) in character.items" :key="index" class="grid-menu__button-wrapper">
                <button v-on:click="buyItem(item)" v-bind:class="{'item__equipped': item.isEquipped}" v-bind:disabled="item.isEquipped" class="item__button"
                v-on:mouseenter="showTooltip" v-on:mousemove="moveTooltip" v-on:mouseleave="hideTooltip" v-bind:data-desc="item.desc+'\n'+'Price:'+item.cost">
                    <img :src="require(`@/assets/${item.iconPath}`)" alt="" class="item__icon">
                </button>
            </div>
        </MenuGridModalLayout>
        <MenuGridModalLayout ref="tasksModal">
            <!-- TODO TASKS MENU -->
        </MenuGridModalLayout>

        <TooltipLayout v-if="isTooltipVisible" :style="{top: `${tooltipYpos}px`, left: `${tooltipXpos}px`}">
            <p class="tooltip__text detail-text">{{ tooltipText }}</p>
        </TooltipLayout>

        <TooltipLayout v-if="isErrorRaised" class="error-box__wrapper">
            <p class="error-box__text detail-text">{{ errorText }}</p>
        </TooltipLayout>
    </PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import catChar from '@/char';
import TooltipLayout from '../parts/TooltipLayout.vue';
import MenuGridModalLayout from '../parts/MenuGridModalLayout.vue';


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
            character: catChar,
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
                'stats__change-positive': this.moneyChangeStatus == 1,
                'stats__change-negative': this.moneyChangeStatus == -1
            };
        },

        energyChangeTypeClass () {
            return {
                'stats__change-positive': this.energyChangeStatus == 1,
                'stats__change-negative': this.energyChangeStatus == -1
            };
        }
    },

    methods: {
        charAction (action) {
            if (!this.isErrorRaised) {
                try {
                    this.character.doAction(action);
                    this.displayStatsChange(action.returns.energy * this.character.recieveMultipliers.energy, action.returns.money * this.character.recieveMultipliers.money);
                    setTimeout(() => { this.displayStatsChange(action.requirements.energy * -1, action.requirements.money * -1) }, 4000);
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
                console.log("Can't equip item. " + err);
            }
        },
        // activateTask (task) {
        //     // TODO
        // },

        displayStatsChange (energyChange, moneyChange) {

            if (energyChange > 0) {
                this.energyChangeStatus = 1;
                this.energyChangeText = '+' + String(energyChange);
            } else if (energyChange < 0) {
                this.energyChangeStatus = -1;
                this.energyChangeText = String(energyChange);
            }
            setTimeout(() => {
                    this.energyChangeStatus = 0;
                    this.energyChangeText = '';
                }, 3000);

            if (moneyChange > 0) {
                this.moneyChangeStatus = 1;
                this.moneyChangeText = '+' + String(moneyChange);
            } else if (moneyChange < 0) {
                this.moneyChangeStatus = -1;
                this.moneyChangeText = String(moneyChange);
            }
            setTimeout(() => {
                    this.moneyChangeStatus = 0;
                    this.moneyChangeText = '';
                }, 3000);
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

<style lang="less">
.contents {
    text-align: center;
    width: 100%;
    height: 100%;
    padding-top: 5%;
}

.side-menu-wrapper {
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
    font-size: @sFontLargest;
    margin-bottom: 1%;
    margin-top: 1%;
}

#char-status {
    font-size: @sFontBigger;
    margin-top: 0px;
    margin-bottom: 1%;
}

#char-img {
    display: block;
    margin: auto;
}

.stats-text {
    vertical-align: middle;
    font-size: @sFontBigger;
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
    font-size: @sFontBigger;
}

.modal-button {
    width: 70px;
    height: 70px;
    background-color: @cPrimary;
    border-color: @cAccent;
}

.modal-button__icon {
    scale: 150%;
}

.menu__block-wrapper {
    margin-top: 2%;
    margin-bottom: 2%;
}

.menu__tag {
    font-size: @sFontLarge;
}

.tooltip__text {
    margin: 4px;
}

.stats-change__text {
    font-size: @sFontNormal;
}

.stats__change-positive {
    color: @cGood;
}

.stats__change-negative {
    color: @cBad;
}

.char-status-err {
    color: @cBad;
    font-size: @sFontLarge;
}

.grid-menu__button-wrapper {
    display: flex;
}

.item__button, .task__button {
    background-color: @cPrimary;
    border-color: @cAccent;
    width: 200px;
    height: 200px;
    margin: 4px;
}

.item__icon {
    height: 100%;
    width: 100%;
    object-fit: contain;
}

.item__equipped {
    border-color: @cSecondary;
}

.error-box {
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