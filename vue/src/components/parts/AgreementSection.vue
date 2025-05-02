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
  components: { AgreementToggle },
  props: {
    section: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.section {
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.section-header {
  margin-bottom: 15px;
}

.section-title {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: #333;
}

.section-description {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>