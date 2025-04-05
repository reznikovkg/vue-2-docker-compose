<template>
    <div  class="tooltip__wrapper">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TooltipLayout',
}
</script>

<style scoped lang="less">
.tooltip__wrapper {
    position: absolute;
    background-color: @cPrimary;
    border: 2px solid @cAccent;
    border-bottom: 2px solid #00000041;
    border-right: 2px solid #00000041;
    height: auto;
    width: auto;
}
</style>