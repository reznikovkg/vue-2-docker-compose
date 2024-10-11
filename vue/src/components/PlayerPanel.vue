<template>
  <div class="playerpanel">
    <div class="hand">
        <Card v-for="(card, id) in cards"
        :cost="card.cost"
        :attack="card.attack"
        :defence="card.defence"
        :name="card.name"
        v-bind:style="setupcard(id)"/>
    </div>
    <div class="facestats">
      <div class="square" style="background-color: crimson">{{playerhp}}</div>
    </div>
    <div style="width: 50%"></div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
    name: "PlayerPanel",
    props: ["playerhp", "cards"],
    components: {Card},
    data() {
        return {
            cards : [
                {name: "Илюха еретик", attack: 2, defence: 2, cost: 3},
                {name: "Илюха фанатик", attack: 2, defence: 2, cost: 3},
                {name: "Злой клоун", attack: 2, defence: 2, cost: 3},
                {name: "Великая Панда", attack: 2, defence: 2, cost: 3},
            ],
            playerhp: 30
        }
    },
    methods:{
      setupcard(id) {
          return{
              position: "relative",
              top: id / 2 + "vw",
              left: id === 0 ? 0 : -10 * id + "vw",
              rotate: 5 * id + "deg"

          }
      }
    }
}
</script>

<style scoped>
.playerpanel {
    background-color: aliceblue;
    display: flex;
    height: 25vw;
    padding: 1%;
}

.hand {
    width: 50%;
    display: flex;
    justify-content: space-between;
}

.facestats {
    width: 5%;
    padding: 2%;
}

.square {
    aspect-ratio: 1 / 1;
    text-align: center;
    font-size: 3vh;
}

</style>
