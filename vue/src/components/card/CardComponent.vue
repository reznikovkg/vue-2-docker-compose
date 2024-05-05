<template>
  <div class="card">
    <div class="img-container">
      <img :src="cardImg" class="card__img" />
    </div>
    <div v-if="isEdit">
      <input ref="userTitle" class="card__title-edit" />
      <textarea ref="userDesc" class="card__desc-edit"></textarea>
      <div class="edit-btns">
        <button class="btn" @click="closeEditMode">Cancel</button>
        <button class="btn" @click="saveEdit">Save changes</button>
      </div>
    </div>
    <div v-else class="info-container">
      <div class="card__title">{{ cardTitle }}</div>
      <div v-if="isEditable" class="card__desc">{{ cardDesc }}</div>
      <div class="edit-btns">
        <button v-if="isEditable" class="btn" @click="showEditMode">
          Edit
        </button>
        <button v-if="isEditable" class="btn" @click="addCard">
          Add Recipe
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    imgUrl: {
      type: String,
      default:
        "https://pho-hoai-vietnamese.com/img/placeholders/grey_fork_and_knife.png?clckid=8abfa2cc",
    },
    title: { type: String, default: "Title" },
    desc: { type: String, default: "Description" },
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
      console.log("some");
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
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
  &:hover .card__img {
    transform: scale(1.04);
  }
  .img-container {
    max-width: 220px;
    height: 220px;
    border: 3px solid black;
    transition: 0.4s;
    overflow: hidden;
  }
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: 0.4s;
  }
  &__title {
    text-transform: capitalize;
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

  .edit-btns {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
}
</style>
