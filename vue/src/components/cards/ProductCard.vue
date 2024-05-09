<template>
  <router-link :to="{name: 'CARD', params: { id: card.id }}">
    <div class="product-card">
      <img class="product-card__img" :src="card.images[0]" alt="">
      <div class="product-card__content">
        <div class="title-container">
          <span class="product-card__content__title">{{ card.title }}</span>
        </div>
        <div v-if="card.sellingPercentage >= 0" class="selling-container">
          <div>
            <img :src="icons.UpArrowIcon" alt="Up"> 
            <span :style="{ color: 'green' }">{{ card.sellingPercentage }}%</span>
            <span :style="{ color: 'black' }">up from last week</span>
          </div>
          <img :src="icons.MetricsIcon" alt="Metrics" class="metrics-img">
        </div>
        <div v-else class="selling-container">
          <div>
            <img :src="icons.DownArrowIcon" alt="Down"> 
            <span :style="{ color: 'red' }">{{ -card.sellingPercentage }}%</span>
            <span :style="{ color: 'black' }">down from last week</span>
          </div>
          <img :src="icons.MetricsIcon" alt="Metrics" class="metrics-img">
        </div>        
      </div>
      <router-link
        class="product-card__edit"
        :to="{name: 'EDIT', params: { id: card.id }}"
        @click.stop
      >
        <b>🖉</b>
      </router-link>
    </div>
  </router-link>
</template>

<script>
import { mapState } from 'vuex';
import * as Icons from '@/assets/icons/icons.js';
export default {
  name: 'ProductCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      icons: Icons
    }
  },
  methods: {
    goToCard() {
      this.$router.push({ name: 'CARD', params: { id: this.card.id } });
    },
    goToEditCard() {
      this.$router.push({ name: 'EDIT', params: { id: this.card.id } });
    }
  },
  computed: {
    ...mapState('cards', ['categoryProperties'])
  }
}
</script>

<style scoped lang="less">
.product-card {
  box-sizing: border-box;
  padding: 0;
  position: relative;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  display: flex;   
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 300px;
  border: 1px solid lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05);
  color: black;
  &__img {
    width:70%;
    height: 70%;
    object-fit: contain;
  }
  &__info {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    gap: 10px;
    &__title {
      font-size: 18px;
      font-weight: 100;
      color: black;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__subtitle {
      color: grey;
      font-size: 16px;
    }
  }
  &__price {
    text-align: left;
    width: 100%;
    color: black;
    padding-left: 10px;
  }
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    transform: scale(1.15);
  }
  &__edit {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    color: lightgrey;
  }
  &__edit:hover {
    color: grey;
  }
}
.title-container {
  border-bottom: 1px solid rgb(226, 226, 226);
  display: flex;
  padding-bottom: 20px;
}
.selling-container {
  justify-content: space-between;
  display: flex;
}
.selling-container img {
  width: 20px;
  height: 20px;
}
.metrics-img:hover {
  filter: brightness(50%);
}
</style>