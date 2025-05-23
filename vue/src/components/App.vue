<template>
  <div class="app">
    <div class="nav">
      <RouterLink to="/" class="nav-link">Главная</RouterLink>
      <span class="nav-separator">|</span>
      <RouterLink to="/about" class="nav-link">О проекте</RouterLink>
    </div>

    <main class="main-content">
      <RouterView/>
    </main>

    <component
        v-for="modal in activeModals"
        :key="modal.name"
        :is="modal.component"
        v-bind="modal.props"
        @close="closeModal(modal.name)"
    />
  </div>
</template>

<script>
import AgreementModal from '@/components/parts/AgreementModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    AgreementModal
  },
  computed: {
    ...mapGetters('modals', ['activeModals']),
    ...mapGetters('agreement', ['shouldShowModal'])
  },
  methods: {
    ...mapActions('modals', ['openModal', 'closeModal']),
    ...mapActions('agreement', ['initialize']),
  },
  created() {
    this.initialize();
    if (this.shouldShowModal) {
      this.openModal({
        name: 'agreement',
        component: 'AgreementModal',
        props: {
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "@/less/const.less";

.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: @text-color;
  max-width: 1200px;
  margin: 0 auto;
  padding: @padding-large;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav {
  padding: @padding-medium 0;
  margin-bottom: @padding-large;
  border-bottom: 1px solid @border-color;

  .nav-link {
    color: @text-color;
    text-decoration: none;
    font-weight: 500;
    padding: @padding-small @padding-medium;
    border-radius: @border-radius;
    transition: all @transition-duration @transition-timing;

    &:hover {
      color: @primary-color;
      background-color: fade(@primary-color, 10%);
    }

    &.router-link-exact-active {
      color: @primary-color;
      font-weight: bold;
    }
  }

  .nav-separator {
    color: @text-secondary;
    margin: 0 @padding-small;
  }
}

.main-content {
  flex: 1;
  padding: 0 @padding-medium @padding-large;
}

@media (max-width: @mobile-breakpoint) {
  .app {
    padding: @padding-medium;
  }

  .nav {
    margin-bottom: @padding-medium;

    .nav-link {
      padding: @padding-small;
    }
  }
}
</style>