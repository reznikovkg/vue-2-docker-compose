
class foe {
	constructor( x, y ) {
		this.x = x 				
		this.y = y 				
		this.dead = false 		
		this.life = 700			
		this.selected = false	
		this.moveAtom = 10 		
	}

	moveUp()	{ this.y -= this.moveAtom }
	moveDown()	{ this.y += this.moveAtom }
	moveLeft()	{ this.x -= this.moveAtom }
	moveRight()	{ this.x += this.moveAtom }

	update( dt ) {

		if( window.currentFoe == this ){
			this.selected = true
		} else {
			this.selected = false
		}

		if( this.life <= 0 ){ 		
			this.dead		= true 	
			this.selected	= false	
		}

		return this.selected 	
	}

	select (){
		window.currentFoe = this	
	}

	hit( damage, dt ){
		let dam = 0
		if( !this.dead ){ 
			dam = Math.floor(damage / 100 * dt)	
			this.life -= dam 						
			
			if( this.life <= 0 ){	
				this.life = 0 		
				this.dead = true	
			}
		}

		return dam 
	}

}

class tower {
	constructor( x, y ) {
		this.x = x 				
		this.y = y				
		this.cls = "normal"		
		this.lasers = [] 		
		
		this.damage = 100 		
		this.level 	= 1 		
		this.rad = 40 			
		this.total_damage = 0;  
		this.levels = [ 		
			{cap: 0,		damage: 11,	rad: 40,	lcnt: 1},
			{cap: 300,		damage: 14,	rad: 50,	lcnt: 2},
			{cap: 1200,		damage: 17,	rad: 60,	lcnt: 3},
			{cap: 3000,		damage: 20,	rad: 70,	lcnt: 4},
			{cap: 7000,		damage: 23,	rad: 75,	lcnt: 5},
			{cap: 10000,	damage: 26,	rad: 80,	lcnt: 6},
			{cap: 120000,	damage: 29,	rad: 85,	lcnt: 7},
		],
		this.lasersCount = 1 	
		this.maxLasersCount = 1 
	}

	update( foes, dt ) {
		var lasersCount = 1
		this.cls = "normal"
		this.lasers = []

		if(foes.length){  
			for(var n = 0; n < foes.length; n++){ 
				var dist = Math.sqrt(Math.pow(Math.abs(this.x - foes[n].x), 2) + Math.pow(Math.abs(this.y - foes[n].y), 2)) 
				if(dist < this.rad && (lasersCount <= this.maxLasersCount) ){  
					this.cls = "alarm" 						
					this.shoot(foes[n], dt)					
					var las = new laser( this, foes[n] ) 	
					this.lasers.push( las ) 				
					lasersCount++							
				}
			}
		}

		return this.lasers 		

	}

	shoot( en, dt ){
		let dam = en.hit( this.damage, dt )
		this.total_damage += dam

		if( this.levels[ this.level ] !== undefined ){
			if( this.total_damage >= this.levels[ this.level ].cap ){	
				this.damage = this.levels[ this.level ].damage        	
				this.rad = this.levels[ this.level ].rad 				
				this.maxLasersCount = this.levels[ this.level ].lcnt 	
				this.level++											
			}
		}
	}
}

class laser {
	constructor( start, end ) {
		this.start 	= start 	
		this.end 	= end 		
	}
}

export { tower, laser, foe }