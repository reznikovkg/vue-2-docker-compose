<template>
    <div class="quiz">
      <h1>Quiz</h1>
  
      <div v-if="currentQuestionIndex < questions.length">
        <h3>{{ questions[currentQuestionIndex].question }}</h3>
        <ul>
          <li
            v-for="(answer, index) in questions[currentQuestionIndex].answers"
            :key="index"
          >
            <input
              type="radio"
              :name="'question' + currentQuestionIndex"
              :value="index"
              v-model="userAnswers[currentQuestionIndex]"
            />
            {{ answer }}
          </li>
        </ul>
        <button @click="nextQuestion">Next</button>
      </div>
  
      <div v-else>
        <h2>Your Score: {{ calculateScore }}%</h2>
        <button @click="restartQuiz">Restart Quiz</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentQuestionIndex: 0,
        userAnswers: [],
        questions: [
          {
            question: "Какой город является столицей России?",
            answers: ["Москва", "Калининград", "Воронеж", "Санкт-Петербург"],
            correctAnswer: 0,
          },
          {
            question: "Сколько будет 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correctAnswer: 1,
          },
          {
            question: "Какая команда отвечает за вывод информации на экран?",
            answers: ["print", "for", "if", "while"],
            correctAnswer: 0,
          },
        ],
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
  
  <style scoped>
  .quiz {
    max-width: 600px;
    margin: 0 auto;
  }
  h3 {
    font-size: 1.5rem;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
  button {
    margin-top: 20px;
  }
  </style>
  