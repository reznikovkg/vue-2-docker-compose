<template>
  <div class="enemy center-horizontal center-vertical noselect"
    @click="() => onEnemyClick()"
  >
    <div class="enemy-intent">
      <img class="enemy-intent__sprite"
        :src="enemy.intent.type"
      />
      <p class="enemy-intent__text">{{ enemy.intent.values[0] }}</p>
      <p class="enemy-intent__text" v-if="enemy.intent.type == actions.ATTACK_MULTIPLE">
        x{{ enemy.intent.values[1] }}
      </p>
      <p class="enemy-intent__text" v-if="enemy.intent.type == actions.ATTACK_AND_DEFEND">
        /{{ enemy.intent.values[1] }}
      </p>
    </div>
    <div class="enemy-image">
      <img class="enemy-image__sprite" :src="enemy.base.image" draggable="false"/>
    </div>
    <HealthbarComponent :currentHealth="enemy.health" :maxHealth="enemy.base.maxHealth" :shield="enemy.shield"/>
  </div>
</template>

<script>
import HealthbarComponent from '../common/HealthbarComponent.vue';
import enemyAction from '../common/enemyAction';

export default {
  components: {
    HealthbarComponent
  },
  props: {
    enemy: Object,
  },
  computed: {
    actions() {
      return enemyAction;
    },
  },
  methods: {
    onEnemyClick() {
      this.$emit("onEnemyClick", this.enemy);
    }
  },
};
</script>

<style scoped lang="less">
.enemy {
  height: 400px;
  margin-left: 10px;

  &-intent {
    display: flex;
    height: 30px;
    width: fit-content;
    line-height: 30px;

    &__sprite {
      height: 100%;
    }

    &__text {
      height: 40px;
      font-size: 20px;
      font-weight: bold;
    }
  }

  &-image {
    height: 85%;
    width: fit-content;

    &__sprite {
      height: 100%;
    }
  }
}
</style>
