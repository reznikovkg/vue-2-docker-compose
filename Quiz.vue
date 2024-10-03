<template>
  <div class="quiz-container">
    <h1 class="quiz-title">Вопрос</h1>

    <div v-if="currentQuestionIndex < questions.length" class="question-section">
      <h3 class="question-text">{{ questions[currentQuestionIndex].question }}</h3>
      
      <ul class="answers-list">
        <li
          v-for="(answer, index) in questions[currentQuestionIndex].answers"
          :key="index"
          :class="{'selected-answer': userAnswers[currentQuestionIndex] === index}"
          class="answer-item"
          @click="selectAnswer(index)"
        >
          {{ answer }}
        </li>
      </ul>

      <div class="navigation-buttons">
        <button @click="prevQuestion" :disabled="currentQuestionIndex === 0" class="nav-button">Предыдущий</button>
        <button @click="nextQuestion" :disabled="userAnswers[currentQuestionIndex] === null" class="nav-button">Следующий</button>
      </div>
    </div>

    <div v-else class="result-section">
      <h2 class="score-text">Your Score: {{ calculateScore }}%</h2>
      <button @click="restartQuiz" class="restart-button">Перезапуск</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentQuestionIndex: 0,
      userAnswers: Array(this.questions.length).fill(null), // Инициализируем массив ответов значениями null
    };
  },
  computed: {
    calculateScore() {
      let correctCount = 0;
      this.userAnswers.forEach((answer, index) => {
        if (answer === this.questions[index].correctAnswer) {
          correctCount++;
        }
      });
      return Math.round((correctCount / this.questions.length) * 100);
    },
  },
  methods: {
    selectAnswer(index) {
      // Обновляем выбранный ответ для текущего вопроса
      this.userAnswers.splice(this.currentQuestionIndex, 1, index); // Используем splice для правильного обновления массива
    },
    nextQuestion() {
      if (this.userAnswers[this.currentQuestionIndex] !== null) {
        this.currentQuestionIndex++;
      } else {
        alert('Please select an answer to proceed.');
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = Array(this.questions.length).fill(null); // Сбрасываем ответы
    },
  },
};
</script>

<style lang="less" scoped>
.quiz-container {
  max-width: 600px;
  margin: 0 auto;
}

.quiz-title {
  font-size: 24px;
  text-align: center;
}

.question-section {
  margin-top: 20px;
}

.question-text {
  font-size: 18px;
  margin-bottom: 10px;
}

.answers-list {
  list-style-type: none;
  padding: 0;
}

.answer-item {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
}

.answer-item:hover {
  background-color: #f0f0f0;
}

.selected-answer {
  background-color: #d0f0d0;
}

.navigation-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.nav-button {
  padding: 10px 20px;
  font-size: 14px;
}

.result-section {
  margin-top: 20px;
}

.score-text {
  font-size: 20px;
}

.restart-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
}
</style>
