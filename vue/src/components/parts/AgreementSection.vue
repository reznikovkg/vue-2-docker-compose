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

.section-base() {
  margin-bottom: @padding-large;
  padding: @padding-medium;
  border-radius: @padding-small;
  background-color: lighten(@secondary-color, 4%);
}

.text-base() {
  margin: 0;
  text-align: left;
  color: @text-color;
}

.section {
  .section-base();

  &-header {
    margin-bottom: @padding-medium;
    .text-base();
  }

  &-title {
    .text-base();
    font-size: @font-size-large;
    font-weight: 600;
    margin-bottom: @padding-small;
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
    gap: @gap;
    padding-left: 0;
    margin-left: -10px;
    .text-base();
  }
}
</style>