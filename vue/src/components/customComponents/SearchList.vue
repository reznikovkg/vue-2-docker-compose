<template>
  <div>
    <input 
      v-model="input"
      :class="input_class"
      type="text"  
      :placeholder="placeholder"
      @input="() => formListToShow()" 
      @keyup.enter="() => include()" 
    />

    <ul :class="ul_class">
      <li class="options__option" v-for="option in listToShow" :key="option.id" @click="() => include(option)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "SearchList",
  data() {
    return {
      input: null,
      listToShow: []
    }
  },
  props: {
    fullList: {
      type: Array,
      default: () => ([])
    },
    excludeList: {
      type: Array,
      default: () => ([])
    },
    input_class: {
      type: String,
      default: "local-search"
    },
    ul_class: {
      type: String,
      default: "options"
    },
    placeholder: {
      type: String,
      default: null
    }
  },
  methods: {
    formListToShow() {
      this.listToShow = this.input 
      ? this.fullList.filter(item => {
        return item.name.toLowerCase().indexOf(this.input.toLowerCase()) !== -1 &&
        !this.excludeList.includes(item.id)
        }) 
      : []
    },
    include(option = null) {
      if (option) {
        this.$emit('enter', option)
      }
      else {
        this.formListToShow()
        if (this.listToShow.length == 1) {
          this.$emit('enter', this.listToShow[0])
        }
      }
      this.input = null
      this.listToShow = []
    }
  }
}

</script>

<style lang="less">
.local-search {
  width: 180px;
  padding: 8px 18px;
  border: 1px solid #ECECEC;
  border-radius: 30px;
  outline: none;

  &:focus {
    outline: 2px solid #dfdfdf;
    outline-offset: -2px;
    border-radius: 30px;
  }

  &::placeholder {
    color: #878787;
    text-transform: lowercase;
    font-size: 15px;
    letter-spacing: 0.25px;
  }
}

.options {
  list-style: none;
  text-align: left;
  padding: 0 15px;
  margin-top: 5px;

  &__option {
    border-bottom: 1px solid #ECECEC;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background-color: #ECECEC;
    }
  }
}
</style>
