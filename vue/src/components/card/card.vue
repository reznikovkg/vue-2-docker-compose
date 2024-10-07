<template>
    <div
      :class="['game-card', { faceDown }]"
    >
      <div v-if="!faceDown">
        <h3>{{ type }}</h3>
        <p>Strength: {{ strength }}</p>
      </div>
      <div v-else>
        <p>Card is face down</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameCard',
    props: {
      strength: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      faceDown: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
  <style scoped>
  .game-card {
    width: 150px;
    height: 200px;
    border: 1px solid black;
    text-align: center;
    transition: transform 0.5s, background-color 0.3s, box-shadow 0.3s;
  }
  .game-card:hover {
    border-color: gold;
    background-color: yellow;
    box-shadow: 0 0 15px 5px rgba(255, 223, 0, 0.8); /* Эффект сияния */
  }
  .game-card.faceDown {
    background-color: gray;
  }
  </style>
  