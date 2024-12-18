<template>
  <div>
    <div class="save-load-controls">
      <CustomButton type="menu" @click="() => downloadLevel()">
        Скачать файлом
      </CustomButton>
      <CustomButton type="menu" @click="() => triggerFileInput()">
        Загрузить из файла
      </CustomButton>
      <input
        type="file"
        class="save-load-controls__file-input"
        ref="fileInput"
        @change="uploadFromFile"
        accept="application/json"
      />
      <CustomButton
        type="menu"
        :disabled="!canSaveCurrent"
        @click="() => saveToLocalCurrent()"
      >
        Сохранить в текущий локальный
      </CustomButton>
      <CustomButton type="menu" @click="() => saveToLocalNew()">
        Сохранить как новый локальный
      </CustomButton>
      <CustomButton type="menu" class="save-load-controls__last_button" @click="() => loadFromLocal()">
        Загрузить из локального
      </CustomButton>
    </div>

    <div v-if="isLocalModalOpen" class="modal">
      <div class="modal__modal-content">
        <h3>Выберите уровень</h3>
        <ul>
          <li
            v-for="(level, index) in localLevels"
            :key="index"
            @click="() => selectLocalLevel(index)"
          >
            Уровень {{ index + 1 }}
          </li>
        </ul>
        <CustomButton @click="() => closeLocalModal()">Закрыть</CustomButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gameStorage from "@/GameEngine/gameStorage";
import CustomButton from "../parts/CustomButton.vue";

export default {
  name: "SaveLoadControls",
  components: {
    CustomButton,
  },
  data() {
    return {
      isLocalModalOpen: false,
      localLevels: [],
      loadedFromLocal: false,
      currentLocalLevelIndex: null,
    };
  },
  computed: {
    ...mapGetters("game", ["getGrid"]),
    canSaveCurrent() {
      return this.loadedFromLocal;
    },
  },
  methods: {
    ...mapActions("game", [
      "saveLevelToFile",
      "loadLevelFromFile",
      "loadLevel",
      "saveCustomLevel",
    ]),
    downloadLevel() {
      this.saveLevelToFile();
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async uploadFromFile(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        this.loadLevelFromFile(file);
        this.loadedFromLocal = false;
        alert("Карта успешно загружена из файла.");
      } catch (error) {
        alert("Ошибка загрузки файла: " + error.message);
      }
    },
    loadFromLocal() {
      this.localLevels = gameStorage.getCustomLevels();
      this.isLocalModalOpen = true;
    },
    closeLocalModal() {
      this.isLocalModalOpen = false;
    },
    selectLocalLevel(index) {
      this.loadLevel({ levelNumber: index + 1, isCustom: true });
      this.currentLocalLevelIndex = index;
      this.loadedFromLocal = true;
      this.closeLocalModal();
      alert(`Загружен уровень ${index + 1} из локального хранилища.`);
    },
    saveToLocalNew() {
      this.saveCustomLevel();
      alert("Карта сохранена как новый уровень в локальном хранилище.");
    },
    saveToLocalCurrent() {
      this.saveCustomLevel(this.currentLocalLevelIndex);
      alert("Текущий уровень обновлён в локальном хранилище.");
    },
  },
};
</script>

<style scoped lang="less">
.save-load-controls {
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: var(--main-background-color);
  color: rgb(109, 69, 69);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  width: 100%;

  &__file-input {
    display: none;
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Adigiana Ultra", sans-serif;
  font-size: 2vh;
  background: rgba(0, 0, 0, 0.5);
  color: rgb(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;

  &__modal-content {
    background: var(--main-background-color);
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 90vw;
    max-width: 300px;
    max-height: 80vh;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      max-height: 50vh;
      overflow-y: auto;
    }

    ul li {
      color: var(--button-text-color);
      cursor: pointer;
      padding: 10px;
      border: 1px solid var(--button-background-color);
      margin: 5px 0;
      border-radius: 5px;
      background-color: var(--button-background-color);
      transition: background-color 0.3s;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

@media (max-width: 480px) {
  .save-load-controls {
    margin-bottom: 1vh;
    padding: 0vh;
    margin: 0vw;
    background-color: var(--main-background-color);
    color: rgb(109, 69, 69);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    width: 100vw;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 0.5vh;
    column-gap: 0vw;
    justify-items: center;

    & * {
      height: 7vh;
      width: 48vw;
      font-size: 1.5vh;
      margin: 0vw;
      padding: 0vw;
    }

    &__last_button{
      width: 98vw;
      grid-column: span 2;
    }

    &__file-input {
      display: none;
    }
  }
}
</style>
