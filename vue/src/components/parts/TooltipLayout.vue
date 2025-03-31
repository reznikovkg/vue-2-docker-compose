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
    background-color: @cAccent;
    box-shadow: 1px 1px;
    height: auto;
    width: auto;
}
</style>