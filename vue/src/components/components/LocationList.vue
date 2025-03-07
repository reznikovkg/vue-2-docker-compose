<template>
	<div class="location-list">
		<h2 class="location-list__title">Выберите водоем</h2>
		<ul class="location-list__items">
			<li
				v-for="location in locations"
				:key="location"
				class="location-list__item"
				@click="selectLocation(location)"
			>
				{{ location }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		locations: Array,
	},
	methods: {
		selectLocation(location) {
			this.$emit("select-location", location);
		},
	},
};
</script>

<style scoped lang="less">
.location-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 20px;
	border-radius: 8px;
	background-color: #f9f9f9;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	max-width: 300px;
	margin-top: 40px;

	&__title {
		font-size: 20px;
		font-weight: bold;
		color: #333;
		margin-bottom: 15px;
	}

	&__items {
		list-style: none;
		padding: 0;
		width: 100%;
		display: flex;
		gap: 20px;
	}
	&__item {
		cursor: pointer;
		padding: 10px 15px;
		margin-bottom: 8px;
		border-radius: 5px;
		background-color: #fff;
		color: #333;
		font-size: 16px;
		transition: background-color 0.3s ease, color 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: space-between;

		&:hover {
			background-color: #007bff;
			color: #fff;
		}
	}
}
</style>
