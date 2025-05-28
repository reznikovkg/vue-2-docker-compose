<template>
    <div class="location">
        <div class="location-image">
            <img class="scenery" :src="`/backgrounds/${locationKey}/scenery.png`">
            <img class="water" :src="`/backgrounds/${locationKey}/water.png`">
        </div>

        <div class="description">
            <h2>{{ location.name }}</h2>
            <p>{{ location.description }}</p>
        </div>
    </div>
</template>
<script>
import {useLocationsStore} from "../store/locations.js";

export default {
    name: 'Location',
    computed: {
        location() {
            const locations = useLocationsStore();
            return locations.locations.get(this.locationKey);
        }
    },
    props: {
        locationKey: {
            type: String,
            required: true,
        }
    }
}
</script>
<style scoped>

.location {
    background-color: var(--background2);
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    transition: all 300ms;
    user-select: none;
    cursor: pointer;
}

.location:hover {
    background-color: var(--accent);
    transition: all 300ms;
}


.description {
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
}

.location-image {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
}

.location-image img {
    object-fit: cover;
    width: 100%;
}

</style>