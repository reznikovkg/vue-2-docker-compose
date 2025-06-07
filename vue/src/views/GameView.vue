<template>
	<div id="game" >
		<div class="gr" style='text-align: left; min-height1: 500px;'>
			<div style='text-align: center; background-color: #BBB;'>Убито: <b>{{ killed }}</b> - Уцелело: <b>{{ finished }}</b></div>

			<button v-on:click="flipGame" style='margin-right: 5px;'>{{ running?"СТОП":"СТАРТ" }}</button>
			<button v-on:click="flipDebug" style='margin-right: 5px;'>Отладка</button>

			<div>
				<svg style="width: 600px; height: 400px; border-radius: 4px; border: 1px solid #AAA; margin-top: 5px;" @click="clk">

					<text x=5 y=10 class='lbl' >Level: #{{ level }}</text> 

					<g v-if="debug">
						<polyline :points="to_points" fill="none" stroke="gray" stroke-dasharray="5,3"/>
						<circle
						  class='knot'
						  r="4"
						  v-for="point in points"
						  :cx="point.x"
						  :cy="point.y"
						></circle>
					</g>

					<Area v-for="ar in areas[level]" :area="ar" :towers="towers" />
					<Foe v-for="f in foes" :f="f" :debug="debug"/>
					<Tower v-for="twr in towers" :twr="twr" :towers="towers" :debug="debug" />
					<Laser v-for="laser in lasers" :start="laser.start" :end="laser.end" />

					<polygon :points="to_points_aaa" fill="blue" opacity="20%" stroke="gray" stroke-dasharray="5,3"/> 

					<image :x="startPoint.x-21" :y="startPoint.y-36" width="42" height="42" preserveAspectRatio="none" xlink:href="/src/assets/tower-red.png" />
					<image :x="endPoint.x-21" :y="endPoint.y-36" width="42" height="42" preserveAspectRatio="none" xlink:href="/src/assets/tower-blue.png" />

				</svg>
			</div>

		</div>
	</div>
</template>

