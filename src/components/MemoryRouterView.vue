<template>
  <div>
    <component :is="getCurrentRoute.component"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MemoryRouterView",
  computed: {
    ...mapGetters('memoryRouter', ['getCurrentRoute'])
  }
}
</script>