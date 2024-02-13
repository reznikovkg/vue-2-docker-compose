<template>
  <div>
    <RouterView />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

section {
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  margin: 0;
}

h2 {
  font-size: 32px;
}

:root {
  --brand: #d50e0e;
}
</style>