<script>

	/*

		Импортируем все компоненты, которые будем использовать

	*/

	import * as cl 	from "../classes.js"
	import Tower	from "../components/Tower.vue"
	import Foe		from "../components/Foe.vue"
	import Laser	from "../components/Laser.vue"
	import Area		from "../components/Area.vue"

	import levels 	from "../levels.js"

	export default {
		props: ['level'],		// На входе получаем переменную текущего уровня игры
		data: function (){
			return {
				interval:   100, 	// Интервал срабатывания счётчика обсчёта (мс) / тик
				userTime: 	0,		// Содержимое счётчика
				dt: 		0, 		// DT (разница во времени между тиками)
				killed: 	0,		// Количество убитых врагов
				finished:   0,		
				debug: 		true,	// Флаг отладки, влияет на отображение
				running: 	true,	// Флаг 

				foes: 		[],	// Список врагов
				towers: 	[], // список башен
				lasers:   	[], // список лазеров
				points: 	[],
				poly:  		[],
				
				startPoint: {x:0, y:0},
				endPoint: {x:0, y:0},


								// areas — массив с координатами зелёных областей, по клику на которые создаются башни.
				areas: [
					[],
					[
						[{x:64,y:49},{x:59,y:287},{x:188,y:288},{x:210,y:337},{x:342,y:342},{x:369,y:316},{x:367,y:150},{x:543,y:37}],
						[{x:35,y:48},{x:37,y:309},{x:168,y:313},{x:191,y:367},{x:356,y:366},{x:399,y:327},{x:397,y:167},{x:570,y:56},{x:567,y:382},{x:13,y:386},{x:11,y:46}],
					],
					[
						[{x:37,y:341},{x:118,y:164},{x:284,y:214},{x:278,y:296},{x:391,y:335},{x:497,y:68},{x:38,y:79}],
						[{x:56,y:367},{x:133,y:208},{x:252,y:238},{x:246,y:317},{x:403,y:366},{x:524,y:90},{x:532,y:380},{x:56,y:377}],
					],
					[
						[{x:258,y:24},{x:257,y:80},{x:88,y:175},{x:92,y:197},{x:394,y:229},{x:390,y:242},{x:260,y:270},{x:259,y:365},{x:25,y:364},{x:27,y:29}],
						[{x:293,y:24},{x:291,y:95},{x:147,y:174},{x:484,y:218},{x:482,y:247},{x:290,y:292},{x:294,y:361},{x:529,y:361},{x:516,y:22}],
					],
				],


			}
		},

		// список используемых при оформлении компонентов

		components: {
			Tower,
			Laser,
			Foe,
			Area
		},

		mounted: function(){
/*
			this.addPolyPoint( 10, 10 )
			this.addPolyPoint( 20, 20 )
			this.addPolyPoint( 10, 30 )
*/
			this.points = levels[ this.level ].points

			this.startPoint = this.points[0]
			this.endPoint = this.points[ this.points.length - 1 ]

			console.log( this.startPoint.x + ", " + this.startPoint.y )
			console.log( this.endPoint.x + ", " + this.endPoint.y )

			this.timer = setInterval( this.tick, this.interval ) 	// запуск корневого таймера

			window.addEventListener("keydown", function(e) { 	// 
				let foe = window.currentFoe						//
				if (e.keyCode === 37) {	foe.moveLeft() 	}		//
				if (e.keyCode === 38) { foe.moveUp() 	}		//
				if (e.keyCode === 39) {	foe.moveRight() }		//
				if (e.keyCode === 40) {	foe.moveDown() 	}		//
			});													//	

		},

		computed:{
		  to_points: function () {
		    return this.points.map((point) => { return `${point.x},${point.y}` } ).join(' ')
		  },

		  to_points_aaa: function () {
		    return this.poly.map((point) => { return `${point.x},${point.y}` } ).join(' ')
		  },
		},

		watch: {

		  level(newLevel, oldLevel) {
			//console.log( "Смена уровня: " + oldLevel + " —> " + newLevel)

			this.points = levels[ this.level ].points

			this.startPoint = this.points[0]
			this.endPoint = this.points[ this.points.length - 1 ]

			console.log( this.level )

			this.clear_level()
		  },

		  towers(newTowers, oldTowers){
		  	//console.log( "Башен стало " + newTowers.length)
		  },

		},

		methods: {

			flipDebug: function(){
				this.debug = !this.debug
			},

			flipGame: function(){
				this.running = !this.running				
			},

			getKey: function ( $e ){
				console.log("Key pressed!!!" + e)
			},


			clk: function(e){
				e.stopPropagation()
				var x = e.offsetX
				var y = e.offsetY
				this.addFoe( x, y )
				//this.addPolyPoint( x, y )
				//this.addPoint( x, y )
			},


			tick: function(){
				var ttt = this.userTime
				this.userTime = Math.floor( performance.now() )
				this.dt = this.userTime - ttt


				if(this.running){

					//-------------------------

					if( this.foes.length ){

						let selected = false

						for(var n = 0; n < this.foes.length; n++){
							selected = selected | this.foes[n].update()

							this.foes[n].update_position()

							if(this.foes[n].dead){
								this.foes.splice( n, 1 )
								this.killed++
							} else if (this.foes[n].finished) {
								this.foes.splice( n, 1 )
								this.finished++
							}
						}

						if( !selected ){
							if(this.foes[0]){
								this.foes[0].select()
							}
						}
					}

					//-------------------------

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
				let fo = new cl.foe( x, y, this.points )
				fo.compute()
				this.foes.push( fo )
				window.currentFoe = fo
			},

			addPolyPoint( x, y ){
				this.poly.push( { x: x, y: y } )
				console.log( this.printPoly( ) );
			},

			addPoint( x, y ){
				this.points.push( { x: x, y: y } )
				console.log( this.printPoints( ) );
			},

			printPoly( ){
				return this.poly.map((point) => { return `{x:${point.x},y:${point.y}}` } ).join(',')
			},

			printPoints( ){
				return this.points.map((point) => { return `{x:${point.x},y:${point.y}}` } ).join(',')
			},

			clear_level: function () {
				//console.log( "Очистка уровня от башен и врагов" )
				this.towers.length = 0
				this.foes.length = 0
				this.lasers.length = 0
				this.killed = 0
				this.finished = 0
			},

		},
	}



</script>