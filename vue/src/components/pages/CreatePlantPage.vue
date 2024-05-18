<template>
  <div class="create">
    <PlantForm v-model="form"/>
    <div class="create__controls">
      <button
        class="create__controls__btn" 
        @click="() => create()"
      >
        Создать
      </button>
      <button
        class="create__controls__btn" 
        @click="() => back()"
      >
        Отмена
      </button>
    </div>
  </div>
</template>

<script>
import PlantForm from '@/components/forms/PlantForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CreatePlantPage',
  components: {
    PlantForm
  },
  data () {
    return {
      form: {
        name: '',
        price: 0,
        image: ''
      }
    }
  },
  methods: {
    ...mapActions('plants', [
      "createPlant"
    ]),
    create () {
      console.log(JSON.stringify(this.form))
      this.createPlant(this.form)
      this.$router.push({ name: 'PLANTS' })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.create {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  &__controls {
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
    &__btn {
      font-size: 18px;
      background-color: white;
      border-radius: 6px;
      border: 1px solid #e2e2e2;
      padding: 12px;
      transition: all .3s ease-in-out;
      cursor: pointer;
      width: 150px;
    }
    &__btn:hover {
      background: #518432;
      color: white;
    }
  }
}
</style>
