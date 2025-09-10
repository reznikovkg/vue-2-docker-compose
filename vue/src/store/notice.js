export default {
  namespaced: true,
  state: {
    noticeText: ""
  },
  getters: {
    getNoticeText: (state) => state.noticeText
  },
  mutations: {
    setNotice: (state, text) => {
      state.noticeText = text;
      setTimeout(() => {
        state.noticeText = "";
      }, 5000);
    },
  }
}
