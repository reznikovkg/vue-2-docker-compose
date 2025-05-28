import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

import {createMemoryHistory, createRouter, createWebHashHistory} from "vue-router";
import Game from "./pages/Game.vue";
import Menu from "./pages/Menu.vue";
import LocationSelect from "./pages/LocationSelect.vue";
import Shop from "./pages/Shop.vue";
import Inventory from "./pages/Inventory.vue";


Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};


const routes = [
    { path: '/', component: Menu },
    { path: '/locations', component: LocationSelect},
    { path: '/shop', component: Shop},
    { path: '/game', component: Game },
    { path: '/inventory', component: Inventory},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
