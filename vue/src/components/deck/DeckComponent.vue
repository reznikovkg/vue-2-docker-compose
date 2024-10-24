<template>
  <div class="deck__div vCenter hCenter">
    <CardComponent v-for="(card, index) in getHand" :key="card.id"
      :card="card"
      :scale="getScaling()"
      :rotation="getRotation(index)"
      :yShift="getYShift(index)"
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

  },
  computed: {
    ...mapGetters("deck", ["getHand"]),
    
    handLength() {
      return this.getHand.length;
    },
  },
  methods: {
    handleCardClick(card) {
      console.log("Handling Card Click", card);
    },

    getScaling() {
      return 1;
    },
    
    getRotation(index) {
      const maxAngle = 20;
      const centerIndex = (this.handLength - 1) / 2;
      const scaleFactor = Math.min(1, this.handLength / 5);
      return maxAngle * ((index - centerIndex) / centerIndex ) * scaleFactor;
    },

    getYShift(index) {
      const centerIndex = (this.handLength - 1) / 2;
      const maxDrop = 30;
      const distanceFromCenter = Math.abs(index - centerIndex);
      const scaleFactor = Math.min(1, this.handLength / 9);
      return (maxDrop * (distanceFromCenter / centerIndex) ** 2) * 5 * scaleFactor;
    }
  },
};
</script>

<style scoped lang="less">
.deck {
  &__div {
    display: flex;
    flex-direction: row;

    height: 300px;
    width: 1700px;

    background-color: pink; 
  }
}
</style>