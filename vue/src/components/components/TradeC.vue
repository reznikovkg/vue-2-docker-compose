<template>
	<div class="trade">
		<h3>Торговля</h3>
		<div class="trade__inventory">
			<h4>Ваш инвентарь</h4>
			<ul class="trade__items">
				<li
					v-for="(fish, index) in inventoryItems"
					:key="index"
					class="trade__items__item"
				>
					{{ fish }}
					<button @click="sellFish(fish)" class="trade__buyBtn">Продать</button>
				</li>
			</ul>
		</div>
		<div class="trade__store">
			<h4>Магазин</h4>
			<ul class="trade__items">
				<li
					v-for="(item, index) in storeItems"
					:key="index"
					class="trade__items__item"
				>
					{{ item.name }} - {{ item.price }} золота
					<button @click="buyItem(item)">Купить</button>
				</li>
			</ul>
		</div>
		<div class="trade__balance">
			<p>Ваш баланс: {{ balance }} золота</p>
		</div>
		<button class="close-btn" @click="closeTrade">Закрыть</button>
	</div>
</template>

<script>
export default {
	props: {
		balance: Number,
		inventoryItems: Array,
	},
	data() {
		return {
			storeItems: [
				{ name: "Удочка улучшенная", price: 50 },
				{ name: "Наживка", price: 10 },
			],
		};
	},
	methods: {
		sellFish(index) {
			const fishValue = 20;
			const newBalance = this.balance + fishValue;
			this.$emit("update-balance", newBalance);
			this.$emit("del-item", index);
		},
		buyItem(item) {
			if (this.balance >= item.price) {
				const newBalance = this.balance - item.price;
				this.$emit("update-balance", newBalance);
				this.$emit("update-inventory", item);
				alert(`Вы купили: ${item.name}`);
			} else {
				alert("Недостаточно средств для покупки");
			}
		},
		closeTrade() {
			this.$emit("close");
		},
	},
};
</script>

<style scoped lang="less">
.trade {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: rgba(244, 244, 244, 0.28);
	padding: 20px;
	border-radius: 12px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	color: #333;
	width: 800px;
	margin: auto;
	margin-top: 30px;

	&__store {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
		width: 100%;
	}

	&__inventory {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #ffffff;
		padding: 15px;
		border-radius: 8px;
		margin-bottom: 15px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
		width: 100%;
	}

	&__close-btn {
		background: #d9534f;
		margin-top: 15px;

		&:hover {
			background: #c9302c;
		}
	}

	&__items {
		width: 100%;
		padding: 0;
		list-style: none;

		&__item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 10px;
			border-bottom: 1px solid #ddd;
		}
	}

	&__buyBtn {
		background: #2d89ef;
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 5px;
		cursor: pointer;
		transition: background 0.3s;
		font-weight: bold;

		&:hover {
			background: #1b5fc9;
		}
	}
}
</style>
