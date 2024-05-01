<template>
  <div>
    <NavigationBar :links="links"/>
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";
import NavigationBar from "./parts/Navbar.vue";

export default {
  components: {
    ModalContainer,
    NavigationBar,
  },
  data() {
    return {
      links: [
        { to: "/", title: "Главная" },
        { to: "/create", title: "Создать блюдо" },
      ],
    };
  },
};
</script>

<style lang="less">
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap");

body {
  margin: 0;
  padding: 0;
  background-color: #E7E8DE;
  font-family: @alte-reg;
}

a {
  text-decoration: none;
}

section {
  background-color: #E7E8DE;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1,
h2,
h3,
h4,
h5 {
  font-family: @alte-bold;
  color: @cBaseThree;
  margin: 0;
}

h2 {
  font-size: 32px;
}

.p-16 {
  padding: 16px;
}

.d-flex {
  display: flex;
}

.rcms {
  &-divider {
    &-h {
      width: 100%;
      height: @sizeBorderDefault;
      background-color: @cBaseTwo;
    }

    &-v {
    }
  }

  &-loading {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(100, 100, 100, 0.5);
      cursor: wait;
    }
  }
}
</style>
