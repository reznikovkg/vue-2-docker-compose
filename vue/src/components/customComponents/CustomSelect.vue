<template>
  <div class="custom-select">
    <button 
      :class="button_class" 
      role="combobox" 
      aria-label="select button" 
      aria-haspopup="listbox" 
      aria-expanded="false"
      aria-controls="options" 
      @click="() => showOptions()"
    >
      <span class="selected-value">{{ selected }}</span>
    </button>

    <ul v-if="isActive" :class="dropdown_class" role="listbox">
      <li
        :value="value"
        class="options__option" 
        :class="'option--default'"
        role="option" 
        @click="() => selectOption(selectedDefault)"
      >
        {{ selectedDefault }}
      </li>
      <li 
        v-for="option in options"
        :key="option.id" 
        :value="value"
        class="options__option" 
        role="option" 
        @click="() => selectOption(option)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "CustomSelect",
  data() {
    return {
      isActive: false,
      selected: this.selectedDefault
    }
  },
  model: {
    prop: 'value',
    event: 'click'
  },
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    selectedDefault: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: null
    },
    button_class: {
      type: String,
      default: "form"
    },
    dropdown_class: {
      type: String,
      default: "dropdown options"
    }
  },
  methods: {
    selectOption(option) {
      if(option == this.selectedDefault) {
        this.$emit('click', null)
        this.selected = option
      } else {
        this.$emit('click', option.id)
        this.selected = option.name
      }
      this.showOptions()
    },
    showOptions() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="less" scoped>
.dropdown {
  width: auto;
  min-width: 180px;
  max-height: 250px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 25px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 25px;
  }

  .option--default {
    background-color: #ececec;  
  }
}
</style>
