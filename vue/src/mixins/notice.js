import { mapMutations } from "vuex";

export const notice = {
  methods: {
    ...mapMutations('notice', [
      'setNotice'
    ]),

    showNotice(text) {
      this.setNotice(text);
    }
  }
}