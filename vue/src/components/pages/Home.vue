<template>
  <div class="main-page">
    <div class="main-page__wrapper">
      <div class="main-page__wrapper__elements">
        <ElementItem
          v-for="(element, index) in getOpenedElements"
          :key="element + index"
          :name="element"
          v-on:click.native="onElementClick(element)"
        />
      </div>
      <div class="main-page__wrapper__table">
        <ElementItem
          v-for="(element, index) in getTableElements"
          :key="element + index"
          :name="element"
        />
      </div>
      <button @click="this.addOpenedElement">Mix</button>
      <button @click="this.clearTable">Clear</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ElementItem from "../parts/ElementItem.vue";

export default {
  name: "HomePage",
  components: {
    ElementItem,
  },
  computed: {
    ...mapGetters("elements", ["getOpenedElements", "getTableElements"]),
  },
  methods: {
    ...mapActions("elements", [
      "addItemToTable",
      "clearTable",
      "addOpenedElement",
    ]),
    onElementClick(element) {
      console.log(element);

      this.addItemToTable(element);
    },
  },
};
</script>

<style scoped lang="less">
.main-page {
  display: flex;
  justify-content: center;
  &__wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-width: 5000px;
    width: 100vw;
    max-width: 500px;
    gap: 15px;
    background-color: wheat;
    border: 1px solid black;
    padding: 20px 20px;
    &__elements {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      height: 70%;
      overflow: auto;
      background-color: white;
      gap: 13px;
      padding: 20px 10px;
    }
    &__table {
      display: flex;
      align-content: flex-start;
      flex-wrap: wrap;
      overflow: auto;
      height: 20%;
      background-color: cadetblue;
      gap: 13px;
      padding: 20px 10px;
    }
  }
}
</style>
