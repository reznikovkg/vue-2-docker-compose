<template>
  <PageLayout>
    <div class="wide-bar">
      <div class="wide-bar__text">
        <div class="wide-bar__text__title">
          Plants
        </div>
        <div class="wide-bar__text__subtitle">
          Official Herschel stockist Australian warranty assistance & support Australian shipping & returns.
        </div>
      </div>
    </div>

    <div class="basic-title">
      All plants
    </div>
    <div class="container">

      <div class="filters">

        <div class="section">
          <div class="search-section">
            <div class="search-bar">
              <input v-model="searchQuery" type="text" class="search-input" placeholder="Поиск...">
              <button class="search-btn">
                <div class="search-icon">
                  <img :src="icons.SearchIcon" class="search-icon">
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="section vertical">
          <label>Фильтр 1</label>
          <label>Фильтр 2</label>
          <label>Фильтр 3</label>
        </div>

        <div class="section">
          <input class="range-input" type="range" min="0" max="100">
          <input class="number-input" type="number" placeholder="От">
          <input class="number-input" type="number" placeholder="До">
        </div>

        <div class="section checkbox-group">
          <input type="checkbox" id="size_s" class="item">
          <label for="size_s">S</label>
          <input type="checkbox" id="size_m" class="item">
          <label for="size_m">M</label>
          <input type="checkbox" id="size_l" class="item">
          <label for="size_l">L</label>
        </div>

        <div class="section tag-group">
          <button class="item">Тег 1</button>
          <button class="item">Тег 2</button>
          <button class="item">Тег 3</button>
        </div>
      </div>
      <div class="plants-list">
        <ListContainer :plants="plants"/>
      </div>
    </div>

  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import ListContainer from '@/components/parts/ListContainer.vue'
import { mapGetters } from 'vuex'
import * as Icons from '@/assets/icons/icons.js';

export default {
  name: 'PlantsPage',
  data () {
    return {
      icons: Icons,
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters(
      'plants', [ 'getPlants', 'getSearchedPlants' ]
    ),
    plants () {
      if (this.searchQuery == '')
        return this.getPlants
      return this.getSearchedPlants(this.searchFunction)
    }
  },
  methods: {
    searchFunction (plant) {
      return Object.keys(plant).some((field) => {
        if (plant[field]) {
          return plant[field].toString().toLowerCase().includes(this.searchQuery.toLowerCase())
        }
      })
    }
  },
  components: {
    PageLayout,
    ListContainer
  },
 }
</script>

<style scoped lang="less">
.plants-list {
  width: 100%;
}

.container {
  display: flex;
}

.wide-bar {
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  position: relative;
  min-width: 1000px;
  border-bottom: 1px solid #afafaf;
  border-top: 1px solid #afafaf;;

  &__text {
    &__title {
      font-size: 26pt;
      font-weight: 700;
    }

    &__subtitle {
      font-size: 12pt;
      margin-top: 20px;
    }

    position: relative;
    top: 50px;
    left: 100px;
    right: 50px;
    min-width: 400px;
  }
}

.spacer {
  height: 60px;
}

.basic-title {
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 25pt;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 700;
}

.filters {
  width: 300px;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e2e2e2;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;

  .search-section {
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
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
  
  .section {
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 20px;
    margin-bottom: 20px;

    &:last-child {
      border-bottom: none;
    }
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 15px;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      color: #518432;
    }
  }

  .range-input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 4px;
    background: #e2e2e2;
    outline: none;
    padding: 0;
    margin: 20px 0;

    &::-webkit-slider-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #518432;
      border-radius: 50%;
      cursor: pointer;
      -webkit-appearance: none;
    }

    &::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border: 2px solid #518432;
      border-radius: 50%;
      cursor: pointer;
      -webkit-appearance: none;
      appearance: none;
    }
  }

  .number-input {
    width: 90px;
    padding: 5px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    margin: 5px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #518432
    }

    &:first-child {
      margin-right: 10px;
    }
  }
  
  .checkbox-group, .tag-group {
    margin-bottom: 20px;

    input[type=checkbox] {
      display: none;
    }

    input[type=checkbox] + label {
      color: #333333;
      padding: 0.25em 0.5em;
      border-radius: 4px;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #518432;
        color: #ffffff;
      }
    }

    input[type=checkbox]:checked + label {
      background-color: #518432;
      color: #ffffff;
    }

    .item {
      border: 1px solid #518432;
      background-color: transparent;
      border-radius: 4px;
      padding: 10px;
      margin: 5px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;

      &:hover {
        background-color: #518432;
        color: #ffffff;
      }

      &:active {
        background-color: darken(#518432, 10%);
      }
    }

  }
}
</style>
