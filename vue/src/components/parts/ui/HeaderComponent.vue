<template>
  <div class="header">
    <div class="header__logo">
      <img :src="icons.LogoIcon" alt="Logo Icon" class="logo-icon">
    </div>
  </div>
</template>

<script>
import * as Icons from '@/assets/icons/icons.js';
export default {
  name: 'HeaderComponent',
  data () {
    return {
      icons: Icons
    }
  },
}
</script>

<style scoped lang="less">
.header {
  &__logo {
    position: absolute;
    top: 50%;
    left: 2%;
    transform: translateY(-50%);
    align-items: center;

    .logo-icon {
      width: 60px;
      height: 60px;
    }
  }
}
</style>  