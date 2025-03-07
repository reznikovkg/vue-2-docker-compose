<template>
	<div class="inventory">
		<h3 class="inventory__title">Инвентарь</h3>
		<ul class="inventory__list">
			<li
				v-for="(item, index) in inventoryItems"
				:key="index"
				class="inventory__item"
			>
				{{ item }}
			</li>
		</ul>
		<button @click="closeInventory" class="inventory__close-button">
			Закрыть
		</button>
	</div>
</template>

<script>
export default {
	props: {
		inventoryItems: Array,
	},
	methods: {
		closeInventory() {
			this.$emit("close");
		},
	},
};
</script>

<style lang="less" scoped>
.inventory {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgba(240, 240, 240, 0.61);
	border-radius: 8px;
	padding: 20px;
	width: 600px;
	margin-top: 40px;

	&__title {
		font-size: 24px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	&__list {
		list-style: none;
		padding: 0;
		margin: 0 0 20px;
		width: 100%;
	}

	&__item {
		padding: 8px 15px;
		margin: 5px 0;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		font-size: 16px;
		color: #555;
		transition: background-color 0.3s;

		&:hover {
			background-color: #f1f1f1;
		}
	}

	&.inventory__close-button {
		padding: 10px 15px;
		background-color: #ff6347;
		color: white;
		font-size: 16px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		transition: background-color 0.3s;

		&:hover {
			background-color: #e5533d;
		}
	}
}
</style>
