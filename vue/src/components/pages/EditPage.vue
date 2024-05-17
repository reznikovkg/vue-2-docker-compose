<template>
  <PageLayout>
    <div class="edit">
      <ProductForm v-model="form"/>
      <div class="edit__controls">
        <button
          class="edit__controls__btn" 
          @click="() => edit()"
        >
          Сохранить
        </button>
        <button
          class="edit__controls__btn" 
          @click="() => back()"
        >
          Отмена
        </button>
      </div>
    </div>
  </PageLayout>
</template>
  
<script>
import PageLayout from "@/components/parts/PageLayout.vue"
import ProductForm from "../forms/ProductForm.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'EditPage',
  components: {
    PageLayout,
    ProductForm
  },
  data () {
    return {
      form: {
        brand: '',
        title: '',
        images: ['https://cdn11.bigcommerce.com/s-ucl2nc/images/stencil/1280x1280/c/placeholder-image__65448.original.jpg'],
        category: '',
        description: '',
        price: ''
      }
    }
  },
  mounted () {
    if (this.product) {
      this.form = {
        ...this.form,
        ...this.product
      }
    }     
  },
  computed: {
    ...mapGetters('products', [
      'getProductByID'
    ]),
    id () {
    return this.$route.params.id
    },
    product () {
      return this.getProductByID(this.id)
    }
  },
  methods: {
    ...mapActions('products', [
      "editProduct"
    ]),
    edit () {
      this.editProduct(this.form)
      this.$router.push({ name: 'STORE' })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
  </script>
  
<style scoped lang="less">
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__controls {
    display: flex;
    flex-direction: row;
    gap: 25px;
    align-items: center;
    &__btn {
      width: 150px;
      padding: 15px 10px;
      background-color: #000;
      border: none;
      border-radius: 6px;
      color: #ffffff;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      transition: all .3s ease-in-out;
    }
    &__btn:hover {
      background: #ffffff;
      color: rgb(0, 0, 0);
      border: 1px solid black;
      border-radius: 12px;
      scale: 1.2;
    }
  }
}
</style>
