<template>
	<div class="card__wrapper" :style="applyTransform"  @click="cardClick">
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
//import cardEffect from '../common/cardEffect';

export default {
	props: {
		card: Object,
		rotation: Number,
		yShift: Number,
	},
	data() {
		return {
			cardDescription: "",
		}
	},
	mounted() {
		this.setDescription();
	},
	computed: {
		applyTransform() {
			return {
				transform: `rotate(${this.rotation}deg) translateY(${this.yShift}px)`,
				transformOrigin: "center", 
				
			};
		},

	},
	methods: {
		cardClick() {
			this.$emit('cardPressed', this.card);
			console.log('card emitted cardClick!', this.card)
		},
		setDescription() {
			this.cardDescription = "THIS IS A VERY LONG CARD DESCRIPTION";

			this.card.effects.forEach(effect => {
				this.cardDescription += this.returnDescriptionString(effect);
			});
		},
		returnDescriptionString(effect) {
			if (effect.action == "Attack") { return "" }
			return "Test";
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
		transform-origin: bottom;
		
		&:hover {
			transform: scale(1.1) rotate(7.23deg) translateY(-20px);
			transition: transform 0.06s ease-out;
		}
	}

	&__div {
		//box-sizing: border-box;
		height: @cardHeight;
		width: @cardWidth;
		display: flex;
		flex-direction: column;
		background-color: rgb(121, 126, 133);
		border-radius: 15px;
		border: #000 2px solid;
		overflow: hidden;
	}
	
	&-cost {
		height: 25px;
		width: 25px;

		position: absolute;
		margin-top: -310px;
		margin-left: -5px;
		z-index: 5;
		clip-path: none;

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
			width: @imageWidth;
			margin-left: calc((@cardWidth - @imageWidth) / 2);
			display: flex;
			flex-direction: column;
			flex-basis: 50%;
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
			margin-top: 5px;
			flex-basis: 100%;
			background-color: rgb(59, 59, 59);
			border: 2px solid rgb(26, 25, 25);
			border-radius: 15px;
			padding: 5px;
			text-wrap: wrap;
			overflow-wrap: break-word;

			font-size: 14px;
			color: rgb(234, 236, 236);
		}
	}
}
</style>