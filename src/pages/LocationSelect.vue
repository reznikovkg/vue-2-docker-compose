<script>
import {mapStores} from "pinia";
import {useLocationsStore} from "../store/locations.js";
import Location from "../components/Location.vue";
import Backer from "../components/Backer.vue";

export default {
    name: "LocationSelect",
    components: {Backer, Location},
    computed: mapStores(useLocationsStore),
    methods: {
        startGame(key) {
            const store = useLocationsStore();
            store.activeLocation = key;
            this.$router.replace("/game");
        }
    }
}
</script>

<template>
    <div class="menu-container">
        <Backer text="Выбор локации"></Backer>
        <div class="locations">
            <Location v-for="[key, value] in locationsStore.locations" :location-key="key" @click="startGame(key)"/>
        </div>
    </div>
</template>

<style scoped>

.locations {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em;
}

.location-image img {
    object-fit: cover;
    width: 100%;
}


@media (max-width: 800px) {
    .locations {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 500px) {
    .locations {
        display: flex;
        flex-direction: column;
    }
}

</style>