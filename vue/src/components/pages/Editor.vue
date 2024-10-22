<template>
  <div>
    <DropdownSelect />
    <GridDimention/>
    <EditorGrid />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import EditorGrid from "../parts/EditorGrid.vue";
import DropdownSelect from "../parts/DropdownSelect";
import GridDimention from "../parts/GridDimention";

export default {
  name: "EditorPage",
  components: {
    EditorGrid,
    DropdownSelect,
    GridDimention,
  },
  beforeMount() {
    this.loadLevel({levelNumber: "editor"});
  },
  methods: {
    ...mapActions('game', ['loadLevel'])
  }
};
</script>
