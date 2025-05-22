<script>

	import * as cl 	from "../classes.js"
	import Tower	from "../components/Tower.vue"
	import Foe		from "../components/Foe.vue"
	import Laser	from "../components/Laser.vue"
	import Area		from "../components/Area.vue"

	export default {
		props: ['level'],		
		data: function (){
			return {
				interval:   100, 	
				userTime: 	0,		
				dt: 		0, 		
				killed: 	0,		
				debug: 		true,	
				running: 	true,	

				foes: 		[],	
				towers: 	[], 
				lasers:   	[], 

								
				areas: [
					[],
					[
						[ { "x": 556, "y": 67 }, { "x": 185, "y": 317 }, { "x": 49, "y": 316 }, { "x": 49, "y": 350 }, { "x": 551, "y": 351 }, { "x": 551, "y": 308 }, { "x": 412, "y": 224 }, { "x": 560, "y": 104 },
						],
						[ { "x": 57, "y": 60 }, { "x": 57, "y": 288 }, { "x": 174, "y": 286 }, { "x": 548, "y": 34 }, { "x": 305, "y": 37 }, { "x": 291, "y": 160 }, { "x": 168, "y": 233 },
							{ "x": 90, "y": 228 }, { "x": 101, "y": 60 },
						],
						[ { "x": 128, "y": 59 }, { "x": 106, "y": 206 }, { "x": 162, "y": 206 }, { "x": 275, "y": 142 }, { "x": 282, "y": 43 }, ],
						[ { "x": 559, "y": 125 }, { "x": 438, "y": 224 }, { "x": 550, "y": 287 }, ],
					],
					[
						[ { "x": 353, "y": 153 }, { "x": 549, "y": 29 }, { "x": 571, "y": 51 }, { "x": 362, "y": 360 }, { "x": 174, "y": 358 }, { "x": 170, "y": 380 }, { "x": 381, "y": 384 },
							{ "x": 594, "y": 50 }, { "x": 543, "y": 2 }, { "x": 333, "y": 134 }, ],
						[ { "x": 388, "y": 172 }, { "x": 455, "y": 127 }, { "x": 475, "y": 140 }, { "x": 345, "y": 325 }, { "x": 163, "y": 326 }, ],
						[ { "x": 363, "y": 176 }, { "x": 320, "y": 129 }, { "x": 508, "y": 13 }, { "x": 133, "y": 13 }, { "x": 132, "y": 326 }, ],
					],
					[
						[ { "x": 562, "y": 57 }, { "x": 392, "y": 164 }, { "x": 393, "y": 325 }, { "x": 418, "y": 338 }, { "x": 418, "y": 176 }, { "x": 584, "y": 71 }, ],
						[ { "x": 552, "y": 30 }, { "x": 360, "y": 151 }, { "x": 365, "y": 351 }, { "x": 305, "y": 355 }, { "x": 306, "y": 142 }, { "x": 449, "y": 33 }, ],
						[ { "x": 580, "y": 89 }, { "x": 433, "y": 183 }, { "x": 433, "y": 333 }, { "x": 580, "y": 331 }, ],
					],
				],


			}
		},

		

		components: {
			Tower,
			Laser,
			Foe,
			Area
		},

		

		mounted: function(){

			this.timer = setInterval( this.tick, this.interval ) 	
																	

			window.addEventListener("keydown", function(e) { 	
				let foe = window.currentFoe						
				if (e.keyCode === 37) {	foe.moveLeft() 	}		
				if (e.keyCode === 38) { foe.moveUp() 	}		
				if (e.keyCode === 39) {	foe.moveRight() }		
				if (e.keyCode === 40) {	foe.moveDown() 	}		
			});													

		},


		

		watch: {

			
			level(newLevel, oldLevel) {
				
				this.clear_level()
			},

		},

		

		methods: {

			
			flipDebug: function(){
				this.debug = !this.debug
			},


			
			flipGame: function(){
				this.running = !this.running				
			},

			
			clk: function(e){
				e.stopPropagation() 
				var x = e.offsetX	
				var y = e.offsetY	
				this.addFoe( x, y )	
			},

			
			tick: function(){

				var ttt = this.userTime							
				this.userTime = Math.floor( performance.now() )	
				this.dt = this.userTime - ttt					

				if( this.foes.length ){		

					let selected = false	
											

					for(var n = 0; n < this.foes.length; n++){
						selected = selected | this.foes[n].update( this.dt )	
																	
						if(this.foes[n].dead){						
							this.foes.splice( n, 1 )				
							this.killed++							
						}
					}

					if( !selected ){				
						if( this.foes.length ){		
							this.foes[0].select()	
						}
					}

				}

				
				if(this.running){
					if( this.towers.length ){ 										
						this.lasers = []											
						for(var n = 0; n < this.towers.length; n++){				
							var lsrs = this.towers[n].update( this.foes, this.dt )	
																					
							this.lasers = this.lasers.concat( lsrs )				
						}
					}
				}

			},


			
			addFoe: function ( x, y ){
				let fo = new cl.foe( x, y)	
				this.foes.push( fo )		
				window.currentFoe = fo 		
			},

			
			clear_level: function () {
				console.log( "Очистка уровня от башен и врагов" )
				this.towers.length = 0 	
				this.foes.length = 0 	
				this.killed = 0 		
			},

		},
	}



</script>

<template>
	<div id="game" >
		<div class="gr" style='text-align: left; min-height1: 500px;'>
			<div style='text-align: center; background-color: #BBB;'>Убито: <b>{{ killed }}</b></div>

			<button v-on:click="flipGame" style='margin-right: 5px;'>{{ running?"СТОП":"СТАРТ" }}</button>
			<button v-on:click="flipDebug" style='margin-right: 5px;'>Отладка</button>

			{{ dt }}

			<div>
				<svg style="width: 600px; height: 400px; border-radius: 4px; border: 1px solid #AAA; margin-top: 5px;" @click="clk">
					<text x=5 y=10 class='lbl' >Level: #{{ level }}</text> 
					<Laser v-for="laser in lasers" :start="laser.start" :end="laser.end" />
					<Area v-for="ar in areas[level]" :area="ar" :towers="towers" />
					<Foe v-for="f in foes" :f="f" :debug="debug" />
					<Tower v-for="twr in towers" :twr="twr" :towers="towers" :debug="debug" />

				</svg>
			</div>

		</div>
	</div>
</template>