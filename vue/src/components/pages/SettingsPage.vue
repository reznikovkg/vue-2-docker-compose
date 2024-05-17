<template>
  <PageLayout>
    <div class="settings">
      <div class="settings__item">
        <span>Администратор</span>
        <ElSwitch 
          v-model="mode"
          activeColor="green"
          inactiveColor="grey"
        />
      </div>
      <div class="settings__item">
        <span>Товары с API</span>
        <ElSwitch 
          v-model="statusAPI"
          activeColor="green"
          inactiveColor="grey"
        />
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/parts/PageLayout.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SettingsPage',
  components: {
    PageLayout
  },
  computed: {
    ...mapGetters('settings', [
      'getMode',
      'getStatusAPI'
    ]),
    mode: {
      get () {
        return this.getMode
      },
      set (value) {
        this.setMode(value)
      }
    },
    statusAPI: {
      get () {
        return this.getStatusAPI
      },
      set (value) {
        this.setStatusAPI(value)
      }
    }
  },
  methods: {
    ...mapActions('settings', [
      'setMode',
      'setStatusAPI'
    ]),
  }
}
</script>

<style scoped lang="less">
.settings {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 64px;
  &__item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
