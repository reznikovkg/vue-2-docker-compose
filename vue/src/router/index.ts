import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/pages/HomePage.vue'
import GamePage from '@/components/pages/GamePage.vue'
import LocationSelect from '@/components/pages/LocationSelect.vue'
import {ROUTER_NAMES} from './routes'
import ShopPage from '@/components/pages/ShopPage.vue'
import InventoryPage from "@/components/pages/InventoryPage.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: ROUTER_NAMES.HOME,
        component: Home
    },
    {
        path: '/game',
        name: ROUTER_NAMES.GAME,
        component: GamePage,
    },
    {
        path: '/locations',
        name: ROUTER_NAMES.LOCATIONS,
        component: LocationSelect,
    },
    {
        path: '/shop',
        name: ROUTER_NAMES.SHOP,
        component: ShopPage,
    },
    {
        path: '/inventory',
        name: ROUTER_NAMES.INVENTORY,
        component: InventoryPage,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes
})

export default router