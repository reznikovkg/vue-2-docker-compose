<script>
import {defineComponent} from "vue";
import GameViewport from "./components/GameViewport.vue";
import CatchProgress from "./components/CatchProgress.vue";
import {useLocationsStore} from "./store/locations.js";
import {useInventoryStore} from "./store/inventory.js";

export default defineComponent({
    components: {CatchProgress, GameViewport},
    mounted() {
        const locationsStore = useLocationsStore();
        const inventoryStore = useInventoryStore();
        locationsStore.populate();
        inventoryStore.debugAddFishes();
    }
})
</script>

<template>
    <main>
        <RouterView></RouterView>
    </main>
</template>

<style scoped>
</style>
