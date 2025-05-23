<template>
  <transition name="modal-fade">
    <div
        v-if="isVisible"
        class="agreement-modal"
        role="dialog"
        aria-modal="true"
        @keydown.esc="handleEscape"
    >
      <div class="modal-overlay" @click.self="handleOverlayClick"></div>

      <div class="modal-container">
        <div class="modal-header">
          <h2 id="agreement-modal-title" class="modal-title">
            {{ modalTitle }}
          </h2>
          <button
              class="modal-close-button"
              @click="closeModal"
              aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div class="modal-body">
          <p v-if="modalDescription" class="modal-description">
            {{ modalDescription }}
          </p>

          <div class="sections-grid">
            <agreement-section
                v-for="section in visibleSections"
                :key="`section-${section.id}`"
                :section="section"
                class="agreement-section"
            />
          </div>
        </div>

        <div class="modal-footer">
          <div class="footer-actions">
            <div class="action-buttons">
              <button
                  class="btn btn-reject"
                  @click="handleRejectAll"
                  :disabled="isRejectDisabled"
              >
                {{ rejectAllText }}
              </button>
              <button
                  class="btn btn-accept"
                  @click="handleAcceptAll"
              >
                {{ acceptAllText }}
              </button>
            </div>
            <button
                class="btn btn-save"
                @click="handleSave"
                :disabled="isSaveDisabled"
            >
              {{ saveText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AgreementSection from './AgreementSection.vue';

export default {
  name: 'AgreementModal',
  components: { AgreementSection },

  props: {
    persistent: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('agreement', [
      'getConfig',
      'getSettings',
      'shouldShowModal'
    ]),

    isVisible() {
      return this.shouldShowModal;
    },

    modalConfig() {
      return this.getConfig?.modal || {};
    },

    modalTitle() {
      return this.modalConfig.title || 'Настройки конфиденциальности';
    },

    modalDescription() {
      return this.modalConfig.description || '';
    },

    visibleSections() {
      return this.getConfig?.sections?.filter(s => !s.hidden) || [];
    },

    acceptAllText() {
      return this.modalConfig.acceptAllButton || 'Принять все';
    },

    rejectAllText() {
      return this.modalConfig.rejectAllButton || 'Отклонить все';
    },

    saveText() {
      return this.modalConfig.saveButton || 'Сохранить настройки';
    },

    isRejectDisabled() {
      return this.visibleSections.every(s => s.required);
    },

    isSaveDisabled() {
      return false;
    }
  },

  methods: {
    ...mapActions('agreement', [
      'acceptAll',
      'rejectAll',
      'saveSettings',
      'hideModal'
    ]),

    closeModal() {
      if (!this.persistent) {
        this.hideModal();
      }
    },

    handleOverlayClick() {
      if (!this.persistent) {
        this.hideModal();
      }
    },

    handleEscape() {
      this.closeModal();
    },

    async handleAcceptAll() {
      await this.acceptAll();
      this.$emit('accepted');
    },

    async handleRejectAll() {
      await this.rejectAll();
      this.$emit('rejected');
    },

    async handleSave() {
      await this.saveSettings();
      this.$emit('saved');
      this.closeModal();
    }
  },

  mounted() {
    document.addEventListener('keydown', this.handleEscape);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.handleEscape);
  }
};
</script>

<style lang="less" scoped>
@import "@/less/const.less";

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.agreement-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: @modal-z-index;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @overlay-color;
  backdrop-filter: blur(2px);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: @modal-max-width;
  max-height: 90vh;
  background-color: @white;
  border-radius: @border-radius;
  box-shadow: @box-shadow;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: @padding-large;
  border-bottom: 1px solid @border-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
  font-size: @font-size-large;
  color: @text-color;
}

.modal-close-button {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: @text-secondary;
  padding: 0 @padding-small;
  transition: color 0.2s ease;

  &:hover {
    color: @text-color;
  }
}

.modal-body {
  padding: @padding-large;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-description {
  margin: 0 0 @padding-large 0;
  color: @text-secondary;
  line-height: 1.5;
}

.sections-grid {
  display: grid;
  gap: @padding-medium;
}

.modal-footer {
  padding: @padding-medium @padding-large;
  border-top: 1px solid @border-color;
  background-color: @secondary-color;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: @padding-small;
}

.btn {
  padding: @padding-small @padding-medium;
  border-radius: calc(@border-radius / 2);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;

  &-accept {
    background-color: @primary-color;
    color: @white;

    &:hover {
      background-color: darken(@primary-color, 10%);
    }
  }

  &-reject {
    background-color: @secondary-color;
    color: @text-color;
    border: 1px solid @border-color;

    &:hover {
      background-color: darken(@secondary-color, 5%);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &-save {
    background-color: @primary-color;
    color: @white;

    &:hover {
      background-color: darken(@primary-color, 10%);
    }
  }
}

@media (max-width: @mobile-breakpoint) {
  .modal-container {
    width: 95%;
  }

  .footer-actions {
    flex-direction: column;
    gap: @padding-small;
  }

  .action-buttons {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex-grow: 1;
  }
}
</style>