<template>
  <div>
    <EditorGrid />
    <DropdownSelect />
  </div>
</template>

<script>
import EditorGrid from "../parts/EditorGrid.vue";
import DropdownSelect from "../parts/DropdownSelect";

export default {
  name: "EditorPage",
  components: {
    EditorGrid,
    DropdownSelect,
  },
};
</script>
