<template>
  <div class="deck__div">
    <CardComponent v-for="(card, index) in getHand" :key="card.id"
      :card="card"
      :rotation="getRotation(index, getHand.length)"
      :yShift="getYShift(index, getHand.length)" 
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardComponent from '../card/CardComponent.vue';

export default {
  components: {
    CardComponent,
  },
  props: {

  },
  mounted() {
    console.log("AAAA", this.getHand);
  },
  computed: {
    ...mapGetters("deck", ["getHand"])
  },
  methods: {
    handleCardClick(card) {
      console.log("Handling Card Click", card);
    },
    
    getRotation(index, totalCards) {
      const maxAngle = 15;
      const centerIndex = (totalCards - 1) / 2;
      return maxAngle * ((index - centerIndex) / centerIndex);
    },

    getYShift(index, totalCards) {
      const centerIndex = (totalCards - 1) / 2;
      const maxDrop = 30;
      const distanceFromCenter = Math.abs(index - centerIndex);
      return maxDrop * (distanceFromCenter / centerIndex) ** 2;
    }
  },
};
</script>

<style scoped lang="less">
.deck {
  &__div {
    width: 900px;
    height: 200px;
    background-color: pink;
    display: flex;
    flex-direction: row;
  }
}
</style>