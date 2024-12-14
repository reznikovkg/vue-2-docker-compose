<template>
  <div class="editor-page">
    <div class="editor-page__left">
      <EditorGrid />
    </div>
    <div class="editor-page__right">
      <GridDimention />
      <DropdownSelect />
      <GridValidation />
      <SaveLoadControls/>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import EditorGrid from "../parts/EditorGrid.vue";
import DropdownSelect from "../parts/DropdownSelect";
import GridDimention from "../parts/GridDimention";
import GridValidation from "../parts/GridValidation.vue";
import SaveLoadControls from "../parts/SaveLoadControls.vue";

export default {
  name: "EditorPage",
  components: {
    EditorGrid,
    DropdownSelect,
    GridDimention,
    GridValidation,
    SaveLoadControls,
  },
  beforeMount() {
    this.loadLevel({ levelNumber: "editor" });
  },
  methods: {
    ...mapActions("game", ["loadLevel"]),
  },
};
</script>

<style scoped lang="less">
.editor-page {
  display: flex;
  height: 100vh;

  &__left {
    flex: 3;
    display: flex;
    border-right: 1px solid var(--main-background-color);
    padding: 20px;
    justify-content: center;
    align-items: center;
    user-select: none;
  }

  &__right {
    background-color: var(--main-background-color);
    flex: 1;
    padding: 20px;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .editor-page {
    flex-direction: column;

    &__left {
      order: 1;
      border-right: none;
      border-bottom: 1px solid var(--main-background-color);
      padding: 2vw;
      overflow-y: auto;
      max-height: 50vh;
      max-width: 100vw;
    }

    &__left * {
      max-width: 100%;
      max-height: 100%;
      box-sizing: border-box;
    }

    &__right {
      order: 2;
      padding: 1vh;
      gap: 0vh;
    }
  }
}
</style>
