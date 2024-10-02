<template>
  <div class="quiz-container">
    <h1 class="quiz-title">Вопрос</h1>

    <div v-if="currentQuestionIndex < questions.length" class="question-section">
      <h3 class="question-text">{{ questions[currentQuestionIndex].question }}</h3>
      <ul class="answers-list">
        <li
          v-for="(answer, index) in questions[currentQuestionIndex].answers"
          :key="index"
          class="answer-item"
        >
          <input
            type="radio"
            :name="'question' + currentQuestionIndex"
            :value="index"
            v-model="userAnswers[currentQuestionIndex]"
            class="answer-input"
          />
          {{ answer }}
        </li>
      </ul>
      <button @click="nextQuestion" class="next-button">Next</button>
    </div>

    <div v-else class="result-section">
      <h2 class="score-text">Your Score: {{ calculateScore }}%</h2>
      <button @click="restartQuiz" class="restart-button">Restart</button>
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
      userAnswers: [],
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
    nextQuestion() {
      if (this.userAnswers[this.currentQuestionIndex] !== undefined) {
        this.currentQuestionIndex++;
      } else {
        alert("Please select an answer!");
      }
    },
    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.userAnswers = [];
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
}

.answer-input {
  margin-right: 10px;
}

.next-button {
  margin-top: 20px;
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
  
