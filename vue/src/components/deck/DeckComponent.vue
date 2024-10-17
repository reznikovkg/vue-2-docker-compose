<template>
  <div class="deck__div">
    <CardComponent v-for="(card, index) in getHand" :key="card.id"
      :card="card"
      :rotation="getRotation(index, getHand.length)"
      :yShift="getYShift(index, getHand.length)" />
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
    getRotation(index, totalCards) {
      const maxAngle = 15; // Max angle for the outermost cards
      const centerIndex = (totalCards - 1) / 2;
      return maxAngle * ((index - centerIndex) / centerIndex); // Rotate left or right
    },

    getYShift(index, totalCards) {
      const centerIndex = (totalCards - 1) / 2;
      const maxDrop = 30; // Maximum Y-drop for cards at the edges
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