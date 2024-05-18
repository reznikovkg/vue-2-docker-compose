<template>
  <PageLayout>
    <div class="plant">
      <img class="plant__img" :src="this.plant.image" />
      <div class="plant__content">
        <span class="plant__content__name">{{ this.plant.name }}</span>
        <span class="plant__content__price">${{ this.plant.price }}</span>
      </div>
      <button 
        class="plant__btn" 
        @click="() => deleteCurrentPlant()"
      >
        Delete
      </button>
    </div>
  </PageLayout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PageLayout from '../parts/PageLayout.vue';

export default {
  name: 'PlantPage',
  components: {
    PageLayout
  },
  computed: {
    ...mapGetters('plants', [
     'getPlantById'
    ]),
    id () {
      return this.$route.params.id
    },
    plant () {
      return this.getPlantById(this.id)
    },
  },
  methods: {
    ...mapActions('plants', [
      'deletePlant'
    ]),
    deleteCurrentPlant () {
      this.deletePlant(this.plant)
      this.$router.push({ name: 'PLANTS' })
    }
  }
}
</script>

<style scoped lang="less">
.plant {
  display: flex;
  flex-direction: column;
  padding: 24px;

  &__btn {
    font-size: 18px;
    background-color: white;
    border-radius: 6px;
    border: 1px solid #e2e2e2;
    padding: 12px;
    transition: all .3s ease-in-out;
    cursor: pointer;
    width: 150px;
    align-self: flex-end;
  }
  &__btn:hover {
    background: #518432;
    color: white;
  }

  &__content {
    width: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    &__name {
      font-size: 24px;
      font-weight: 600;
    }
    &__price {
      color: grey;
      font-size: 22px;
    }
  }
  &__img {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
