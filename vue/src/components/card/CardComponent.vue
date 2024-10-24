<template>
	<div class="card__wrapper" :style="applyTransform" @mouseover="isHovered = true" @mouseleave="isHovered = false"
		@click="cardClick">
		<div class="card__div hCenter">
			<div class="card-cost hCenter vCenters">
				<p> {{ this.card.cost }} </p>
			</div>
			<div class="card-image__div hCenter">
				<img class="card-image__image" src="../../assets/cards/background.png" />
			</div>
			<div class="card-description__div">
				<div class="card-description__title">
					<p> {{ this.card.title }} </p>
				</div>
				<div class="card-description__description">
					<p> {{ this.cardDescription }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import cardEffect from '../common/cardEffect';

export default {
	props: {
		card: Object,
		scale: Number,
		rotation: Number,
		yShift: Number,
	},
	data() {
		return {
			cardDescription: "",
			isHovered: false,
		}
	},
	mounted() {
		this.setDescription();
	},
	computed: {
		applyTransform() {
			if (this.isHovered)
				return {
					transform: `scale(${this.scale + 0.05}) rotate(0deg) translateY(-25px)`,
					transition: `transform 0.1s ease-out`,
					zIndex: 100
				}
			else
				return {
					transform: ` scale(${this.scale}) rotate(${this.rotation}deg) translateY(${this.yShift}px)`,
					transition: `transform 0.05s ease-in`,
				};
		},
	},
	methods: {
		cardClick() {
			this.$emit('cardPressed', this.card);
			console.log('card emitted cardClick!', this.card)
		},

		setDescription() {
			this.cardDescription = "";

			this.card.effects.forEach(effect => {
				this.cardDescription += this.returnDescriptionString(effect) + '\n';
			});
		},

		returnDescriptionString(effect) {
			switch (effect.type) {
				case cardEffect.Attack: {
					if (effect.values.length == 1)
						return `Attack for ${effect.values[0]}`
					else
						return `Attack for ${effect.values[0]} ${effect.values[1]} times`
				}
				case cardEffect.Defend: {
					return `Defend for ${effect.values[0]}`
				}
				case cardEffect.Draw: {
					return `Draw ${effect.values[0]} cards`
				}
				case cardEffect.Shuffle: {
					return `Shuffle the deck`
				}
				case cardEffect.DiscardRandom: {
					if (effect.values[0] == 1)
						return `Discard random card`
					else
						return `Discard ${effect.values[0]} random cards`
				}
				case cardEffect.DiscardHand: {
					return `Discard your hand`
				}
				case cardEffect.ExhaustSelf: {
					return `Exhaust this card`
				}
			}
			return "Invalid Effect";
		},
	}
};
</script>

<style scoped lang="less">
.card {
	@cardHeight: 320px;
	@cardWidth: 220px;
	@imageHeight: 120px;
	@imageWidth: 200px;

	&__wrapper {
		height: @cardHeight;
		width: @cardWidth;
		transform-origin: center;
		cursor: pointer;
	}

	&__div {
		display: flex;
		flex-direction: column;
		overflow: hidden;

		height: @cardHeight;
		width: @cardWidth;

		background-color: rgb(121, 126, 133);
		border: 2px solid #000;
		border-radius: 15px;
	}

	&-cost {
		height: 25px;
		width: 25px;

		position: absolute;
		margin-top: -310px;
		margin-left: -5px;
		z-index: 10;

		background-color: #e2d87b;
		border: 2px solid #a09748;
		border-radius: 6px;

		font: 20px bold;
		text-wrap: nowrap;
	}

	&-image {
		&__div {
			height: @imageHeight;
			width: @imageWidth;

			margin-left: calc((@cardWidth - @imageWidth) / 2);
			margin-top: 10px;
			border-radius: 15px;
		}

		&__image {
			height: 100%;
			width: 100%;
			border-radius: 15px;
		}
	}

	&-description {
		&__div {
			display: flex;
			flex-direction: column;
			flex-basis: 50%;

			width: @imageWidth;
			margin-left: calc((@cardWidth - @imageWidth) / 2);
			margin-top: 10px;
		}

		&__title {
			height: 22px;
			background-color: rgb(95, 95, 95);
			border-radius: 15px;

			font-size: 18px;
			color: rgb(193, 194, 196);
		}

		&__description {
			flex-basis: 100%;

			margin-top: 5px;
			background-color: rgb(59, 59, 59);
			border: 2px solid rgb(26, 25, 25);
			border-radius: 15px;
			padding: 5px;


			font-size: 14px;
			color: rgb(234, 236, 236);
			white-space: pre-line;
			overflow-wrap: break-word;
		}
	}
}
</style>