<template>
  <div class="pagination-container">
    <button
      @click="() => setFirstPage()"
      class="pagination-container__first-button"
    >
      First 
    </button>

    <button v-for="page in paginatedPages" :key="page"
      @click="() => changePage(page)"
      class="pagination-container__page-button"
      :class="{active: currentPage === page }"
    >
      {{ page }}
    </button>

    <button
      @click="() => setLastPage()"
      class="pagination-container__last-button"
    >
      Last
    </button>
  </div>
</template>


<script>
import { ROUTES } from '@/router/routes';
import { mapGetters } from 'vuex';

export default {
  name: "PaginationComponent",
  props: {
    items: Array,
    maxVisiblePages: Number,
    maxItemsPerPage: Number
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    ROUTES() {
      return ROUTES
    },
    maxPossiblePages() {
      return Math.ceil(this.items.length / this.maxItemsPerPage)
    },
    paginatedPages() {
      var pageNumbers = []
      var pageDifferenceBySides = Math.floor(this.maxVisiblePages / 2)
      var firstVisiblePage = this.currentPage <= pageDifferenceBySides ? 1 : this.currentPage - pageDifferenceBySides
      var lastVisiblePage = this.currentPage <= pageDifferenceBySides 
        ? this.maxVisiblePages 
        : this.currentPage + pageDifferenceBySides

      for (var i = firstVisiblePage; i <= lastVisiblePage; i++) {
        if(i > 0 && i <= this.maxPossiblePages){
          pageNumbers.push(i)
        }
      }

      return pageNumbers
    },
    ...mapGetters('ingredients', [
      'getIngredientById'
    ])
  },
  methods: {
    changePage(page) {
      this.currentPage = page
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      this.$emit('changePage',page)
    },
    setFirstPage() {
      this.currentPage = 1
      this.$emit('changePage',1)
    },
    setLastPage() {
      this.currentPage = this.maxPossiblePages
      this.$emit('changePage',this.maxPossiblePages)
    }
  },
}
</script>

<style lang="less" scoped>
.pagination-container {
  background-color: white;
  margin-top: 10px;
  
  &__first-button,
  &__last-button {
    margin-left: 5px;
    margin-right: 5px;
  }

  &__page-button {
    width: 1.8rem;
    align-items: center;
    height: 1.5rem;
    border-radius: 0.4rem;

    &:hover {
      color: greenyellow;
    }

    &.active {
      color: black;
      background-color: rgb(156, 161, 156);
    }
  }
}
</style>