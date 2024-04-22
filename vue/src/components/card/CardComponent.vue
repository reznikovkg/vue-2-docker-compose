<template>
  <router-link :to="`/catalog/${id}`">
    <div class="card">
      <div class="img-container">
        <img :src="cardImg" class="card__img" />
      </div>
      <div v-if="isEdit" class="info-container">
        <input class="card__title-edit" ref="userTitle" />
        <textarea class="card__desc-edit" ref="userDesc"></textarea>
        <button @click="closeEditMode">Отмена</button>
        <button @click="saveEdit">Сохранить изменения</button>
      </div>
      <div v-else class="info-container">
        <div class="card__title">{{ cardTitle.toUpperCase() }}</div>
        <div class="card__desc">{{ cardDesc }}</div>
        <button @click="showEditMode" v-if="isEditable">Редактировать</button>
        <button @click="addCard" v-if="isEditable">Добавить блюдо</button>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    id: {type: String, required: true},
    imgUrl: {
      type: String,
      default:
        "https://pho-hoai-vietnamese.com/img/placeholders/grey_fork_and_knife.png?clckid=8abfa2cc",
    },
    title: { type: String, default: "Название" },
    desc: { type: String, default: "Описание или рецепт" },
    isEditable: { type: Boolean, default: false },
  },
  data() {
    return {
      cardTitle: this.title,
      cardDesc: this.desc,
      cardImg:
        this.imgUrl.length > 0
          ? this.imgUrl
          : "https://pho-hoai-vietnamese.com/img/placeholders/grey_fork_and_knife.png?clckid=8abfa2cc",
      isEdit: false,
    };
  },
  methods: {
    showEditMode() {
      this.isEdit = true;
    },
    closeEditMode() {
      this.isEdit = false;
    },
    saveEdit() {
      this.cardTitle = this.$refs.userTitle.value;
      this.cardDesc = this.$refs.userDesc.value;
      this.isEdit = false;
    },
    addCard() {
      this.$emit("addCard", {
        title: this.cardTitle,
        desc: this.cardDesc,
        imgUrl: this.cardImg,
      });
    },
  },
};
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.card {
  width: 300px;
  border-radius: 9px;
  border: 1px solid #eee;
  font: 600 22px / 26px "sf pro display";
  &:hover {
    cursor: pointer;
  }
  &:hover .card__img {
    transform: scale(1.04);
  }
  .img-container {
    max-width: 300px;
    height: 200px;
    border-radius: 6px;
    transition: 0.4s;
    overflow: hidden;
  }
  .info-container {
    padding: 16px 20px;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.4s;
  }
  &__title-edit {
    width: 100%;
    border-radius: 9px;
    border: 1px solid #eee;
    padding: 6px;
    &:focus {
      outline: none;
    }
  }
  &__desc {
    margin: 3px 0 0 0;
    color: rgba(0, 0, 0, 0.4);
    font: 15px / 18px "sf pro display";
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    &-edit {
      width: 100%;
      display: block;
      height: 100px;
      padding: 6px;
      margin: 6px 0px;
      border-radius: 9px;
      border: 1px solid #eee;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
