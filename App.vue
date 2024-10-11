<template>
  <div id="app">
    <Quiz :questions="questions" />
  </div>
</template>

<script>
import Quiz from './components/Quiz.vue';

export default {
  name: 'App',
  components: {
    Quiz,
  },
  data() {
    return {
      questions: [
        {
          question: "Какой город является столицей России?",
          type: "single",
          answers: ["Москва", "Калининград", "Воронеж", "Санкт-Петербург"],
          correctAnswer: 0,
        },
        {
          question: "Какое животные фигурируют в китайском зодиаке?",
          type: "multiple",
          answers: ["Дракон", "Кролик", "Слон", "Бык"],
          correctAnswers: [0, 1, 3],
        },
        {
          question: "Чему равен квадратный корень из 144?",
          type: "text",
          correctAnswer: "12",
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
