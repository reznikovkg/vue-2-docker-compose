<template>
  <PageLayout>
    <div class="store">
      <div 
        class="store__btns"
        @mouseleave="() => switchSearchStatus(false)"
      >
        <div 
          class="store__btns__search"
          :style="searchActive ? `width: 100%` : ''"
          @click="() => switchSearchStatus(true)"
        >
          <div class="store__btns__search__vector"></div>
          <input
            v-model="searchField" 
            v-if="searchActive" 
            class="store__btns__search__input"
            type="text"
          >
        </div>
      </div>
      <ProductsList :products="products" />
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import ProductsList from '@/components/parts/ProductsList.vue'
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'StorePage',
  components: {
    PageLayout,
    ProductsList
  },
  data () {
    return {
      searchActive: false,
      searchField: '',
    }
  },
  mounted () {
    if(this.getStatusAPI) {
      this.getProductsFromAPI()
    }
  },
  computed: {
    ...mapGetters('products', [
      'getProducts',
      'getSearchedProducts'
    ]),
    ...mapGetters('settings', [
      'getStatusAPI'
    ]),
    fields () {
      return ['brand', 'title', 'category']
    },
    products () {
      if(this.searchField != '') {
        return this.getSearchedProducts(this.searchFunc)
      }
      return this.getProducts
    }
  },
  methods: {
    ...mapActions('products', [
      'searchProducts',
      'getProductsFromAPI'
    ]),
    switchSearchStatus (flag) {
      this.searchActive = flag
    },
    searchFunc (product) {
      if (this.searchField.length < 3){
        return true
      }
      return this.fields.some((field) => {
        if (product[field]) {
          return product[field].toString().toLowerCase().includes(this.searchField.toLowerCase())
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.store {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__btns {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 32px;
    &__search {
      width: 60px;
      height: 60px;
      background: #000;
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all .3s ease-in-out;
      border-radius: 12px;
      &__vector {
        width: 30px;
        height: 30px;
        background-position: center;
        background-repeat: no-repeat;
        transition: all .3s ease-in-out;
        background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='30px' height='30px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'%3E%3Ctitle%3Esearch%3C/title%3E%3Cdesc%3ECreated with Sketch Beta.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'%3E%3Cg id='Icon-Set-Filled' sketch:type='MSLayerGroup' transform='translate(-258.000000, -1141.000000)' fill='%23ffffff'%3E%3Cpath d='M289.688,1171.25 L281.429,1163.12 C283.591,1160.77 284.92,1157.67 284.92,1154.25 C284.92,1146.93 278.894,1141 271.46,1141 C264.026,1141 258,1146.93 258,1154.25 C258,1161.56 264.026,1167.49 271.46,1167.49 C274.672,1167.49 277.618,1166.38 279.932,1164.53 L288.224,1172.69 C288.629,1173.09 289.284,1173.09 289.688,1172.69 C290.093,1172.3 290.093,1171.65 289.688,1171.25' id='search' sketch:type='MSShapeGroup'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      &__input {
        width: 80%;
        font-size: 18px;
        font-weight: 500;
        border-radius: 12px;
        padding: 10px;
        border: 1px solid black;
      }
    }
  }
}

.store__btns__search:hover {
  background: #fff;
  border-radius: 12px;
  border: 1px solid black;
}
.store__btns__search:hover .store__btns__search__vector {
  transform: rotate(90deg);
  width: 30px;
  height: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools --%3E%3Csvg width='30px' height='30px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sketch='http://www.bohemiancoding.com/sketch/ns'%3E%3Ctitle%3Esearch%3C/title%3E%3Cdesc%3ECreated with Sketch Beta.%3C/desc%3E%3Cdefs%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' sketch:type='MSPage'%3E%3Cg id='Icon-Set-Filled' sketch:type='MSLayerGroup' transform='translate(-258.000000, -1141.000000)' fill='%23000000'%3E%3Cpath d='M289.688,1171.25 L281.429,1163.12 C283.591,1160.77 284.92,1157.67 284.92,1154.25 C284.92,1146.93 278.894,1141 271.46,1141 C264.026,1141 258,1146.93 258,1154.25 C258,1161.56 264.026,1167.49 271.46,1167.49 C274.672,1167.49 277.618,1166.38 279.932,1164.53 L288.224,1172.69 C288.629,1173.09 289.284,1173.09 289.688,1172.69 C290.093,1172.3 290.093,1171.65 289.688,1171.25' id='search' sketch:type='MSShapeGroup'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
  