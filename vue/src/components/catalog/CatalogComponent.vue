<template>
  <div class="catalog-wrapper">
    <Search :sortFunction="sortCards" />
    <div class="catalog">
      <router-link
        v-for="card in displayedCards"
        :key="card.id"
        :to="`/catalog/${card.id}`"
      >
        <Card
          :key="card.id"
          :id="card.id + ''"
          :title="card.title"
          :imgUrl="card.imgUrl"
          :desc="card.desc"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from "../card/CardComponent";
import Search from "../searchbar/SearchBar.vue";

export default {
  name: "CatalogComponent",
  data: () => {
    return {
      cards: [],
      displayedCards: [],
    };
  },
  methods: {
    sortCards: function (data) {
      if (!data) return (this.displayedCards = this.cards);
      this.displayedCards = this.cards.filter((card) =>
        card.title.includes(data)
      );
    },
  },
  beforeMount() {
    this.$store.dispatch("fetchMockData");
    const cardsFromStor = this.$store.getters.getCards;
    this.cards = cardsFromStor;
    this.displayedCards = cardsFromStor;
  },
  components: {
    Card,
    Search,
  },
};
</script>

<style lang="less" scoped>
.catalog-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: space-evenly;
}
</style>
