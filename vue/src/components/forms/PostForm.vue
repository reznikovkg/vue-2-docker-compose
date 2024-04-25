<template>
  <div class="post-form">
    <ElInput
        v-model="title" 
        placeholder="Заголовок"
        clearable
      />
      <ElInput
        v-model="subtitle" 
        placeholder="Подзаголовок"
        clearable
      />
      <ElDatePicker
        v-model="dateCreated"
        type="date"
        format="dd.MM.yyyy"
        value-format="dd.MM.yyyy"
        placeholder="Дата создания"
      />
      <ElInput
        v-model="content" 
        placeholder="Описание"
        type="textarea"
        clearable
      />
      <ElInput
        v-model="author" 
        placeholder="Автор"
        clearable
      />
  </div>
</template>

<script>
export default {
  name: 'PostForm',
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
    content: {
      get () {
        return this.value.content
      },
      set (value) {
        this.emitFormData({ content: value })
      }
    },
    author: {
      get () {
        return this.value.author
      },
      set (value) {
        this.emitFormData({ author: value })
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
