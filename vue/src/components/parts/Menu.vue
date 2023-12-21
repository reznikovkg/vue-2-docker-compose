<template>
  <ContentContainer class="wrapper">
    <div class="menu">
      <dropdown trigger="click">
      <span class="el-dropdown-link">
        INTERIOR<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <dropdown-menu slot="dropdown">
          <dropdown-item >Link 1</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
        </dropdown-menu>
      </dropdown>
      <dropdown trigger="click">
      <span class="el-dropdown-link">
        exterior<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <dropdown-menu slot="dropdown">
          <dropdown-item >Link 1</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
          <dropdown-item >Link 2</dropdown-item>
        </dropdown-menu>
      </dropdown>
    </div>
    <SearchInput />
  </ContentContainer>
</template>

<script>
import ContentContainer from "./Container.vue";
import SearchInput from './Search.vue';
import {Dropdown, DropdownMenu, DropdownItem} from "element-ui";

export default {
  name: "MenuComponent",
  components: {ContentContainer, Dropdown, DropdownMenu, DropdownItem, SearchInput},
};
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .menu {
    display: flex;
    align-items: center;
    column-gap: 24px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #FAFAFA;
    text-transform: uppercase;
  }
</style>
