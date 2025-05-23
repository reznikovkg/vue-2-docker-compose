<template>
  <transition name="modal">
    <div v-if="shouldShowModal" class="agreement-modal" role="dialog" aria-modal="true">
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AgreementModal',
  components: { AgreementSection },

  computed: {
    ...mapGetters('agreement', [
      'shouldShowModal',
      'isSectionRequired',
      'getConfig',
      'getSettings'
    ]),

    modalTitle() {
      return this.getConfig?.modal?.title || 'Privacy Settings';
    },

    modalDescription() {
      return this.getConfig?.modal?.description || '';
    },

    filteredSections() {
      return this.getConfig?.sections?.filter(section => !section.hidden) || [];
    },

    saveButtonText() {
      return this.getConfig?.modal?.saveButton || 'Save Settings';
    },

    acceptAllButtonText() {
      return this.getConfig?.modal?.acceptAllButton || 'Accept All';
    },

    rejectAllButtonText() {
      return this.getConfig?.modal?.rejectAllButton || 'Reject All';
    },

    isRejectAllDisabled() {
      return this.filteredSections.every(section => section.required);
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

    handleOverlayClick() {
      this.hideModal();
    }
  }
};
</script>

<style lang="less">
@import "@/less/const.less";

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
    max-height: @modal-max-height;
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

  .modal-content {
    padding: @padding-large;
    overflow-y: auto;
    flex-grow: 1;
  }

  .modal-footer {
    padding: @padding-medium @padding-large;
    border-top: 1px solid @border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: @secondary-color;
  }

  .buttons-group {
    display: flex;
    gap: @gap;
  }

  .btn {
    padding: @padding-small @padding-large;
    border-radius: @border-radius / 2;
    cursor: pointer;
    font-weight: 500;
    transition: all @transition-duration @transition-timing;
  }

  .btn-primary {
    background-color: @primary-color;
    color: @white;
    border: none;

    &:hover {
      background-color: @primary-hover;
    }

    &:disabled {
      background-color: lighten(@primary-color, 20%);
      cursor: not-allowed;
    }
  }

  .btn-secondary {
    background-color: @secondary-color;
    color: @text-color;
    border: 1px solid darken(@secondary-color, 10%);

    &:hover {
      background-color: @secondary-hover;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .close-button {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: @text-secondary;
    padding: 0 @padding-small;

    &:hover {
      color: @text-color;
    }
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: opacity @transition-duration @transition-timing;
  }

  .modal-enter,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active .modal-container,
  .modal-leave-active .modal-container {
    transition: transform @transition-duration @transition-timing,
    opacity @transition-duration @transition-timing;
  }

  .modal-enter .modal-container,
  .modal-leave-to .modal-container {
    transform: translateY(-20px);
    opacity: 0;
  }

  @media (max-width: @mobile-breakpoint) {
    .modal-container {
      width: 95%;
    }

    .modal-footer {
      flex-direction: column;
      gap: @gap;
    }

    .buttons-group {
      width: 100%;
      justify-content: space-between;
    }

    .btn {
      flex-grow: 1;
    }
  }
}
</style>