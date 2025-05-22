<script>
	export default {

		props: ['twr', `towers`, `debug`],
		methods: {
			handler: function(e) {
			    e.preventDefault();

			    const i = this.towers.indexOf(this.twr)
			    if (i > -1) { 
			      this.towers.splice(i, 1) 
			    }
			 },

			 clk: function( e ){
			 	e.stopPropagation()
			 	console.log(" LMB ")
			 }
		}
	}
</script>

<template>
	<g @contextmenu="handler($event)" @click="clk">
		<circle :class="'tower '+twr.cls" :cx="twr.x" :cy="twr.y" :r="9"></circle>		
		<text :x="twr.x-3" :y="twr.y+4">{{twr.level}}</text>
		<g v-if="debug">
			<circle :class="'tower-area '+twr.cls" :cx="twr.x" :cy="twr.y" :r="twr.rad"></circle>
			<text :x="twr.x+12" :y="twr.y-2">{{twr.total_damage}}</text>
			<text :x="twr.x+12" :y="twr.y+7" fill="red">{{twr.damage}}</text>
		</g>
	</g>
</template>

<style>

	circle.tower{
		stroke: green;
		fill: rgba(100, 150, 100, 1.0);
	}

	circle.tower.alarm{
		stroke: green;
		fill: rgba(180, 255, 180, 1.0);
		stroke-width:  2;
	}

	circle.tower-area{
		stroke: green;
		fill: transparent;
		opacity: 0.2;
	}

	circle.tower-area.alarm{
		stroke: green;
		fill: rgba(0, 255, 0, 0.2);
		opacity: 0.3;
	}

	text{
		font-size: 10px;
	}

</style>