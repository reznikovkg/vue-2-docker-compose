<template>
  <div class="toggle-item" :class="{ disabled: disabled }">
    <label class="toggle-label">
      <div class="toggle-control">
        <input
            type="checkbox"
            :checked="isEnabled"
            :disabled="disabled"
            @change="handleChange"
            class="toggle-input"
        />
        <span class="toggle-slider"></span>
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
  props: {
    sectionId: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
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

<style scoped>
.toggle-item {
  padding: 12px 15px;
  border-radius: 6px;
  background-color: white;
  border: 1px solid #eee;
}

.toggle-item.disabled {
  opacity: 0.7;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.toggle-control {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-slider {
  background-color: #42b983;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.toggle-input:disabled + .toggle-slider {
  cursor: not-allowed;
  background-color: #e0e0e0;
}

.toggle-content {
  display: flex;
  flex-direction: column;
}

.toggle-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 3px;
}

.toggle-description {
  font-size: 13px;
  color: #666;
}
</style>