import { mapMutations } from "vuex";

export const notice = {
  methods: {
    ...mapMutations('notice', [
      'SET_NOTICE'
    ]),

    showNotice(text) {
      this.SET_NOTICE(text);
    }
  }
}