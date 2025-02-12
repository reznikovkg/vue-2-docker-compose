<template>
  <div class="item-card" @click="$emit('click')">
    <img
      :src="require(`../../assets/inventory/${item.image}`)"
      :alt="item.name"
      class="item-image"
    />
    <div class="item-name">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  height: 120px;
}

.item-card:hover {
  transform: scale(1.1);
}

.item-image {
  width: 50px;
  height: 50px;
}

.item-name {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}
</style>
