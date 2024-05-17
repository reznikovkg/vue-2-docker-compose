<template>
  <div class="product-form">
    <ElInput
        v-model="brand" 
        placeholder="Бренд"
        clearable
      />
      <ElInput
        v-model="title" 
        placeholder="Название"
        clearable
      />
      <ElInput
        v-model="category" 
        placeholder="Категория"
        clearable
      />
      <ElInput
        v-model="description" 
        placeholder="Описание"
        type="textarea"
        clearable
      />
      <ElInput
        v-model="price" 
        placeholder="Цена"
        clearable
      />
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    brand: {
      get () {
        return this.value.brand
      },
      set (value) {
        this.emitFormData({ brand: value })
      }
    },
    title: {
      get () {
        return this.value.title
      },
      set (value) {
        this.emitFormData({ title: value })
      }
    },
    category: {
      get () {
        return this.value.category
      },
      set (value) {
        this.emitFormData({ category: value })
      }
    },
    description: {
      get () {
        return this.value.description
      },
      set (value) {
        this.emitFormData({ description: value })
      }
    },
    price: {
      get () {
        return this.value.price
      },
      set (value) {
        this.emitFormData({ price: value })
      }
    }
  },
  methods: {
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
  }
}
</script>

<style scoped lang="less">
.product-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 40%;
  padding: 64px;
}
</style>
