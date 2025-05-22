<script>
	export default {

		props: ['f', 'debug'],
		methods: {
			selectFoe: function( f, $event ){
				event.stopPropagation()
				f.select()
			},

		},
	}
</script>

<template>
	<g @click="selectFoe(f)">
		<circle class="foe-red" :cx="f.x" :cy="f.y" :r="9"></circle>
		<circle v-if="f.selected" class="foe-selected" :cx="f.x" :cy="f.y" :r="12"></circle>
		<text :x="f.x+15" :y="f.y+3" v-if="debug">{{ f.life }}</text>
	</g>
</template>

<style>

	circle{
		stroke: #AAA;
	}

	circle.foe-red{
		stroke: red;
		fill: rgba(255, 0, 0, 0.3);
	}

	circle.foe-selected{
		stroke: red;
		stroke-width:  2;
		fill:  transparent;
	}

	circle.enemy-green{
		stroke: green;
		fill: transparent;
		opacity: 0.5;
	}

</style>