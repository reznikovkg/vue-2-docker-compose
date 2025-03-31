<template>
    <PageLayout>
        <MenuListLayout>
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Character</div>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ character.money }}</span>
                <img class="stats-icon" src="../../assets/rupee.svg" alt="">
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text">{{ character.energy }}/100</span>
                <img class="stats-icon" src="../../assets/energy_bolt.svg" alt="">
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
                <p class="detail-text" id="char-status">{{ character.charStatus }}</p>
            </div>
            <img id="char-img" src="../../assets/cat.png" alt="">
        </div>
        <MenuListLayout>
            <div class="menu__block-wrapper">
                <div class="menu__tag primary-text">Actions</div>
            </div>
            <div v-for="action in character.actions" :key="action.id" class="menu__block-wrapper">
                <button v-on:click="charAction(action.requirements, action.gives)" class="action__button">
                    <div class="button__tag detail-text">{{ action.name }}</div>
                </button>
            </div>
        </MenuListLayout>
    </PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import catChar from '@/char';


export default {
    name: 'CharPage',
    components: {
        PageLayout,
        MenuListLayout
    },

    data () {
        return {
            character: catChar
        };
    },

    methods: {
        charAction (requirements, returns) {
            try {
                this.character.doAction(requirements, returns);
            }
            catch(err) {
                console.log("Can't do. " + err); // TODO
            }
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
</style>