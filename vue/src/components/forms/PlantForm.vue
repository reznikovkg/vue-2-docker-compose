<template>
  <div class="post-form">
    <ElInput
        v-model="name" 
        placeholder="Название"
        clearable
      />
      <ElInput
        v-model="price" 
        type="number"
        placeholder="Цена"
        clearable
      />
      <ElInput
        v-model="image" 
        placeholder="Изображение"
        clearable
      />
  </div>
</template>

<script>
export default {
  name: 'PlantForm',
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
    name: {
      get () {
        return this.value.name
      },
      set (value) {
        this.emitFormData({ name: value })
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
    image: {
      get () {
        return this.value.image
      },
      set (value) {
        this.emitFormData({ image: value })
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
.post-form {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>
