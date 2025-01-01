<template>
  <div class="tracker">
    <div class="tracker__header">
      <h1 class="tracker__title">Трекер</h1>
      <form @submit.prevent="addRecord" class="tracker__form">
        <input 
          type="text" 
          v-model="newRecord.title" 
          class="tracker__input tracker__input--title" 
          placeholder="Введите название" 
          required
        />
        <input 
          type="text" 
          v-model="newRecord.description" 
          class="tracker__input tracker__input--description" 
          placeholder="Введите описание" 
          required
        />
        <button type="submit" class="tracker__button tracker__button--add">Добавить</button>
      </form>
    </div>

    <div class="tracker__list">
      <div 
        v-for="record in records" 
        :key="record.id" 
        class="tracker__card"
      >
        <h2 class="tracker__card-title">{{ record.title }}</h2>
        <p class="tracker__card-description">{{ record.description }}</p>

        <div class="tracker__card-actions">
          <button 
            @click="startTracking(record.id)" 
            class="tracker__button tracker__button--start"
            :disabled="record.isTracking"
          >Запустить</button>
          <button 
            @click="stopTracking(record.id)" 
            class="tracker__button tracker__button--stop"
            :disabled="!record.isTracking"
          >Остановить</button>
        </div>

        <div class="tracker__card-times">
          <div 
            v-for="(session, index) in record.sessions" 
            :key="index" 
            class="tracker__session"
          >
            <p class="tracker__time">
              {{ formatTime(session.start) }} - {{ session.end ? formatTime(session.end) : 'В процессе' }}
            </p>
            <p v-if="session.comment" class="tracker__comment">
              Комментарий: {{ session.comment }}
            </p>
            <div v-else-if="session.end" class="tracker__comment-form">
              <input 
                type="text" 
                v-model="session.newComment" 
                class="tracker__input tracker__input--comment" 
                placeholder="Добавить комментарий"
              />
              <button 
                @click="addComment(record.id, index)" 
                class="tracker__button tracker__button--comment"
              >Сохранить</button>
            </div>
          </div>
          <p v-if="record.isTracking" class="tracker__elapsed-time">
            Прошло: {{ record.elapsedTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tracker",
  data() {
    return {
      newRecord: {
        title: "",
        description: "",
      },
      records: JSON.parse(localStorage.getItem("tracker-records")) || [],
    };
  },
  methods: {
    addRecord() {
      const id = Date.now();
      this.records.push({
        id,
        title: this.newRecord.title,
        description: this.newRecord.description,
        isTracking: false,
        startTime: null,
        sessions: [],
        elapsedTime: "0с",
      });
      this.newRecord.title = "";
      this.newRecord.description = "";
      this.saveRecords();
    },
    startTracking(recordId) {
      const record = this.records.find((r) => r.id === recordId);
      if (record && !record.isTracking) {
        record.isTracking = true;
        record.startTime = new Date();
        record.sessions.push({
          start: record.startTime,
          end: null,
          comment: null,
          newComment: "",
        });
        this.updateElapsedTime(record);
        this.saveRecords();
      }
    },
    stopTracking(recordId) {
      const record = this.records.find((r) => r.id === recordId);
      if (record && record.isTracking) {
        record.isTracking = false;
        const lastSession = record.sessions[record.sessions.length - 1];
        if (lastSession) {
          lastSession.end = new Date();
        }
        this.saveRecords();
      }
    },
    addComment(recordId, sessionIndex) {
      const record = this.records.find((r) => r.id === recordId);
      if (record) {
        const session = record.sessions[sessionIndex];
        if (session && session.end) {
          session.comment = session.newComment;
          session.newComment = "";
          this.saveRecords();
        }
      }
    },
    formatTime(date) {
      const d = new Date(date);
      return d.toLocaleTimeString();
    },
    calculateElapsedTime(startTime) {
      if (!startTime) return "0с";
      const elapsedMs = new Date() - new Date(startTime);
      const seconds = Math.floor((elapsedMs / 1000) % 60);
      const minutes = Math.floor((elapsedMs / 1000 / 60) % 60);
      const hours = Math.floor(elapsedMs / 1000 / 60 / 60);
      return `${hours}ч ${minutes}м ${seconds}с`;
    },
    updateElapsedTime(record) {
      if (record.isTracking) {
        record.elapsedTime = this.calculateElapsedTime(record.startTime);
        setTimeout(() => this.updateElapsedTime(record), 1000);
      }
    },
    saveRecords() {
      localStorage.setItem("tracker-records", JSON.stringify(this.records));
    },
  },
};
</script>

<style lang="less">
.tracker {
  &__header {
    text-align: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  &__input {
    padding: 8px;
    font-size: 16px;
    width: 100%;
    max-width: 400px;

    &--title {
      margin-bottom: 10px;
    }

    &--comment {
      margin-top: 10px;
    }
  }

  &__button {
    padding: 8px 16px;
    font-size: 16px;

    &--add {
      background-color: #4caf50;
      color: #fff;
    }

    &--start {
      background-color: #4caf50;
      color: #fff;
    }

    &--stop {
      background-color: #f44336;
      color: #fff;
    }

    &--comment {
      background-color: #2196f3;
      color: #fff;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
  }

  &__card-title {
    font-size: 20px;
    margin-bottom: 8px;
  }

  &__card-description {
    margin-bottom: 12px;
  }

  &__card-actions {
    display: flex;
    gap: 8px;
  }

  &__card-times {
    margin-top: 12px;
  }

  &__session {
    margin-bottom: 10px;
  }

  &__time {
    font-size: 14px;
  }

  &__comment {
    font-style: italic;
    color: #555;
  }

  &__comment-form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 5px;
  }

  &__elapsed-time {
    font-weight: bold;
    margin-top: 8px;
  }
}
</style>
