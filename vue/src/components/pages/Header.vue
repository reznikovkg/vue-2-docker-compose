<template>
  <header class="header">
    <div class="header__logo">
      <img class="header__logo-image" src="@/assets/log.png" alt="Логотип">
      <span class="header__title gradient-text">Персонажи</span>
    </div>
    <div class="header__search">
      <input class="header__search-input" type="text" placeholder="Поиск...">
    </div>
    <router-link to="/gallery" class="header__gallery-button">
      Галерея
    </router-link>
    <button class="header__menu-button">Меню</button>
  </header>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<style scoped lang="less">
	@import "@/less/const.less";

	.header {
		color: @cWhite;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		font-size: @fsXXXLarge;
		font-weight: bold;
		font-family: @ffOne;

		&__logo {
			display: flex;
			align-items: center;

			&-image {
				width: 100px;
				height: auto;
				margin-right: 10px;
			}
		}

		&__search {
			flex-grow: 1;
			display: flex;
			justify-content: center;

			&-input {
				width: 50%;
				padding: 8px;
				font-size: @fsMedium;
				border: @sizeBorderDefault solid @cGray;
				border-radius: 5px;
				font-family: @ffOne;
			}
		}

		&__gallery-button {
			margin: 0 20px;
			padding: 10px 20px;
			background: @cDarkBlue;
			color: @cWhite;
			text-decoration: none;
			border-radius: 5px;
			font-size: @fsXXLarge;
			transition: background 0.3s;
			font-family: @ffOne;

			&:hover {
				background: darken(@cDarkBlue, 10%);
			}
		}

		&__menu-button {
			background: none;
			color: @cWhite;
			border: @sizeBorderThick solid @cWhite;
			padding: 10px 20px;
			font-size: @fsXXLarge;
			cursor: pointer;
			border-radius: 5px;
			font-family: @ffOne;

			&:hover {
				border-color: @cRed;
			}
		}
	}

	.gradient-text {
		background: linear-gradient(to right, #ff8a00, #e52e71);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}
</style>