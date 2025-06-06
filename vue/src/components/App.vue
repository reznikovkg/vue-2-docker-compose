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

    <button
        class="privacy-settings-button"
        @click="openPrivacySettings"
        aria-label="Настройки конфиденциальности"
    >
      <svg class="privacy-icon" viewBox="0 0 24 24">
        <path d="M12,3C7,3 3,7 3,12C3,17 7,21 12,21C17,21 21,17 21,12C21,7 17,3 12,3M12,5C15.9,5 19,8.1 19,12C19,15.9 15.9,19 12,19C8.1,19 5,15.9 5,12C5,8.1 8.1,5 12,5M12,7C14.2,7 16,8.8 16,11C16,13.2 14.2,15 12,15C9.8,15 8,13.2 8,11C8,8.8 9.8,7 12,7M12,9C10.9,9 10,9.9 10,11C10,12.1 10.9,13 12,13C13.1,13 14,12.1 14,11C14,9.9 13.1,9 12,9Z"/>
      </svg>
      <span class="privacy-text">Настройки</span>
    </button>

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
    ...mapActions('agreement', ['openPrivacySettings']),

    async openPrivacySettings() {
      try {
        await this.$store.dispatch('agreement/openPrivacySettings');
      } catch (error) {
        console.error('Error opening privacy settings:', error);
      }
    }
  },
  created() {
    this.initialize();
    if (this.shouldShowModal) {
      this.openPrivacySettings();
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
  position: relative;
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

.privacy-settings-button {
  position: fixed;
  bottom: @padding-large;
  right: @padding-large;
  display: flex;
  align-items: center;
  gap: @padding-small;
  padding: @padding-small @padding-medium;
  background-color: @primary-color;
  color: white;
  border: none;
  border-radius: @border-radius;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transition: all @transition-duration @transition-timing;

  &:hover {
    background-color: darken(@primary-color, 10%);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .privacy-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  .privacy-text {
    @media (max-width: @mobile-breakpoint) {
      display: none;
    }
  }
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

  .privacy-settings-button {
    bottom: @padding-medium;
    right: @padding-medium;
  }
}
</style>