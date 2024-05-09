<template>
  <PageLayout> 
    <div class="create">
      <CardForm v-model="form"/>
      <div class="create__controls">
        <button class="create__controls__btn" @click="() => create()">Create</button>
        <button class="create__controls__btn" @click="() => back()">Cancel</button>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/parts/PageLayout.vue';
import CardForm from '@/components/forms/CardForm.vue';
import { mapActions } from 'vuex';

export default {
  name: 'CreateCardPage',
  components: {
    CardForm,
    PageLayout
  },
  data () {
    return {
      form: {
        title: '',
        subtitle: '',
        description: '',
        brand: '',
        category: '',
        price: '',
        dateCreated: '',
        images: [''],
        sizes: '',
        colors: '',
        material: '',
        stock: '',
        sellingPercentage: ''
      }
    }
  },
  methods: {
    ...mapActions('cards', ["createCard"]),
    create () {
      this.createCard(this.form)
      if (this.$route.name !== 'CARDS') {
        this.$router.push({ name: 'CARDS' })
      }
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
      padding: 10px 20px;
      font-size: 1em;
      color: #fff;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    &__btn:hover {
      background-color: #0056b3;
    }
  }
}
</style>