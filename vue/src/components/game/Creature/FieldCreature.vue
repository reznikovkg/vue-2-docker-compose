<template>
    <div class="creature">
        <p class="creature__text">{{name}}</p>
        <p class="creature__text">{{attack}} - {{defence}}</p>
    </div>
</template>

<script>
export default {
    name: "FieldCreature",
    props: ["attack", "defence", "name"]
}
</script>

<style lang="less">
  @import "./styles/style";
</style>