<template>
  <div class="section" :class="{ 'new-section': isNew, 'required-section': section.required }">
    <div class="section-header">
      <h3 class="section-title">
        {{ section.title }}
        <span v-if="isNew" class="new-badge">Новое</span>
        <span v-if="section.required" class="required-badge">Обязательное</span>
      </h3>
      <p class="section-description">{{ section.description }}</p>
    </div>

    <div class="section-items">
      <agreement-toggle
          v-for="item in section.items"
          :key="item.id"
          :section-id="section.id"
          :item="item"
          :disabled="section.required || item.immutable"
          :is-new="isNewItem(item.id)"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AgreementToggle from './AgreementToggle.vue';

export default {
  name: 'AgreementSection',
  components: { AgreementToggle },
  props: {
    section: {
      type: Object,
      required: true,
      validator: (section) => {
        return ['id', 'title', 'description', 'required', 'items'].every(
            (key) => key in section
        );
      }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('agreement', ['isNewItem'])
  }
};
</script>

<style lang="less" scoped>
@import "@/less/const.less";

.section-base() {
  margin-bottom: @padding-large;
  padding: @padding-medium;
  border-radius: @border-radius;
  background-color: lighten(@secondary-color, 4%);
  transition: all @transition-duration ease;
}

.text-base() {
  margin: 0;
  text-align: left;
  color: @text-color;
}

.badge() {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75em;
  margin-left: @padding-small;
  vertical-align: middle;
}

.section {
  .section-base();
  position: relative;
  overflow: hidden;

  &-header {
    margin-bottom: @padding-medium;
    .text-base();
  }

  &-title {
    .text-base();
    font-size: @font-size-large;
    font-weight: 600;
    margin-bottom: @padding-small;
    display: flex;
    align-items: center;
  }

  &-description {
    .text-base();
    font-size: @font-size-base;
    color: @text-secondary;
    line-height: 1.5;
  }

  &-items {
    display: flex;
    flex-direction: column;
    gap: @padding-medium;
    .text-base();
  }

  &.new-section {
    border-left: 3px solid @accent-color;
    background-color: fade(@accent-color, 5%);
    animation: pulse 2s infinite;

    .new-badge {
      .badge();
      background-color: @accent-color;
      color: white;
    }
  }

  &.required-section {
    border-left: 3px solid @primary-color;

    .required-badge {
      .badge();
      background-color: @primary-color;
      color: white;
    }
  }
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 fade(@accent-color, 20%); }
  50% { box-shadow: 0 0 0 4px fade(@accent-color, 0%); }
  100% { box-shadow: 0 0 0 0 fade(@accent-color, 0%); }
}
</style>