<template>
	<g>
		<polygon v-if="area.length" class='area' :points="to_points_aaa( area )" @click="clk"></polygon>
		<!--<circle class='knot_small' r="2" v-for="ar in area" :cx="ar.x" :cy="ar.y"></circle>-->
	</g>
</template>

<script>
	export default {
		props: [ `area`, `towers` ],
		data: function (){
			return {
				
			}
		},
		methods: {
			to_points_aaa: function ( arr ) {
			  return arr.map((point) => { return `${point.x},${point.y}` } ).join(' ')
			},

			clk: function(e){
				var x = e.offsetX
				var y = e.offsetY

				//e.preventDefault()
				e.stopPropagation()

				//this.areas[1][0].push( { x: x, y: y } )
				//this.temp.push( { x: x, y: y } )

				let twr = new cl.tower( x, y )
				this.towers.push( twr )

				//console.log( "Polygon click: " + x + ", " + y )
			},
		},
	}

	import * as cl from "../classes.js"

</script>