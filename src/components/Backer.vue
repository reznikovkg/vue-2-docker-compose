<script>
export default {
    name: "Backer",
    props: {
        text: String,
        canBack: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<template>
    <div class="backer">
        <button v-if="canBack" @click="$router.back()">←</button>
        <div v-else class="icon button"></div>
        <h1>{{ text }}</h1>
    </div>
</template>

<style scoped>
.backer {
    display: flex;
    gap: 1em;
    flex-wrap: nowrap;
    place-items: center;
    align-items: center;
    position: sticky;
    top: 0;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: var(--background);
    z-index: 2;
}

.backer h1 {
    margin: 0;
    padding: 0;
}

.icon {
    background-image: url("/fishes/fish_01c.png");
    background-repeat: no-repeat;
    background-color: unset;
}

.backer button {
    width: 32px;
    height: 32px;
    font-size: 32px;
    padding: 0em;
}
</style>