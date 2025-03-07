<template>
	<div class="fishing-spot" v-if="selectedLocation != null">
		<div class="fishing-area" @click="castRod" :style="getBackgroundImage()">
			<div
				v-for="(rod, index) in rodsInArea"
				:key="index"
				class="rod"
				:style="getRodStyle(rod)"
			>
				<div
					v-if="rod.fishCaught"
					class="fish"
					:style="getFishStyle(rod.fishCaught)"
					@click="selectFish(rod.fishCaught)"
				>
					<div
						class="fight-info__progress-bar"
						v-if="rod.fishCaught === selectedFish"
					>
						<div
							class="fight-info__progress"
							:style="{ width: getProgressBarWidthForFish(rod.fishCaught) }"
						></div>
					</div>
				</div>
			</div>
		</div>

		<div v-if="selectedFish" class="fight-info">
			<div
				class="fight-info__progress-bar"
				v-if="getFightInfo().displayProgress"
			>
				<div
					class="fight-info__progress"
					:style="{ width: getProgressBarWidth(selectedFish) }"
				></div>
			</div>
			<p>Сопротивление рыбы: {{ selectedFish.resistance.toFixed(2) }}%</p>
			<div class="fight-info__actions">
				<button @click="fightWithFish" class="fight-info__action">
					Тянуть!
				</button>
			</div>
		</div>

		<div class="end-fishing-btn">
			<button @click="endFishing" class="end-fishing-btn__action">
				Окончить рыбалку
			</button>
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
	props: {
		selectedLocation: String,
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
			if (this.selectedFish) {
				this.selectedFish.resistance += Math.random() * 3;
				if (this.selectedFish.resistance > 100) {
					this.selectedFish.resistance = 100;
				}

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
			this.$emit("fish-caught", fish);
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
			const length = fish.x;

			return {
				position: "absolute",
				top: `${rod.y}%`,
				left: `${rod.x}%`,
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

		getProgressBarWidthForFish(fish) {
			return `${Math.max(fish.resistance, 0)}%`;
		},

		getProgressBarWidth(fish) {
			return `${Math.max(fish.resistance, 0)}%`;
		},

		endFishing() {
			this.rodsInArea = [];
			this.selectedFish = null;
			this.nextRodId = 1;
		},

		getBackgroundImage() {
			let backgroundImageUrl = "";

			switch (this.selectedLocation) {
				case "Озеро":
					backgroundImageUrl =
						"url('https://nashural.ru/assets/uploads/Ozero-Bezdonnoe3.jpg')";
					break;
				case "Река":
					backgroundImageUrl =
						"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwuqwEJTr4WffmkJIdvuRCJETKLiphAcnDhg&s')";
					break;
				case "Пруд":
					backgroundImageUrl =
						"url('https://upload.wikimedia.org/wikipedia/commons/6/65/%D0%92%D0%B8%D0%B4_%D0%BD%D0%B0_%D0%BF%D1%80%D1%83%D0%B4_%D0%B2_%D1%8E%D0%B3%D0%BE-%D0%B7%D0%B0%D0%BF%D0%B0%D0%B4%D0%BD%D0%BE%D0%BC_%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B8.JPG')";
					break;
			}

			return {
				backgroundImage: backgroundImageUrl,
				backgroundSize: "cover",
				backgroundPosition: "center",
			};
		},
	},
};
</script>

<style scoped lang="less">
.fishing-spot {
	padding: 20px;

	.fishing-area {
		width: 500px;
		height: 300px;
		border: 2px solid #1e6c5f;
		position: relative;
		background-color: #d8f5e0;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.rod {
		position: absolute;
		background-color: #8b5e3c;
		padding: 10px;
		border-radius: 5px;
		cursor: pointer;
	}

	.fish {
		position: absolute;
		background: url("https://img2.freepng.ru/20171201/fc5/av2qgasey.webp");
		background-size: contain;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		transition: all 0.1s;
		cursor: pointer;
	}

	.line {
		position: absolute;
		background-color: #1e6c5f;
		height: 2px;
	}

	.fight-info {
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

			button {
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

	.end-fishing-btn {
		margin-top: 20px;
		text-align: center;

		.end-fishing-btn__action {
			background-color: #e53935;
			color: white;
			border: none;
			padding: 10px 20px;
			font-size: 16px;
			border-radius: 5px;
			cursor: pointer;
			transition: background-color 0.3s;

			&:hover {
				background-color: #d32f2f;
			}
		}
	}
}
</style>
