<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo-image" src="@/assets/log.png" alt="Логотип">
      <span class="header__title gradient-text">Персонажи</span>
    </div>
    <div class="header__search">
      <input class="header__search-input" type="text" placeholder="Поиск...">
    </div>
    <button class="header__menu-button">Меню</button>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
}
.header__logo {
  display: flex;
  align-items: center;
}
.header__logo-image {
  width: 100px;
  height: auto;
  margin-right: 10px;
}
.header__search {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
.header__search-input {
  width: 50%;
  padding: 8px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
}
.header__menu-button {
  background: none;
  color: white;
  border: 3px solid white;
  padding: 10px 20px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 5px;
}
.header__menu-button:hover {
  border: 3px solid red;
}
</style>