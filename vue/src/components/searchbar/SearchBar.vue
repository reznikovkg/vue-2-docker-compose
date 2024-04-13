<template>
  <div class="searchBar">
    <input
      @input="() => sortFunction(this.userText.trim())"
      v-model="userText"
      type="text"
      class="searchBar__input" />
    <i class="searchBar__icon"></i>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['sortFunction'],
  data: () => {
    return {
      userText: '',
    };
  },
};
</script>

<style lang="less" scoped>
.searchBar {
  max-width: 280px;
  position: relative;
  &__input {
    width: 100%;
    background: rgba(196, 196, 196, 0.1);
    font: 17px / 20px 'sf pro display';
    height: 29px;
    border-radius: 19px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    padding-left: 15px;
    transition: all 200ms;
    &:focus {
      outline: none;
    }
    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.179);
    }
  }
  &__icon {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 2px;
    right: -14px;
    background: url('../../assets/search.svg') no-repeat 50% 50%;
  }
}
</style>
