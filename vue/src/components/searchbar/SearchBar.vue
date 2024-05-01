<template>
  <div class="searchBar">
    <input
      @input="() => sortFunction(this.userText.trim())"
      placeholder="Search all recipes..."
      v-model="userText"
      type="text"
      class="searchBar__input input"
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: ["sortFunction"],
  data: () => {
    return {
      userText: "",
    };
  },
};
</script>

<style lang="less" scoped>
.searchBar {
  width: 55%;
  position: relative;
  &__input {
    width: 100%;
    height: 29px;
    transition: all 200ms;
    background-color: #E7E8DE;
    &:focus {
      outline: none;
    }
    &::placeholder {
      letter-spacing: 1.3px;
      color: #5f5f5d;
      font-weight: 600;
    }
  }
}
</style>
