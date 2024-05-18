<template>
  <header class="header">
    <div class="header__left">

      <RouterLink class="item" :to="{name: 'HOME'}">
        <div class="header__logo">
          <img :src="icons.SunIcon" class="logo-icon">
        </div>
      </RouterLink>

      <div class="search-section">
        <div class="search-bar">
          <input v-model="searchQuery" type="text" class="search-input" placeholder="Поиск...">
          <button class="search-btn" @click="emitSearchQuery">
            <div class="search-icon">
              <img :src="icons.SearchIcon" class="search-icon">
            </div>
          </button>
        </div>
      </div>

      <RouterLink 
        class="item" 
        :to="{name: 'PLANTS'}"
      >
          Plants
      </RouterLink>
    </div>

    <div class="header__right">

      <RouterLink :to="{name: 'CREATE'}">
        <div class="icon">
          <img :src="icons.UserIcon" class="icon">
        </div>
      </RouterLink>
      
      <div class="icon">
        <img :src="icons.CartIcon" class="icon">
      </div>
    </div>
  </header>
</template>

<script>
import * as Icons from '@/assets/icons/icons.js';

export default {
  name: 'HeaderComponent',
  data () {
    return {
      icons: Icons,
      searchQuery: '',
    }
  },
  computed: {
    currentRoute () {
      return this.$route.name
    }
  },
  methods: {
    emitSearchQuery () {
      this.$emit('search-applied', this.searchQuery);
    }
  }
}
</script>

<style scoped lang="less">
.header {
  &__left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .item {
      font-size: medium;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    flex-direction: row;
    .icon {
      height: 30px;
      width: 30px;
      margin-right: 10px;
      margin-left: 10px;
    }
  }
  &__logo {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .logo-icon {
      width: 50px;
      height: 50px;
    }
  }
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
}

.search-section {
  display: flex;
  align-items: center;
  margin-right: 20px;
  .search-icon {
    width: 30px;
    height: 30px;
    background-color: #2b2b2c;
    border-radius: 5px;
    margin-right: 5px;
  }
}

.search-bar {
  position: relative;
}

.search-input {
  border: 0px;
  height: 40px;
  background-color: #eeeff0;
  border-radius: 5px;
  padding: 0.5em 2em 0.5em 1em;
}

.search-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}
</style>  