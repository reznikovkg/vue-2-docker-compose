<template>
  <div class="location-card" v-bind="$attrs" @click="() => $emit('click')">
    <div class="location-card__image">
      <img class="location-card__scenery" :src="`/backgrounds/${locationKey}/scenery.png`" />
      <img class="location-card__water" :src="`/backgrounds/${locationKey}/water.png`" />
    </div>

    <div class="location-card__description">
      <h2 class="location-card__title">{{ location.name }}</h2>
      <p class="location-card__text">{{ location.description }}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'LocationCard',
  computed: {
    ...mapState({
      locations: state => state.locations
    }),
    location() {
      return this.locations.locations.get(this.locationKey);
    }
  },
  props: {
    locationKey: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="less" scoped>
.location-card {
  background-color: @cBackground2;
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  transition: background-color 300ms;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: @cAccent;
  }

  &__image {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;

    img {
      object-fit: cover;
      width: 100%;
    }
  }

  &__description {
    padding: 0 1em 1em;
  }

  &__title {
    margin: 0;
    font-size: 1.2em;
  }

  &__text {
    margin: 0;
    font-size: 1em;
  }

  &__scenery {
    height: @sizeScenery;
  }

  &__water {
    height: @sizeWater;
  }
}
</style>
