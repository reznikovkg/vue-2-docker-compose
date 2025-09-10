<template>
  <div class="main-container">
    <BackerHeader text="Выбор локации"></BackerHeader>
    <div class="locations">
      <LocationCard v-for="[key] in locations.locations" :key="key" :location-key="key" @click="() => startGame(key)" />
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import LocationCard from "@/components/parts/LocationCard.vue";
import BackerHeader from "@/components/parts/BackerHeader.vue";

export default {
  name: "LocationSelect",
  components: {BackerHeader, LocationCard},
  computed: {
    ...mapState({
      locations: state => state.locations
    })
  },
  methods: {
    startGame(key) {
      this.$store.commit('locations/setActiveLocation', key);
      this.$router.replace("/game");
    }
  }
}
</script>

<style lang="less" scoped>
.locations {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1em;

  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
}

.location-image {
  img {
    object-fit: cover;
    width: 100%;
  }
}
</style>