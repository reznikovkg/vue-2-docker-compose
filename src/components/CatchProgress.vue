<script>
export default {
    name: "CatchProgress",
    props: {
        percent: {
            type: Number,
            required: true
        }
    }
}
</script>

<template>
    <div class="instruction">
        <div class="progress-bar">
            <div class="fill" :style="`height: ${percent}%`"></div>
        </div>
    </div>
</template>

<style scoped>
.instruction {
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
    background-color: var(--background);
    padding: 1em;
    z-index: 10;
}

.progress-bar {
    width: 1em;
    min-height: 5em;
    height: 10em;
    position: relative;
    background-color: var(--background2);
    transform: rotate(180deg);
}

.progress-bar .fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--accent);
    transition: height 300ms;
}
</style>