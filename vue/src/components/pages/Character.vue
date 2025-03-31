<template>
    <PageLayout>
        <MenuListLayout class="left__menu-wrapper">
            <div class="menu__block-wrapper">
                <div class="menu__section-tag primary-text" id="character-name">Character</div>
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text" id="money-text">{{ money }}</span>
                <img class="stats-icon" src="../../assets/rupee.svg" alt="">
            </div>
            <div class="menu__block-wrapper">
                <span class="stats-text detail-text" id="energy-text">{{ energy }}/100</span>
                <img class="stats-icon" src="../../assets/energy_bolt.svg" alt="">
            </div>
            <div class="menu__block-wrapper">
                <div class="menu__section-tag primary-text">Items</div>
            </div>
            <div class="menu__block-wrapper">
                <button class="detail-text" id="items-button">
                    <img class="money-icon" src="../../assets/items.svg" alt="">
                </button>
            </div>
        </MenuListLayout>
        <div class="char-screen-wrapper">
            <span class="char-name primary-text">CREATURE</span>
            <img class="char-img" src="../../assets/cat.png" alt="">
        </div>
        <MenuListLayout class="right__menu-wrapper">
            <div class="menu__block-wrapper">
                <div class="menu__section-tag primary-text">Actions</div>
            </div>
            <div class="menu__block-wrapper">
                <button class="action__button detail-text" id="action__spin-button">Spin</button>
            </div>
            <div class="menu__block-wrapper">
                <button class="action__button detail-text" id="action__sing-button">Sing</button>
            </div>
        </MenuListLayout>
    </PageLayout>
</template>

<script>
import MenuListLayout from '../parts/MenuListLayout.vue';
import PageLayout from '../parts/PageLayout.vue';
import char from '@/char';

export default {
    name: 'CharPage',
    components: {
        PageLayout,
        MenuListLayout,
    },

    data () {
        this.character = new char();

        return {
            energy: this.character.energy,
            money: this.character.money
        };
    }
}
</script>

<style lang="less">
.contents {
    text-align: center;
    width: 100%;
    height: 100%;
    padding-top: 10%;
}

.menu-wrapper {
    vertical-align: top;
    display: inline-block;
    width: 20%;
}

.char-screen-wrapper {
    display: inline-block;
    width: 50%;
    padding: 1%;
}

.char-name {
    font-size: 300%;
}

.char-img {
    display: block;
    margin: auto;
}

.stats-text {
    vertical-align: middle;
    font-size: 200%;
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
    font-size: 130%;
}

#items-button {
    width: 70px;
    height: 70px;
    background-color: @cPrimary;
    border-color: @cAccent;
    font-size: 130%;
}

.menu__block-wrapper {
    margin-top: 2%;
    margin-bottom: 2%;
}

.menu__section-tag {
    font-size: 150%;
}
</style>