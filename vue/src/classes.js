//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

// Класс врагв
class foe {
	constructor( x, y, points ) {
		this.x = x 				// Положение
		this.y = y 				// Положение
		this.dx = 0
		this.dy = 0
		this.speed = 10
		this.points = Array.from( points )
		this.dead = false 		// Мёртв?
		this.life = 700			// Хитпойнты
		this.selected = false	// Если враг выбран, тогда им можно управлять с клавиатуры
		this.moveAtom = 10 		// На сколько перемещаться при нажатии клавиш
	}

//---------------------------------------------------------------------------------------------------

	// Функции движения

	moveUp()	{ this.y -= this.moveAtom }
	moveDown()	{ this.y += this.moveAtom }
	moveLeft()	{ this.x -= this.moveAtom }
	moveRight()	{ this.x += this.moveAtom }

//---------------------------------------------------------------------------------------------------
// Обновляем свойства врага

	update() {

		this.selected = window.currentFoe == this // Взводим selected если наш элемент — текущий враг

		if( this.life > 0 ){	// Если жизнь меньше нуля, тогда взводим флаг dead
		} else {
			this.dead = true
			console.log( "KILLED!" )
		}

		return this.selected 	// возвращаем да/нет этот элемент является текущим

	}

//---------------------------------------------------------------------------------------------------

	update_position(){
		//this.dist = Math.sqrt(Math.pow(Math.abs(this.x - this.points[0].x), 2) + Math.pow(Math.abs(this.y - this.points[0].y), 2))
		//console.log( this.dist )

		if( !this.finished ) {
			if( this.life > 0 ){
				this.dist = Math.sqrt(Math.pow(Math.abs(this.x - this.points[0].x), 2) + Math.pow(Math.abs(this.y - this.points[0].y), 2))
				if( this.dist >= this.speed ){
					this.x -= this.dx
					this.y -= this.dy
				} else {
					this.compute()
				}
			} else {
				this.dead = true
			}
		} else {
			console.log( "FINISHED! v2" )
		}

	}

//---------------------------------------------------------------------------------------------------

	compute(){

		this.x = this.points[0].x
		this.y = this.points[0].y
		this.points.shift()

		if( this.points.length ){
			this.dist = Math.sqrt(Math.pow(Math.abs(this.x - this.points[0].x), 2) + Math.pow(Math.abs(this.y - this.points[0].y), 2))
			let mul = this.speed / this.dist
			this.dx = mul * (this.x - this.points[0].x)
			this.dy = mul * (this.y - this.points[0].y)
		} else {
			console.log( "FINISHED!" )
			this.finished = true
			//this.dead = true
		}

	}

//---------------------------------------------------------------------------------------------------

// Делаем врага активным/текущим
	select (){
		this.selected = true		// Взводим флаг у самого врага
		window.currentFoe = this	// Обновляем глобальноую ссылку на текущего врага
	}

//---------------------------------------------------------------------------------------------------
//  Функция нанесения урона за единицу времени

	hit( damage, dt ){
		let dam = 0
		if( !this.dead ){ // если враг всё ещё жив
			dam = Math.floor(damage / 100 * dt)	// считаем наносимый урон: 
			this.life -= dam 						//
			// Если после нанесения урона жизнь стала отрицательной — взводим флаг dead
			if( this.life <= 0 ){	// если жизнь кончилась
				this.life = 0 		// не обязательно, но пусть будет
				this.dead = true	// взводим флаг «мёртв»
			}
		}

		return dam // 		возвращаем нанесённый урон
	}

//---------------------------------------------------------------------------------------------------

}


//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------

class tower {

	constructor( x, y ) {
		this.x = x 				// Координаты
		this.y = y				// Координаты
		this.cls = "normal"		// Класс
		this.lasers = [] 		// Массив лазеров
		//this.damage = 1.43
		this.damage = 10 		// Наносимый урон
		this.level 	= 1 		// Уровень башни по-умолчанию
		this.rad = 40 			// Радиус баши по-умолчанию
		this.total_damage = 0;  // 
		this.levels = [ 		// Массив с данными уровня башни
			{cap: 0,		damage: 10,	rad: 40,	lcnt: 1},
			{cap: 333,		damage: 12,	rad: 50,	lcnt: 2},
			{cap: 1000,		damage: 14,	rad: 60,	lcnt: 3},
			{cap: 3000,		damage: 16,	rad: 70,	lcnt: 4},
			//{cap: 7000,		damage: 23,	rad: 70,	lcnt: 5},
		],
		this.lasersCount = 1 	// Количество лазеров (текущее)
		this.maxLasersCount = 1 // Количество лазеров (максимальное)

	}

//---------------------------------------------------------------------------------------------------

	update( foes, dt ) {

		var lasersCount = 1
		this.cls = "normal"
		this.lasers = []

		if(foes.length){  // Если есть враги
			for(var n = 0; n < foes.length; n++){ // Для каждого из врагов считаем
				var dist = Math.sqrt(Math.pow(Math.abs(this.x - foes[n].x), 2) + Math.pow(Math.abs(this.y - foes[n].y), 2)) // расстояние
				if(dist < this.rad && (lasersCount <= this.maxLasersCount) ){  // Если расстояние до врага попадает в диапазон срабатывания и количество лазеров позволяет
					this.cls = "alarm" 						// Меняем цвет самой башни
					this.shoot(foes[n], dt)					// Шмаляем по текущему врагу
					var las = new laser( this, foes[n] ) 	// Создаём объект Лазер, который бьёт из текущей башни в текущего врага
					this.lasers.push( las ) 				// Добавляем лазер в глобальный список лазеров для отображения
					lasersCount++							// Увеличиваем количество лазеров текущей башни на +1
				}
			}
		}

		return this.lasers 		// возвращаем список лазеров текущеё башни

	}

//---------------------------------------------------------------------------------------------------
// Функция нанесения урона персонажу EN за отрезок времени DT

	shoot( en, dt ){
		let dam = en.hit( this.damage, dt )
		this.total_damage += dam

		if( this.levels[ this.level ] !== undefined ){
			if( this.total_damage >= this.levels[ this.level ].cap ){	// Если сумма ущерба, нанесённого башней превышает текущий уровень
				this.damage = this.levels[ this.level ].damage        	// Заполняем данные из следующего уровня башни
				this.rad = this.levels[ this.level ].rad 				//
				this.maxLasersCount = this.levels[ this.level ].lcnt 	//
				this.level++											// Поднимаем уровень башни на единицу
			}
		}
	}

}

//---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------
//Класс Лазер

class laser {

	//---------------------------------------------------------------------------------------------------
	// Объект, у которого есть Старт и Финиш — 
	constructor( start, end ) {
		this.start 	= start 	// Старт — объект, у которого есть координаты
		this.end 	= end 		// Финиш — объект, у которого есть координаты
	}
}

export { tower, laser, foe }