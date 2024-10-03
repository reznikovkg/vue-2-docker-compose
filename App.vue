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
