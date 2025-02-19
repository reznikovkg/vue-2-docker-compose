<template>
  <div class="crafting-table">
    <div
      v-for="(item, index) in tableItems"
      :key="index"
      class="crafting-table__item"
    >
      <ItemCard
        :item="{ name: item.name, image: item.image }"
        @click="() => removeItem(index)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemCard from "./ItemCard.vue";

export default {
  name: "CraftingTable",
  mounted() {
    console.log("tableItems:", this.tableItems);
  },
  components: {
    ItemCard,
  },
  computed: {
    ...mapState(["tableItems"]),
  },
  methods: {
    removeItem(index) {
      this.$emit("remove-item", index);
    },
  },
};
</script>

<style scoped lang="less">
.crafting-table {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  background-color: #8b4513;
  border-radius: 10px;
  width: 80%;
  min-height: 150px;
  align-items: center;
  justify-content: center;

  &__item {
    cursor: pointer;
  }
}
</style>
