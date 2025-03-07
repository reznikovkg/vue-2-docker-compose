<template>
	<div class="header">
		<div class="header__title">
			<h1>Русская Рыбалка</h1>
		</div>
		<div class="header__balance">
			<p>
				Баланс: <span>{{ balance }} золота</span>
			</p>
		</div>
		<div class="header__menu">
			<button class="header__menu__button" @click="goToInventory">
				Инвентарь
			</button>
			<button class="header__menu__button" @click="goToTrade">Торговля</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		balance: {
			type: Number,
			required: true,
		},
	},
	methods: {
		goToInventory() {
			this.$emit("go-to-inventory");
		},
		goToTrade() {
			this.$emit("go-to-trade");
		},
	},
};
</script>

<style scoped lang="less">
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px 30px;
	background: linear-gradient(135deg, #2193b0, #6dd5ed);
	border-bottom: 3px solid rgba(255, 255, 255, 0.3);
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 10px;

	&__title {
		font-size: 26px;
		font-weight: bold;
		color: white;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
	}

	&__balance {
		font-size: 20px;
		color: #ffeb3b;
		font-weight: bold;
		padding: 5px 15px;
		border-radius: 5px;
	}

	&__menu {
		&__button {
			padding: 12px 18px;
			margin-left: 15px;
			background: #ff9800;
			color: white;
			border: none;
			border-radius: 8px;
			cursor: pointer;
			font-size: 16px;
			font-weight: bold;
			transition: all 0.3s ease-in-out;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);

			&:hover {
				background: #e68900;
				transform: scale(1.05);
			}
		}
	}
}
</style>
