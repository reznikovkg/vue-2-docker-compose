<template>
	<div class="app">
		<HeaderC
			:balance="balance"
			@go-to-inventory="goToInventory"
			@go-to-trade="goToTrade"
		/>

		<div v-if="showTrade">
			<TradeC
				:balance="balance"
				:inventoryItems="inventoryItems"
				@update-balance="updateBalance"
				@close="closeTrade"
				@del-item="delItem"
				@update-inventory="addFishToInventory"
			/>
		</div>

		<div v-if="showInventory">
			<InventoryC
				:balance="balance"
				@update-balance="updateBalance"
				@close="closeInventory"
				:inventoryItems="inventoryItems"
			/>
		</div>

		<LocationList :locations="locations" @select-location="selectLocation" />
		<FishingSpot
			:selectedLocation="selectedLocation"
			@fish-caught="addFishToInventory"
		/>
	</div>
</template>

<script>
import HeaderC from "./components/HeaderC.vue";
import LocationList from "./components/LocationList.vue";
import FishingSpot from "./components/FishingSpot.vue";
import TradeC from "./components/TradeC.vue";
import InventoryC from "./components/InventoryC.vue";

export default {
	components: {
		HeaderC,
		LocationList,
		FishingSpot,
		TradeC,
		InventoryC,
	},
	data() {
		return {
			locations: ["Озеро", "Река", "Пруд"],
			selectedLocation: null,
			balance: 100,
			showTrade: false,
			showInventory: false,
			inventoryItems: ["Удочка", "Наживка"],
		};
	},
	methods: {
		selectLocation(location) {
			this.selectedLocation = location;
		},
		goToInventory() {
			this.showInventory = true;
			this.showTrade = false;
		},
		goToTrade() {
			this.showTrade = true;
			this.showInventory = false;
		},
		closeTrade() {
			this.showTrade = false;
		},
		closeInventory() {
			this.showInventory = false;
		},
		updateBalance(newBalance) {
			this.balance = newBalance;
		},
		addFishToInventory(fish) {
			this.inventoryItems.push(fish.name);
		},
		delItem(index) {
			this.inventoryItems.splice(index, 1);
		},
	},
};
</script>

<style scoped lang="less">
.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 1000px;
	background: #2f80c83d;
	padding: 20px;
	border-radius: 20px;
	margin: 0 auto;
}
</style>
