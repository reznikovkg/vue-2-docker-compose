<template>
  <div class="toggle-item" :class="{ disabled: disabled }">
    <label class="toggle-label">
      <div class="toggle-control">
        <input
            type="checkbox"
            :checked="isEnabled"
            :disabled="disabled"
            @change="(e) => handleChange(e)"
            class="toggle-input"
            aria-hidden="true"
        />
        <span class="toggle-slider" :aria-checked="isEnabled"></span>
      </div>
      <div class="toggle-content">
        <span class="toggle-title">{{ item.title }}</span>
        <span class="toggle-description">{{ item.description }}</span>
      </div>
    </label>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AgreementToggle',
  props: {
    sectionId: {
      type: String,
      required: true,
      validator: (value) => !!value.trim()
    },
    item: {
      type: Object,
      required: true,
      validator: (item) => ['id', 'title', 'description'].every(key => key in item)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('agreement', ['getSetting']),

    isEnabled() {
      return this.getSetting(this.sectionId, this.item.id);
    }
  },

  methods: {
    ...mapActions('agreement', ['toggleSetting']),

    handleChange(event) {
      if (!this.disabled) {
        this.toggleSetting({
          sectionId: this.sectionId,
          itemId: this.item.id,
          value: event.target.checked
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/less/const.less";

.toggle-item {
  padding: @padding-medium @padding-large;
  border-radius: @border-radius - 2px;
  background-color: @white;
  border: 1px solid @border-color;
  transition: all @transition-duration @transition-timing;

  &:hover:not(.disabled) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  &.disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: @padding-large;
  cursor: pointer;
}

.toggle-control {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  flex-shrink: 0;
}

.toggle-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus-visible {
    ~ .toggle-slider {
      box-shadow: 0 0 0 2px fade(@primary-color, 30%);
    }
  }

  &:checked {
    ~ .toggle-slider {
      background-color: @primary-color;

      &:before {
        transform: translateX(26px);
      }
    }
  }
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: @text-secondary;
  transition: all @transition-duration @transition-timing;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: @white;
    transition: all @transition-duration @transition-timing;
    border-radius: 50%;
  }
}

.toggle-input:disabled {
  ~ .toggle-slider {
    cursor: not-allowed;
    background-color: lighten(@text-secondary, 30%);
  }
}

.toggle-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
  text-align: left;
}

.toggle-title {
  font-weight: 500;
  color: @text-color;
  line-height: 1.3;
}

.toggle-description {
  font-size: @font-size-small;
  color: @text-secondary;
  line-height: 1.4;
}
</style>
