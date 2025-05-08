<template>
  <div class="section">
    <div class="section-header">
      <h3 class="section-title">{{ section.title }}</h3>
      <p class="section-description">{{ section.description }}</p>
    </div>

    <div class="section-items">
      <agreement-toggle
          v-for="item in section.items"
          :key="item.id"
          :section-id="section.id"
          :item="item"
          :disabled="section.required || item.immutable"
      />
    </div>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "@/less/const.less";

.section {
  margin-bottom: @padding-large;
  padding: @padding-medium;
  border-radius: @border-radius;
  background-color: lighten(@secondary-color, 4%);
}

.section-header {
  margin-bottom: @padding-medium;
  text-align: left;
}

.section-title {
  margin: 0 0 @padding-small 0;
  font-size: @font-size-large;
  color: @text-color;
  font-weight: 600;
  text-align: left;
}

.section-description {
  margin: 0;
  font-size: @font-size-base;
  color: @text-secondary;
  line-height: 1.5;
  text-align: left;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: @gap;
  padding-left: 0;
  margin-left: -10px;
}
</style>