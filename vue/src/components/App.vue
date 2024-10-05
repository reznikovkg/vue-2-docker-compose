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
        b: {
          color: "Зеленый",
          code: "#00FF00",
        },
        c: 3,
        f: 4,
        e: "Желтый",
      },
      updatedObject: {
        a: 10,
        b: {
          weight: 69,
          height: 170,
        },
        c: 4,
        d: 5,
        e: "Желтый",
      },
      exceptions: {
        a: true,
      },
      showUnchanged: false,
    };
  },
};
</script>
