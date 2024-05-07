<template>
  <PageLayout>
    <button class="create-card-button" @click="createCard">
      +
    </button>
    <div class="cards">
      <div class="search-container">
        <div class="search-results">
          {{ cards.length }} items
        </div>
        <input 
          v-model="search" 
          class="cards__input"
          :placeholder="search ? '' : 'search items'"
          clearable
        />
      </div>
      <ListContainer :cards="cards"/>
    </div>
  </PageLayout>
</template>

<script>
import { mapGetters } from 'vuex';
import PageLayout from '../parts/PageLayout.vue';
import ListContainer from '../parts/ListContainer.vue';
export default {
  name: 'CardsPage',
  components: {
    PageLayout,
    ListContainer
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters('cards', [
      'getCards',
      'getSearchedCards'
    ]),
    cards () {
      if( this.search.length >= 2 ) {
        return this.getSearchedCards(this.searchFunction)
      }
      return this.getCards
    },
  },
  methods: {
    createCard () {
      this.$router.push({ name: 'CREATE' })
    },
    searchFunction (card) {
      return Object.keys(card).some((field) => {
        if (card[field]) {
          return card[field].toString().toLowerCase().includes(this.search.toLowerCase())
        }
      })
    },
  }
}
</script>

<style scoped lang="less">
.PageLayout {
  position: absolute;
}

.create-card-button {
  display:block;
  width:45px;
  height:45px;
  line-height:80px;
  border-radius: 50%;
  color:white;
  background: #19bf00;
  box-shadow: 0 0 100px gray;
  font-size:25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  top: 5%;
  right: 10%;
  z-index: 100;
}

.create-card-button:hover {
  color-scheme: light;
  background-color: #20ea00;
  color: lightgrey;
}

.cards {
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.cards__input {
  width: 100%;
  border-radius: 12px;
  border: none;
  padding: 8px;
  padding-left: 30px;
  font-size: 18px;
  background-color: rgb(227, 225, 225);
  color: grey;
  background-image: url('https://cdn-icons-png.flaticon.com/128/2725/2725317.png');
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: 10px center;
}

.cards__input:focus {
  background-color: #f0f0f0;
  outline: none;
}

.search-container {
  position: relative;
  width: 70%;
}

.search-results {
  position: absolute;
  left: -150px;
  top: 50%;
  transform: translateY(-50%);
  font-size: larger;
  color: grey;
}
</style>