<template>
  <div>
    <RouterView />
    <ModalContainer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ModalContainer from "@/components/parts/ModalContainer";
import { axiosInstance } from "@/http-helper/http-config";

export default {
  components: {
    ModalContainer
  },
  mounted() {
    this.loadData()
  },
  methods: {
    ...mapActions('userData', [
      'setUserData'
    ]),
    loadData() {
      const script = document.createElement('script')
      script.src = "https://telegram.org/js/telegram-web-app.js?56"
      document.head.appendChild(script)

      script.onload = async () => {
        const initData = window.Telegram.WebApp.initData
        const userData = this.parseInitData(initData).user
        try {
          const response = await axiosInstance.post("/check-if-user-authenticated", {
            initData: initData,
          });
          if (!response.data) {
            window.Telegram.WebApp.close();
          }
        } catch (error) {
          console.log("Cannot verificate user");
        }
        if (userData) {
          this.setUserData(userData)
        }
      }

      script.onerror = () => {
        console.error('Telegram script was not loaded')
      }
    },
    parseInitData(initData) {
      const params = new URLSearchParams(initData)
      return {
          user: JSON.parse(params.get('user')),
          username: params.get('username'),
          hash: params.get('hash'),
          authDate: params.get('auth_date'),
          startParam: params.get('start_param'),
          chatType: params.get('chat_type'),
          chatInstance: params.get('chat_instance'),
      }
    },
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Rubik+Spray+Paint&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Neucha&display=swap');

body {
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5 {
  font-weight: 400;
  font-style: normal;
  color: #EFF1F4;
  margin: 0;
}

h1, h3, h5 {
  font-family: "Rubik Spray Paint", system-ui;
}

h2, h4 {
  font-family: "Neucha", cursive;
}
</style>
