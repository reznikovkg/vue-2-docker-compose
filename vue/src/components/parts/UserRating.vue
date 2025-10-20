<template>
  <div class="rating">
    <h2 class="rating__title">
      {{ title }}
    </h2>

    <div v-if="ratingIsNotEmpty" class="rating__table">
      <div class="rating__table__header row row--first">
        <h4>Место</h4>
        <h4>Имя</h4>
        <h4>Победы</h4>
      </div>

      <div v-for="user, i in sortedRating.slice(0, -1)" :key="i" class="rating__table__user row">
        <h4>{{ i + 1 }}</h4>
        <h4>{{ user['username'] }}</h4>
        <h4>{{ user['games_win'] }}</h4>
      </div>

      <div v-if="!currentUserInRating10" class="row row--blank">
        <h4>...</h4>
      </div>

      <div class="rating__table__user row row--last">
        <h4>{{ sortedRating.at(-1).position }}</h4>
        <h4>{{ sortedRating.at(-1)['username']}}</h4>
        <h4>{{ sortedRating.at(-1)['games_win'] }}</h4>
      </div>
    </div>

    <div v-else class="not-found">
      <h4>Не найдено ни одного игрока</h4>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "@/http-helper/http-config";
import { mapGetters } from 'vuex';

export default {
  name: "UserRating",
  props: {
    title: {
      type: String,
      default: "Рейтинг игроков"
    },
  },
  data() {
    return {
      users: () => []
    }
  },
  mounted() {
    this.getLeaders()
  },
  computed: {
    ...mapGetters('userData', [
      'getUserId',
      'getUsername',
      'getFirstName'
    ]),
    ratingIsNotEmpty() {
      return this.users.length != 0
    },
    currentUserInRating10() {
      return this.users.length <= 10
    },
    sortedRating() {
      const copy = this.users
      return copy.sort((a, b) => b['games_win'] - a['games_win'])
    }
  },
  methods: {
    async getLeaders(){
      try {
        const response = await axiosInstance.get(`/get-leaders/${this.getUserId}`)
        this.users = response.data
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang="less" scoped>
.rating {

  h2,
  h4 {
    color: #17211E;
  }

  &__title {
    font-size: 28px;

    @media(max-width: 540px) {
      font-size: 24px;
    }
  }

  &__table {
    display: grid;
    margin-top: 12px;
    border-radius: 8px;
    border: solid 1px #216652;

    @media(max-width: 860px) {
      margin-top: 8px;
    }

    &__header {
      background-color: #88D498;
      font-size: 24px;

      @media(max-width: 540px) {
        font-size: 21px;
      }
    }

    &__user {
      background-color: #C6DABF;
      font-size: 21px;

      @media(max-width: 540px) {
        font-size: 18px;
      }
    }
  }
}

.row {
  width: 100%;
  display: inline-grid;
  grid-template-columns: 1fr 2fr 1fr;
  border: solid 1px #216652;
  padding: 10px 0;

  &--first {
    border-radius: 8px 8px 0 0;
  }

  &--last {
    border-radius: 0 0 8px 8px;
  }

  &--blank {
    grid-template-columns: 1fr;
    background-color: #C6DABF;
    padding: 0 0 12px 0;
    letter-spacing: 4px;
    line-height: 15px;

    @media(max-width: 560px) {
      padding: 0 0 8px 0;
    }
  }
}

.not-found h4 {
  color: #8b8b8b;
  font-size: 24px;
  margin-top: 6px;
}
</style>