<template>
    <div class="card">
        <p>{{name}}</p>
        <p>Атака:{{attack}}</p>
        <p>Защита:{{defence}}</p>
        <p>Стоимость:{{cost}}</p>
    </div>
</template>

<script>
export default {
    name: "Card",
    props: ["name", "attack", "defence", "cost"]
}
</script>

<style scoped>
  .card {
      background-color: moccasin;
      height: 20vw;
      width: 14vw;
      font-size: 1.5vw;
      padding: 5px
  }
</style>