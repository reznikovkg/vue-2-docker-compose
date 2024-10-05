<template>
  <div>
    <ObjectComparator
      :original="originalObject"
      :updated="updatedObject"
      :exceptions="exceptions"
      :show-unchanged="showUnchanged"
      @update:showUnchanged="showUnchanged = $event"
    />
  </div>
</template>

<script>
import ObjectComparator from "./ObjectComparator.vue";

export default {
  components: {
    ObjectComparator,
  },
  data() {
    return {
      originalObject: {
        a: 1,
        b: 2,
        c: 3,
        f: 4,
      },
      updatedObject: {
        a: 10,
        b: 2,
        c: 4,
        d: 5,
        e: 8,
      },
      exceptions: {
        c: true,
      },
      showUnchanged: false,
    };
  },
};
</script>
