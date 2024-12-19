// src/utils/gameManager.js
import UserDataService from '@/api/TelegramService';
import levels from '@/assets/levels.json';

const LOCAL_STORAGE_CUSTOM_LEVELS_KEY = 'customLevels';
const LOCAL_STORAGE_CURRENT_LEVEL_KEY = 'currentLevel';

const gameStorage = {
  loadLevel(levelNumber, isCustom=false) {
    if (isCustom) {
      const customLevels = this.getCustomLevels();
      return customLevels[levelNumber - 1];
    }
    return levels.levels[levelNumber];
  },

  getCustomLevels() {
    const savedLevels = localStorage.getItem(LOCAL_STORAGE_CUSTOM_LEVELS_KEY);
    return savedLevels ? JSON.parse(savedLevels) : [];
  },

  saveCustomLevel(levelData, levelNumber = null) {
    const customLevels = this.getCustomLevels();
    if (levelNumber === null)
      customLevels.push(levelData);
    else
      customLevels[levelNumber] = levelData;

    localStorage.setItem(LOCAL_STORAGE_CUSTOM_LEVELS_KEY, JSON.stringify(customLevels));
  },

  saveLevelToFile(levelData, fileName = 'level.json') {
    const blob = new Blob([JSON.stringify(levelData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  },

  loadLevelFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const levelData = JSON.parse(event.target.result);
  
          const customLevels = this.getCustomLevels();
          customLevels.push(levelData);
  
          resolve(levelData);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  },

  getNumberOfLevels(isCustom) {
    return isCustom ? this.getCustomLevels().length : Object.keys(levels.levels).filter(key => key !== "editor").length;
  },

  async saveProgress(currentLevel, isOnline = true, userData = null) {
    if (isOnline) {
      try {
        userData = window.Telegram.WebApp.initData;
        if (!userData) {
          throw new Error('Вход на сайт был произведен не через Телеграм');
        }
        const success = await UserDataService.saveProgress(userData, currentLevel);
        if (!success) {
          throw new Error('Не удалось сохранить прогресс');
        }
      } catch (error) {
        console.error('Ошибка сохранения прогресса:', error);
      }
    } else {
      if (this.loadProgress() < currentLevel) {
        localStorage.setItem(LOCAL_STORAGE_CURRENT_LEVEL_KEY, JSON.stringify(currentLevel));
      }
    }
  },

  async loadProgress(isOnline = true, userData = null) {
    if (isOnline) {
      try {
        userData = window.Telegram.WebApp.initData;
        if (!userData) throw new Error('Вход на сайт был произведен не через Телеграм');
        const parsedData = Object.fromEntries(new URLSearchParams(userData));
        const userId = JSON.parse(parsedData.user).id;
        const level = await UserDataService.getProgress(userId);
        return level || 0;
      } catch (error) {
        console.error('Ошибка загрузки прогресса', error);
        return 0;
      }
    } else {
      const currentLevel = localStorage.getItem(LOCAL_STORAGE_CURRENT_LEVEL_KEY);
      return currentLevel ? JSON.parse(currentLevel) : 0;
    }
  }
};

export default gameStorage;
