<template>
  <PageLayout>
    <div class="start-screen">
      <h1 class="game-title">Кот</h1>

      <div class="game-description">
        <p>Ваш друг уехал из города и попросил вас присмотреть за котом.</p>
        <p>Кажется, он слишком спешил и ничего не объяснил...</p>
        <p>Ничего страшного, разберетесь на месте.</p>
      </div>

      <button
          class="start-button"
          @click="() => startGame"
      >
        К игре
      </button>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout'
import { helpModal } from "@/mixins/modals";
import {RouteNames} from "@/router/routes";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout
  },
  methods: {
    startGame() {
      this.$router.push({ name: RouteNames.GAME })
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/less/const.less';

.start-screen {
  max-width: 800px;
  text-align: center;
  background-color: white;
  border-radius: 8px;
}

.game-title {
  color: @cBaseNine;
  font-family: 'Jost', sans-serif;
}

.game-description {
  line-height: 1.6;
  color: @cBaseNine;
  text-align: left;
  padding: 1rem;
}

.start-button {
  padding: 12px 24px;
  background-color: @cBaseSix;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>