<template>
   <Field/>
   <PlayerPanel/>
</template>

<script>

import {defineComponent} from "vue";
import Field from "@/components/Field.vue";
import PlayerPanel from "@/components/PlayerPanel.vue";

export default defineComponent({
    components: {PlayerPanel, Field}
})
</script>

<style scoped>

</style>
