<template>
  <PageLayout>
    <div class="edit">
      <CardForm v-model="form" />
      <div class="edit__controls">
        <button class="edit__controls__btn" @click="() => edit()">Edit</button>
        <button class="edit__controls__btn" @click="back">Cancel</button>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/parts/PageLayout.vue';
import CardForm from '@/components/forms/CardForm.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EditCardPage',
  components: {
    PageLayout,
    CardForm
  },
  data () {
    return {
      form: {
        title: '',
        subtitle: '',
        brand: '',
        category: '',
        material: '',
        color: '',
        price: 0,
        description: '',
        dateCreated: '',
        images: '',
        size: '',
        stock: 0,
        sellingPercentage: 0
      }
    }
  },
  mounted () {
    if (this.card) {
      this.form = {
        ...this.form,
        ...this.card
      }
    }     
  },
  computed: {
    ...mapGetters('cards', ['getCardByID']),
    id () {
      return this.$route.params.id
    },
    card () {
      return this.getCardByID(this.id)
    }
  },
  methods: {
    ...mapActions('cards', ['editCard']),
    edit () {
      this.editCard(this.form)
      this.$router.push({ name: 'CARDS', params: { id: this.id } })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.edit {
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