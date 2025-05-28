<script>
export default {
    name: "InventorySlot",
    props: {
        item: {
            type: Object,
            required: true
        },
        text: String,
        active: Boolean,
    }
}
</script>

<template>
    <div class="slot-wrapper">
        <div class="slot" v-if="item" :class="{'active': active}">
            <img :src="item.imageUrl()">
        </div>
        <div class="slot" v-else :class="{'active': active}">
            <img src="../assets/unknown.png">
        </div>

        <small>{{ text }} <span v-if="item && item.count > 1"><br>x{{ item.count }}</span></small>
    </div>
</template>

<style scoped>
    .slot-wrapper {
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 0.1em;
        line-height: 1.0;
    }

    .slot {
        padding: 0.5em;
        background-color: var(--background2);
        text-align: center;
        transition: all 300ms;
    }

    .slot:hover {
        background-color: var(--background3);
        transition: all 300ms;
    }

    h1 {
        font-size: 32px;
    }
</style>