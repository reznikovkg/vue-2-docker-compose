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
          answers: [
            { label: "Москва", value: 0 },
            { label: "Калининград", value: 1 },
            { label: "Воронеж", value: 2 },
            { label: "Санкт-Петербург", value: 3 },
          ],
          correctAnswer: 0,
        },
        {
          question: "Какие из этих городов находятся в России?",
          type: "multiple",
          answers: [
            { label: "Москва", value: 0 },
            { label: "Париж", value: 1 },
            { label: "Казань", value: 2 },
            { label: "Берлин", value: 3 }
          ],
          correctAnswers: [0, 2]
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
