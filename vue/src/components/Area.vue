<script>
	export default {
		props: [ `area`, `towers` ],

		methods: {
			to_points_aaa: function ( arr ) {
			  return arr.map((point) => { return `${point.x},${point.y}` } ).join(' ')
			},
		
			clk: function(e){
				var x = e.offsetX
				var y = e.offsetY
				
				e.stopPropagation()
				let twr = new cl.tower( x, y )
				this.towers.push( twr )

			},
		},
	}

	import * as cl from "../classes.js"

</script>

<template>


	<g>
		<polygon v-if="area.length" class='area' :points="to_points_aaa( area )" @click="clk"></polygon>
	</g>

</template>

<style></style>