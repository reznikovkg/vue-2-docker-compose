<template>
    <ul>
        <li v-for="(item, index) in tabs" :class="{ 'active': activePageIndex == index }" @click="$emit('tabChange', index)">{{ item }}</li>
    </ul>
</template>
<script>
export default {
    name: 'TabBar',
    emits: ["tabChange"],
    props: {
        activePageIndex: {
            type: Number,
            required: true
        },
        tabs: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>
ul {
    display: flex;
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
    margin: 0;
    padding: 1em;
    width: 100%;
    text-align: center;
    border-bottom: 4px solid var(--background4);
    background-color: var(--background2);
    cursor: pointer;
    transition: all 300ms;
}

li:hover {
    border-bottom: 4px solid var(--foreground);
    transition: all 300ms;
}


li.active {
    border-bottom: 4px solid var(--accent2);
    transition: all 300ms;
}
</style>