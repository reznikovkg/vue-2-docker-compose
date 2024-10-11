<template>
  <div class="quiz-container">
    <h1 class="quiz-title">Вопрос</h1>

    <div v-if="currentQuestionIndex < questions.length" class="question-section">
      <h3 class="question-text">{{ questions[currentQuestionIndex].question }}</h3>

      <!-- Если тип вопроса - выбор одного варианта -->
      <ul v-if="questions[currentQuestionIndex].type === 'single'" class="answers-list">
        <li
          v-for="(answer, index) in questions[currentQuestionIndex].answers"
          :key="index"
          :class="{'selected-answer': userAnswers[currentQuestionIndex] === index}"
          class="answer-item"
          @click="selectSingleAnswer(index)"
        >
          {{ answer }}
        </li>
      </ul>

      <!-- Если тип вопроса - выбор нескольких вариантов -->
      <ul v-if="questions[currentQuestionIndex].type === 'multiple'" class="answers-list">
        <li
          v-for="(answer, index) in questions[currentQuestionIndex].answers"
          :key="index"
          :class="{'selected-answer': userAnswers[currentQuestionIndex]?.includes(index)}"
          class="answer-item"
          @click="toggleMultipleAnswer(index)"
        >
          {{ answer }}
        </li>
      </ul>

      <!-- Если тип вопроса - текстовое поле -->
      <div v-if="questions[currentQuestionIndex].type === 'text'" class="text-answer-section">
        <textarea v-model="userAnswers[currentQuestionIndex]" placeholder="Type your answer..." class="text-answer"></textarea>
      </div>

      <div class="navigation-buttons">
        <button @click="prevQuestion" :disabled="currentQuestionIndex === 0" class="nav-button">Предыдущий</button>
        <button @click="nextQuestion" :disabled="!isAnswered" class="nav-button">Следующий</button>
      </div>
    </div>

    <div v-else class="result-section">
      <h2 class="score-text">Your Score: {{ calculateScore }}%</h2>
      <button @click="restartQuiz" class="restart-button">Перезапустить</button>
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
      userAnswers: Array(this.questions.length).fill(null), 
    };
  },
  computed: {
    calculateScore() {
      let correctCount = 0;

      this.questions.forEach((question, index) => {
        const userAnswer = this.userAnswers[index];
        if (question.type === 'single') {
          
          if (userAnswer === question.correctAnswer) {
            correctCount++;
          }
        } else if (question.type === 'multiple') {
          
          if (Array.isArray(userAnswer) && this.arraysEqual(userAnswer, question.correctAnswers)) {
            correctCount++;
          }
        } else if (question.type === 'text') {

          if (userAnswer && userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()) {
            correctCount++;
          }
        }
      });

      return Math.round((correctCount / this.questions.length) * 100);
    },
    isAnswered() {
      const currentAnswer = this.userAnswers[this.currentQuestionIndex];
      const currentQuestion = this.questions[this.currentQuestionIndex];

      if (currentQuestion.type === 'single') {
        return currentAnswer !== null;
      } else if (currentQuestion.type === 'multiple') {
        return Array.isArray(currentAnswer) && currentAnswer.length > 0;
      } else if (currentQuestion.type === 'text') {
        return currentAnswer && currentAnswer.trim() !== ''; 
      }
      return false;
    },
  },
  methods: {
    selectSingleAnswer(index) {
      this.userAnswers[this.currentQuestionIndex] = index;
    },
    toggleMultipleAnswer(index) {
      let answers = this.userAnswers[this.currentQuestionIndex];

      if (!Array.isArray(answers)) {
        answers = [];
      }
      if (answers.includes(index)) {
        answers = answers.filter(answer => answer !== index);
      } else {
        answers.push(index);
      }

      this.userAnswers[this.currentQuestionIndex] = answers;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = Array(this.questions.length).fill(null); 
    },
    arraysEqual(arr1, arr2) {
      return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
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

.text-answer-section {
  margin-top: 20px;
}

.text-answer {
  width: 100%;
  height: 100px;
  font-size: 16px;
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
