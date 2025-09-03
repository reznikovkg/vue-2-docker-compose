<template>
  <div class="intro-view">
    <h1 class="intro-view__title">Tower Defense X</h1>
    <button 
      class="intro-view__start-button"
      @click="$router.push('/game')"
    >
      Start Game
    </button>
  </div>
</template>

<script>
export default {
  name: 'IntroView'
}
</script>

<style lang="less">
.intro-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2c3e50;
  color: white;

  &__title {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  &__start-button {
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #3aa876;
    }
  }
}
</style>