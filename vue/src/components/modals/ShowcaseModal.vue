<template>
  <ModalComponent>
    <div class="showcase-container">
      <button @click="() => $emit('close')" class="showcase-close-button">
        Close
      </button>
      <div class="showcase">
        <div
            class="showcase__element"
            v-for="(card, index) in deck"
            :key="index"
        >
          <ShowcaseCard
              :type="card.getType()"
              :score="card.getScore()"
              :image-uri="card.getImage()"
              :index="index"
              on-table
          />
        </div>
      </div>
    </div>
  </ModalComponent>
</template>

<script>

import ModalComponent from '@/components/parts/Modal.vue';
import { INIT_DECK } from '@/engine/constants';
import ShowcaseCard from '@/components/game/ShowcaseCard.vue';

export default {
  name: 'ShowcaseModal',
  components: { ShowcaseCard, ModalComponent },
  data() {
    return { deck: INIT_DECK };
  }
}
</script>

<style scoped lang="less">
.showcase {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  padding: 2vh 10vw;

  &-container {
    width: 80vw;
  }

  &__element {
    margin: 10px 0;
  }

  &-close-button {
    background-color: rgb(204, 204, 204);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;

    &:hover {
      background-color: #a8a8a8;
    }
  }
}
</style>
