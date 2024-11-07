<template>
  <div class="field">
      <FieldCreature
        v-for="(creature, index) in creatures"
        :name="creature.name"
        :attack="creature.attack"
        :defence="creature.defence"
        v-bind:key="index"
      />
  </div>
</template>

<script>
import FieldCreature from "@/components/game/Creature/FieldCreature.vue";

export default {
    name: "GameField",
    components: {FieldCreature},
    props: ["creatures"]
}
</script>

<style lang="less">
  @import "./styles/style";
</style>