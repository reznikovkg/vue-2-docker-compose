<template>
  <div>
    <div v-if="!isSubscribed" class="banner">
      <div class="banner__subscription">
        <h2>Вы не подписаны на наш Telegram канал. Подпишитесь, чтобы продолжить!</h2>
        <CustomButton
          type="menu"
          :disabled="false"
          @click="goToTelegram"
        >
          Перейти к каналу
        </CustomButton>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TelegramService from "@/api/TelegramService";
import CustomButton from "./CustomButton.vue";

export default {
  components: { CustomButton },
  data() {
    return {
      isSubscribed: false,
      telegramLink: process.env.VUE_APP_TELEGRAM_CHANNEL_LINK,
    };
  },
  methods: {
    goToTelegram() {
      window.open(this.telegramLink, "_blank");
    },
  },
  async created() {
    const tg = window.Telegram.WebApp;
    try {
      this.isSubscribed = await TelegramService.checkSubscription(tg.initData);
    } catch {
      console.error("Бэкенд в данный момент недоступен");
    }
  },
};
</script>

<style scoped lang="less">
.banner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__subscription {
    background: #ffcccc;
    padding: 20px;
    text-align: center;
    border: 1px solid red;
    border-radius: 5px;
    width: 80%;
  }
}
</style>
