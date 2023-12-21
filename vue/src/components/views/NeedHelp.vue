<template>
    <main>
      <div class="content-4">
        <div class="left-block">
          <img src="@/assets/images/music.png" alt="photo" class="image">
        </div>
        <div class="right-block">
          <h2 class="heading">Need help?</h2>
          <p class="desc">Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
          <button class="topbanner__button">Contact Us!</button>
        </div>
      </div>
    </main>
</template>

<script>
  export default {
    name: 'NeedHelp'
  }
</script>

<style scoped lang="less">
.content-4 {
  display: flex;
  border-radius: 15px;
  background-color: rgb(246, 249, 253);
  padding: 12px;
  margin-top: 20px;
}

.desc {
  font-weight: 700;
  font-size: 14px;
  color: rgba(51, 67, 83, 0.8)
}

.image {
  width: 250px;
  height: auto;
}

.topbanner {
  &__button {
    border: none;
    border-radius: 15px;
    padding: 15px 40px 15px 40px;
    background: linear-gradient(to right, #FE847E, #FF5D42);
    color: #FFFFFF;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 40px;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
      background: white;
      outline: 1px solid #FF5D42;
      color: #FF5D42;
    }
  }

  &__button {
    margin-top: 20px;
  }
}

.heading {
  font-weight: 700;
  font-size: 56px;
}

.right-block {
  width: 60%;
  padding-left: 20px;
}
</style>
