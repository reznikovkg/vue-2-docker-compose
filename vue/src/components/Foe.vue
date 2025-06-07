<template>
	<g @click="selectFoe(f)">
		<image :x="f.x-12" :y="f.y-12" width="24" height="24" preserveAspectRatio="none" xlink:href="/src/assets/foe.png" />
<!--		
		<circle class="foe-red" :cx="f.x" :cy="f.y" :r="9"></circle>
		<circle v-if="f.selected" class="foe-selected" :cx="f.x" :cy="f.y" :r="12"></circle>
-->
		<text :x="f.x+10" :y="f.y+3" v-if="debug">{{ f.life }}</text>
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

<script>
	export default {
		props: ['f', `foes`, 'debug'],
		data: function (){
			return {
				rad: 35, // уже не нужно, удалить
			}
		},
		methods: {
			selectFoe: function( f, $event ){
				event.stopPropagation()
				window.currentFoe = f
			},
		},
	}
</script>