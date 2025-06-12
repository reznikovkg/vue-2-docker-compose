<template>
  <transition name="fade">
    <h1 class="notice" v-if="getNoticeText">{{ getNoticeText }}</h1>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NoticeContainer',
  computed: {
    ...mapGetters('notice', [
      'getNoticeText'
    ]),
  },
}
</script>

<style scoped lang="less">
.notice-container {
  width: 0;
  height: 0;
}

.notice {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  z-index: 8;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
