<template> 
  <div class="quiz">
    <h1 class="quiz__title">Опрос</h1>

    <div class="quiz__question-section" v-if="!isQuizComplete">
      <p class="quiz__question-text">{{ currentQuestion.question }}</p>

      <!-- Вопросы с выбором одного или нескольких вариантов -->
      <ul v-if="currentQuestion.type === QUESTION_TYPES.SINGLE || currentQuestion.type === QUESTION_TYPES.MULTIPLE" class="quiz__answers-list">
        <li v-for="(answer, index) in currentQuestion.answers"
            :key="index"
            :class="['quiz__answer-item', { 'quiz__answer-item--selected': selectedAnswers.includes(answer.value) }]"
            @click="selectAnswer(answer.value)">
          {{ answer.label }}
        </li>
      </ul>

      <!-- Вопрос с текстовым ответом -->
      <div v-if="currentQuestion.type === QUESTION_TYPES.TEXT" class="quiz__text-answer-section">
        <textarea class="quiz__text-answer" v-model="textAnswer"></textarea>
      </div>
    </div>

    <!-- Навигация -->
    <div class="quiz__navigation-buttons" v-if="!isQuizComplete">
      <button 
        class="quiz__nav-button" 
        @click="prevQuestion" 
        :disabled="currentQuestionIndex === 0"
      >
        Предыдущий
      </button>
      <button 
        class="quiz__nav-button" 
        @click="nextQuestion" 
        :disabled="!isAnswered"
      >
        Следующий
      </button>
    </div>

    <!-- Результат -->
    <div v-if="isQuizComplete" class="quiz__result-section">
      <p class="quiz__score-text">Ваш результат: {{ score }}%</p>
      <button class="quiz__restart-button" @click="restartQuiz">Начать заново</button>
    </div>
  </div>
</template>

<script>
const QUESTION_TYPES = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
  TEXT: 'text',
};

export default {
  props: {
    questions: Array,
  },
  data() {
    return {
      currentQuestionIndex: 0,
      selectedAnswers: [],
      textAnswer: '',
      answers: [],
      isQuizComplete: false,
      QUESTION_TYPES,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    isAnswered() {
      if (this.currentQuestion.type === QUESTION_TYPES.TEXT) {
        return this.textAnswer.trim() !== '';
      }
      return this.selectedAnswers.length > 0;
    },
    score() {
      let correct = 0;

      this.questions.forEach((question, index) => {
        if (question.type === QUESTION_TYPES.TEXT) {
          if (this.textAnswer.trim() === question.correctAnswer) {
            correct++;
          }
        } else if (question.type === QUESTION_TYPES.SINGLE || question.type === QUESTION_TYPES.MULTIPLE) {
          const correctAnswers = Array.isArray(question.correctAnswers) ? question.correctAnswers : [question.correctAnswer];
          const userAnswers = Array.isArray(this.answers[index]) ? this.answers[index] : [this.answers[index]];
          if (JSON.stringify(correctAnswers.sort()) === JSON.stringify(userAnswers.sort())) {
            correct++;
          }
        }
      });

      return Math.round((correct / this.questions.length) * 100);
    },
  },
  methods: {
    selectAnswer(value) {
      if (this.currentQuestion.type === QUESTION_TYPES.SINGLE) {
        this.selectedAnswers = [value];
      } else {
        if (this.selectedAnswers.includes(value)) {
          this.selectedAnswers = this.selectedAnswers.filter(v => v !== value);
        } else {
          this.selectedAnswers.push(value);
        }
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.selectedAnswers = [];
        this.textAnswer = '';
      }
    },
    nextQuestion() {
      if (this.currentQuestion.type === QUESTION_TYPES.TEXT) {
        this.answers[this.currentQuestionIndex] = this.textAnswer.trim();
      } else {
        this.answers[this.currentQuestionIndex] = this.selectedAnswers;
      }
      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.isQuizComplete = true;
      } else {
        this.currentQuestionIndex++;
        this.selectedAnswers = [];
        this.textAnswer = '';
      }
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.selectedAnswers = [];
      this.textAnswer = '';
      this.answers = [];
      this.isQuizComplete = false;
    },
  },
};
</script>
<style lang="less" scoped>
.quiz {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
  }

  &__question-section {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &__question-text {
    font-size: 20px;
    margin-bottom: 15px;
    color: #444;
  }

  &__answers-list {
    list-style-type: none;
    padding: 0;
  }

  &__answer-item {
    margin: 10px 0;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    
    &:hover {
      background-color: #f0f7ff;
      transform: scale(1.02);
    }
    
    &--selected {
      background-color: #cfe9ff;
      border-color: #2196f3;
      color: #2196f3;
      font-weight: bold;
    }
  }

  &__text-answer-section {
    margin-top: 20px;

    .quiz__text-answer {
      width: 100%;
      height: 100px;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ddd;
      font-size: 16px;
      outline: none;
      resize: none;
    }
  }

  &__navigation-buttons {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    .quiz__nav-button {
      padding: 10px 25px;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      background-color: #2196f3;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;

      &:hover {
        background-color: #1976d2;
        transform: translateY(-2px);
      }

      &:disabled {
        background-color: #bbb;
        cursor: not-allowed;
      }
    }
  }

  &__result-section {
    margin-top: 30px;
    text-align: center;

    .quiz__score-text {
      font-size: 24px;
      color: #333;
    }

    .quiz__restart-button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 8px;
      background-color: #4caf50;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
