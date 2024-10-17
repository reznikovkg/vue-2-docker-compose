import Vue from 'vue'
import Vuex from 'vuex'
import cardEffect from '@/components/common/cardEffect'

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        cards: [
            {
                title: "Attack",
                image: "",
                cost: 1,
                rarity: 1,
                effects: [
                    {
                        effect: cardEffect.Attack,
                        values: [6],
                    },
                ]
            },
            {
                title: "Defend",
                image: "",
                cost: 0,
                rarity: 0,
                effects: [
                    {
                        effect: cardEffect.Defend,
                        values: [0],
                    },
                ]
            },
            {
                title: "",
                image: "",
                cost: 0,
                rarity: 0,
                effects: [
                    {
                        effect: cardEffect.Attack,
                        values: [0],
                    },
                ]
            }
        ],
    },
    getters: {
        getCards: (state) => state.cards,
        getCardById: (state) => (id) => {
            return state.cards.find(card => card.id == id);
        }
    },
    mutations: {

    },
    actions: {

    },
}