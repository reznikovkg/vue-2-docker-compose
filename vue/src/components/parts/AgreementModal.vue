<template>
  <transition name="modal">
    <div v-if="shouldShow" class="agreement-modal" role="dialog" aria-modal="true">
      <div class="modal-overlay" @click.self="handleOverlayClick"></div>

      <div class="modal-container">
        <div class="modal-header">
          <h2 id="agreement-modal-title">{{ modalTitle }}</h2>
          <button
              class="close-button"
              @click="hideModal"
              aria-label="Close agreement modal"
          >
            &times;
          </button>
        </div>

        <div class="modal-content" aria-labelledby="agreement-modal-title">
          <p class="modal-description">{{ modalDescription }}</p>

          <div class="sections-container">
            <agreement-section
                v-for="section in filteredSections"
                :key="section.id"
                :section="section"
                class="agreement-section"
            />
          </div>
        </div>

        <div class="modal-footer">
          <div class="buttons-group">
            <button
                class="btn btn-secondary"
                @click="rejectAll"
                :disabled="isRejectAllDisabled"
            >
              {{ rejectAllButtonText }}
            </button>

            <button
                class="btn btn-secondary"
                @click="acceptAll"
            >
              {{ acceptAllButtonText }}
            </button>
          </div>

          <button
              class="btn btn-primary"
              @click="saveSettings"
              :disabled="isSaveDisabled"
          >
            {{ saveButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import AgreementSection from './AgreementSection.vue';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'AgreementModal',
  components: { AgreementSection },

  computed: {
    ...mapState('agreement', ['config', 'settings']),
    ...mapGetters('agreement', ['shouldShowModal', 'isSectionRequired']),

    shouldShow() {
      return this.shouldShowModal;
    },

    modalTitle() {
      return this.config?.modal?.title || 'Privacy Settings';
    },

    modalDescription() {
      return this.config?.modal?.description || '';
    },

    filteredSections() {
      return this.config?.sections?.filter(section => !section.hidden) || [];
    },

    saveButtonText() {
      return this.config?.modal?.saveButton || 'Save Settings';
    },

    acceptAllButtonText() {
      return this.config?.modal?.acceptAllButton || 'Accept All';
    },

    rejectAllButtonText() {
      return this.config?.modal?.rejectAllButton || 'Reject All';
    },

    isRejectAllDisabled() {
      return this.filteredSections.every(section => section.required);
    },
  },

  methods: {
    ...mapActions('agreement', [
      'acceptAll',
      'rejectAll',
      'saveSettings',
      'hideModal'
    ]),
  }
};
</script>

<style scoped>
.agreement-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.modal-container {
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.modal-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
}

.buttons-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #42b983;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #3aa876;
}

.btn-primary:disabled {
  background-color: #a0d9bb;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.close-button {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0 10px;
}

.close-button:hover {
  color: #333;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
  }

  .modal-footer {
    flex-direction: column;
    gap: 10px;
  }

  .buttons-group {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex-grow: 1;
  }
}
</style>