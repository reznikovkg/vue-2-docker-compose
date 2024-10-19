<template>
    <div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLayout',
};
</script>

<style scoped lang="less">
.content {
    margin: 0 auto;
    padding: 20px 34px;
    height: 100vh;
    max-width: 1000px;
}
</style>
