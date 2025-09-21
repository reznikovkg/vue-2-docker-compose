<template>
  <div class="levels-page">
    <h1 class="levels-page__title">Список уровней</h1>

    <div class="levels-page__empty" v-if="levels.length === 0">
      <p>
        Пока нет уровней. Зайдите в
        <router-link to="/admin">админку</router-link>
        и создайте первый.
      </p>
    </div>

    <div class="levels-page__list" v-else>
      <div
          v-for="level in levels"
          :key="level.id"
          class="levels-page__card"
      >
        <h3 class="levels-page__card-title">{{ level.name }}</h3>
        <img
            v-if="level.image1"
            :src="level.image1"
            alt="preview"
            class="levels-page__preview"
        >
        <div class="levels-page__actions">
          <router-link :to="`/play/${level.id}`" class="levels-page__link">
            Играть
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLevels } from '@/utils/storage'

export default {
  name: 'LevelsPage',
  data() {
    return {
      levels: []
    }
  },
  mounted() {
    this.levels = getLevels()
  }
}
</script>

<style lang="less" scoped>
@primary: #42b983;
@text: #333;
@muted: #777;

.rounded(@r: 6px) { border-radius: @r; }

.levels-page {
  padding: 16px;

  &__title {
    color: @primary;
    margin-bottom: 12px;
  }

  &__empty {
    color: @muted;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__card {
    border: 1px solid #ccc;
    padding: 8px;
    .rounded(6px);

    &-title {
      font-weight: bold;
      margin-bottom: 6px;
    }
  }

  &__preview {
    max-width: 100%;
    display: block;
  }

  &__link {
    display: inline-block;
    margin-top: 6px;
    padding: 4px 8px;
    background: @primary;
    color: #fff;
    text-decoration: none;
    .rounded(4px);
  }
}
</style>

