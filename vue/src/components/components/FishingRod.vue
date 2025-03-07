<template>
	<div class="fishing-spot">
		<div class="fishing-spot__area" @click="castRod">
			<div
				v-for="(rod, index) in rodsInArea"
				:key="index"
				class="fishing-spot__rod"
				:style="getRodStyle(rod)"
			>
				<div
					v-if="rod.fishCaught"
					class="fishing-spot__fish"
					:style="getFishStyle(rod.fishCaught)"
					@click="selectFish(rod.fishCaught)"
				>
					<p class="fishing-spot__fish-name">{{ rod.fishCaught.name }}</p>
					<p class="fishing-spot__fish-resistance">
						Сопротивление: {{ rod.fishCaught.resistance.toFixed(2) }}%
					</p>
				</div>
				<div
					v-if="rod.fishCaught"
					class="fishing-spot__line"
					:style="getLineStyle(rod.fishCaught, rod)"
				></div>
			</div>
		</div>

		<div v-if="selectedFish" class="fishing-spot__fight-info">
			<div
				class="fishing-spot__progress-bar"
				v-if="getFightInfo().displayProgress"
			>
				<div
					class="fishing-spot__progress"
					:style="{ width: getProgressBarWidth() }"
				></div>
			</div>
			<p>Сопротивление рыбы: {{ selectedFish.resistance.toFixed(2) }}%</p>
			<div class="fishing-spot__actions">
				<button @click="fightWithFish" class="fishing-spot__action">
					Тянуть!
				</button>
			</div>
		</div>

		<div class="fishing-spot__end-fishing-btn">
			<button @click="endFishing">Окончить рыбалку</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			rodsInArea: [],
			selectedFish: null,
			maxFishResistance: 100,
			nextRodId: 1,
		};
	},
	methods: {
		castRod(event) {
			if (this.rodsInArea.length >= 3) return;

			const rod = {
				id: this.nextRodId,
				x: event.offsetX,
				y: event.offsetY,
				fishCaught: null,
			};
			this.rodsInArea.push(rod);
			this.nextRodId++;
			setTimeout(() => this.checkForBite(rod), 2000);
		},

		checkForBite(rod) {
			if (rod.fishCaught) return;
			if (Math.random() > 0.7) {
				this.addFish(rod);
			} else {
				setTimeout(() => this.checkForBite(rod), 2000);
			}
		},

		addFish(rod) {
			const fish = {
				rodId: rod.id,
				x: rod.x + Math.random() * 50,
				y: rod.y + Math.random() * 50,
				resistance: 50,
				name: `Рыба ${Math.floor(Math.random() * 100) + 1}`,
				caught: false,
			};
			rod.fishCaught = fish;
			this.moveFish(fish);
		},

		moveFish(fish) {
			const moveInterval = setInterval(() => {
				if (fish.resistance <= 0 || fish.caught) {
					clearInterval(moveInterval);
					return;
				}
				fish.resistance += Math.random() * 3;
				fish.x += Math.random() * 6 - 3;
				fish.y += Math.random() * 6 - 3;
			}, 100);
		},

		selectFish(fish) {
			this.selectedFish = fish;
		},

		fightWithFish() {
			this.selectedFish.resistance += Math.random() * 3;
			if (this.selectedFish) {
				this.selectedFish.resistance -= Math.random() * 5 + 5;
				this.selectedFish.resistance += Math.random() * 3;

				if (this.selectedFish.resistance > 100) {
					alert("Рыба сорвалась!");
					this.selectedFish = null;
				}

				if (this.selectedFish.resistance <= 0) {
					this.catchFish(this.selectedFish);
				}
			}
		},

		catchFish(fish) {
			fish.caught = true;
			this.selectedFish = null;
			this.endFishing();
			alert("Вы поймали рыбу!");
		},

		getRodStyle(rod) {
			return { position: "absolute", top: `${rod.y}px`, left: `${rod.x}px` };
		},

		getFishStyle(fish) {
			return { position: "absolute", top: `${fish.y}px`, left: `${fish.x}px` };
		},

		getLineStyle(fish, rod) {
			const angle = Math.atan2(fish.y - rod.y, fish.x - rod.x);
			const length = Math.sqrt((fish.x - rod.x) ** 2 + (fish.y - rod.y) ** 2);

			return {
				position: "absolute",
				top: `${rod.y}px`,
				left: `${rod.x}px`,
				width: `${length}px`,
				height: "2px",
				backgroundColor: "#1e6c5f",
				transform: `rotate(${angle}rad)`,
				transformOrigin: "top left",
			};
		},

		getFightInfo() {
			return { displayProgress: this.selectedFish !== null };
		},

		getProgressBarWidth() {
			return `${Math.max(this.selectedFish.resistance, 0)}%`;
		},

		endFishing() {
			this.rodsInArea = [];
			this.selectedFish = null;
			this.nextRodId = 1;
		},
	},
};
</script>

<style scoped lang="less">
.fishing-spot {
	padding: 20px;

	&__area {
		width: 500px;
		height: 300px;
		border: 2px solid #1e6c5f;
		position: relative;
		background-color: #d8f5e0;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	&__rod {
		position: absolute;
		background-color: #8b5e3c;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
	}

	&__fish {
		position: absolute;
		background-color: #ff6347;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		transition: all 0.1s;
		cursor: pointer;
	}

	&__fish-name {
		font-size: 14px;
		color: white;
		text-align: center;
	}

	&__fish-resistance {
		font-size: 12px;
		color: white;
		text-align: center;
	}

	&__line {
		position: absolute;
		background-color: #1e6c5f;
		height: 2px;
	}

	&__fight-info {
		margin-top: 20px;
		text-align: center;

		&__progress-bar {
			width: 100%;
			background-color: #f1f1f1;
			height: 20px;
			border-radius: 10px;
			overflow: hidden;
		}

		&__progress {
			height: 100%;
			background-color: #4caf50;
			border-radius: 10px;
			transition: width 0.1s ease-in-out;
		}

		&__actions {
			margin-top: 15px;

			&__action {
				background-color: #4caf50;
				color: white;
				border: none;
				padding: 10px 20px;
				font-size: 16px;
				border-radius: 5px;
				cursor: pointer;
				transition: background-color 0.3s;

				&:hover {
					background-color: #45a049;
				}
			}
		}
	}

	&__end-fishing-btn {
		margin-top: 20px;
		text-align: center;

		button {
			background-color: #ff6347;
			color: white;
			border: none;
			padding: 10px 20px;
			font-size: 16px;
			border-radius: 5px;
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: #e5533d;
			}
		}
	}
}
</style>
