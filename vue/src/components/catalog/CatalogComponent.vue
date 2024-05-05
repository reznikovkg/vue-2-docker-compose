<template>
  <div class="catalog-wrapper">
    <div class="head">
      <div class="head__left">
        <h1 class="head__title">
          This is what
          <div><span class="head__title-span">we</span> eat.</div>
        </h1>
        <Search :sortFunction="sortCards" />
      </div>
      <LoremBlock class="head__right" />
    </div>
    <div class="catalog">
      <router-link
        v-for="card in displayedCards"
        :key="card.id"
        :to="`/catalog/${card.id}`"
      >
        <Card
          :id="card.id + ''"
          :key="card.id"
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
import LoremBlock from "../parts/LoremBlock.vue";

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
    LoremBlock,
  },
};
</script>

<style lang="less" scoped>
.head__title {
  color: black;
  &-span {
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 125%;
      border-bottom: 3px solid;
      bottom: 0;
    }
  }
}

.catalog-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: end;
    flex-wrap: wrap;
    position: relative;
    &__left {
      display: flex;
      flex-direction: column;
      gap: 35px;
    }
    &__right {
      position: absolute;
      top: 40%;
      right: 0;
    }
  }
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
}

</style>
