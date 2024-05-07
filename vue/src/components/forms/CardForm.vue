<template>
  <div class="card-form">
    <ElInput v-model="title" placeholder="Title" clearable />
    <ElInput v-model="subtitle" placeholder="Subtitle" clearable />
    <ElDatePicker v-model="dateCreated" type="date" format="dd.MM.yyyy" value-format="dd.MM.yyyy" placeholder="Date of creation" />
    <ElInput v-model="brand" placeholder="Brand" clearable />
    <ElInput v-model="category" placeholder="Category" clearable />
    <ElInput v-model="price" placeholder="Price" clearable />
    <ElInput v-model="sizes" placeholder="Sizes" clearable />
    <ElInput v-model="colors" placeholder="Colors" clearable />
    <ElInput v-model="material" placeholder="Material" clearable />
    <ElInput v-model="stock" placeholder="Stock" clearable />
    <ElInput v-model="images" placeholder="Links to images" clearable />
  </div>
</template>

<script>
export default {
  name: 'CardForm',
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
    title: {
      get () {
        return this.value.title
      },
      set (value) {
        this.emitFormData({ title: value })
      }
    },
    subtitle: {
      get () {
        return this.value.subtitle
      },
      set (value) {
        this.emitFormData({ subtitle: value })
      }
    },
    dateCreated: {
      get () {
        return this.value.dateCreated
      },
      set (value) {
        this.emitFormData({ dateCreated: value })
      }
    },
    brand: {
      get () {
        return this.value.brand
      },
      set (value) {
        this.emitFormData({ brand: value })
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
    price: {
      get () {
        return this.value.price
      },
      set (value) {
        this.emitFormData({ price: value })
      }
    },
    images: {
      get() {
        return this.value.images || [];
      },
      set(value) {
        this.emitFormData({ images: value.split(',').map(link => link.trim()) });
      }
    },
    sizes: {
      get () {
        return this.value.sizes
      },
      set (value) {
        this.emitFormData({ sizes: value })
      }
    },
    colors: {
      get () {
        return this.value.colors
      },
      set (value) {
        this.emitFormData({ colors: value })
      }
    },
    material: {
      get () {
        return this.value.material
      },
      set (value) {
        this.emitFormData({ material: value })
      }
    },
    stock: {
      get () {
        return this.value.stock
      },
      set (value) {
        this.emitFormData({ stock: value })
      }
    },
  },
  methods: {
    emitFormData (param) {
      this.$emit('change', {
        ...this.value,
        ...param
      })
    },
  },
  handleImageChange(event) {
    this.images = [...event.target.files].map(file => file.link);
  },
}
</script>

<style scoped lang="less">
.card-form {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>
