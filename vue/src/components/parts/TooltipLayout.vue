<template>
    <div  class="tooltip-wrapper">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TooltipLayout',
}
</script>

<style scoped lang="less">
.tooltip-wrapper {
    position: absolute;
    background-color: @cPrimary;
    border: 2px solid @cAccent;
    height: auto;
    width: auto;
}
</style>