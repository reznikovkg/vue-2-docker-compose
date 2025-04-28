const state = {
  health:0,
  maxHealth:0,
  maxManna:0,
  score:0,
  manna:0,
  damageImprove:0,
  prices:{
    health:{
      value: "max",
      amount: 10
    },
    damage:{
      value: 1,
      amount: 2
    },
    manna:{
      value: "max",
      amount: 10
    },
    maxHealth:{
      value: 10,
      amount: 10
    },
    maxManna:{
      value: 1,
      amount: 1
    },
  },
  playerPrototype:{
    score:0,
    health: 100,
    manna: 100,
    speed: 100,
    radius: 15
  },
  enemyPrototypes:{
    goon: {
      speed: 80,
      radius: 15,
      health: 5,
      spawnSpan: 3000,
      spawnRadius: 300
    },
    archer: {
      speed: 20,
      radius: 20,
      health: 15,
      spawnSpan: 5000,
      spawnRadius: 500
    }
  },
  attackPrototypes:{
    simple:{ 
      radius: 10,
      lifeRadius: 180,
      speed: 400,
      spawnSpan: 2000,
      damage: 5
    },
    radius:{ 
      radius: 50,
      lifeRadius: 50,
      speed: 100,
      damage: 5,
      manna: 10
    },
    dead:{ 
      radius: 20,
      lifeRadius: 250,
      speed: 200,
      manna: 10
    },
    archers:{ 
      radius: 8,
      lifeRadius: 120,
      speed: 300,
      spawnSpan: 5000,
      damage: 1
    }
  },

  coinRadius:10,
  maxEnemies:50,
 
  gameWidth:1000,
  gameHeight:1000,
  windowWidth:0,
  windowHeight:0,
  xWorld: 0,
  yWorld: 0,
  xCursor:0,
  yCursor:0,

  attacksCounter: 0,
  coinsCounter: 0,
  enemiesCounter: 0,
  enemyIDCounter: 0,

  keys: {},
  enemies:[],
  attacks:[],
  coins:[],
  radiusAttacks:[],
  deadAttacks:[],

  gameStatus:'end'
}

const getters = {
  enemies: (state) => state.enemies,
  attacks: (state) => state.attacks,
  attackPrototypes: (state) => state.attackPrototypes,
  enemyPrototypes: (state) => state.enemyPrototypes,
  playerPrototype: (state) => state.playerPrototype,
  prices: (state) => state.prices,
  radiusAttacks: (state) => state.radiusAttacks,
  deadAttacks: (state) => state.deadAttacks,
  playerStats: (state) => {
    return {
      health: state.health,
      maxHealth: state.playerPrototype.health,
      manna: state.manna,
      maxManna: state.playerPrototype.manna,
      damage: state.attackPrototypes['simple'].damage
    }
  },
  coins: (state) => state.coins,
  manna: (state) => state.manna,
  enemiesCounter: (state) => state.enemiesCounter,
  xWorld: (state) => state.xWorld,
  yWorld: (state) => state.yWorld,
  xCursor: (state) => state.xCursor,
  yCursor: (state) => state.yCursor,
  worldStyle: (state) => {
    return {
      width: state.gameWidth + 'px',
      height: state.gameHeight + 'px',
      left: state.xWorld + 'px',
      top: state.yWorld + 'px'
    }
  },
  health: (state) => state.health,
  score: (state) => state.score,
  gameStatus: (state) => state.gameStatus
}

const mutations = {
  ADD_ENEMY: (state, args) =>{
    if(state.gameStatus != 'play' && state.enemies.length < state.maxEnemies){
      return
    }
    const playerX = state.windowWidth/2 - state.xWorld;
    const playerY = state.windowHeight/2 - state.yWorld;
    const [x,y] = spawnCoordsOnCircle(playerX, playerY, state.enemyPrototypes[args.protoName].spawnRadius);
    state.enemies.push({
      id:state.enemyIDCounter, 
      x:x, 
      y:y,
      speed: state.enemyPrototypes[args.protoName].speed,
      radius: state.enemyPrototypes[args.protoName].radius,
      health: state.enemyPrototypes[args.protoName].health,
      spawnSpan: state.enemyPrototypes[args.protoName].spawnSpan,
      name: args.protoName,
      deactivate: false
    });
    state.enemyIDCounter++;
    state.enemiesCounter++;
  },
  ADD_ATTACK: (state) =>{
    if(state.gameStatus != 'play'){
      return
    }
    const x = state.windowWidth/2 - state.xWorld;
    const y = state.windowHeight/2 - state.yWorld;
    const distanceXAim = state.windowWidth/2 - state.xCursor;
    const distanceYAim = state.windowHeight/2 - state.yCursor;
    const [dX, dY] = linearIncrementByStep(distanceXAim, distanceYAim, state.attackPrototypes['simple'].speed);
    state.attacks.push({
      id: state.attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: state.attackPrototypes['simple'].lifeRadius,
      dX: dX,
      dY: dY,
      player: true,
      radius: state.attackPrototypes['simple'].radius,
      spawnSpan: state.attackPrototypes['simple'].spawnSpan,
      damage: state.attackPrototypes['simple'].damage,
      deactivate: false,
    });                 
    state.attacksCounter++;
  },
  ADD_ARCHER_ATTACK:(state) =>{
    if(state.gameStatus != 'play'){
      return
    }
    state.enemies.forEach( (enemy) => {
      if(enemy.name != 'archer'){
        return
      }
      const xPlayer = state.windowWidth/2 - state.xWorld;
      const yPlayer = state.windowHeight/2 - state.yWorld;
      const distanceXAim = xPlayer - enemy.x;
      const distanceYAim = yPlayer - enemy.y;
      const [dX, dY] = linearIncrementByStep(distanceXAim, distanceYAim, state.attackPrototypes['archers'].speed);
      state.attacks.push({
        id: state.attacksCounter,
        x: enemy.x,
        y: enemy.y,
        xStart: enemy.x,
        yStart: enemy.y,
        R: state.attackPrototypes['archers'].lifeRadius,
        dX: -dX,
        dY: -dY,
        player: false,
        radius: state.attackPrototypes['archers'].radius,
        spawnSpan: state.attackPrototypes['archers'].spawnSpan,
        damage: state.attackPrototypes['archers'].damage,
        deactivate: false,
      });                 
      state.attacksCounter++;
    });
  },
  UPDATE_INPUT: (state, args) =>{
    state.keys = args.keys;
    state.xCursor = args.xCursor;
    state.yCursor = args.yCursor;
  },
  UPDATE_INPUT_CURSOR: (state, args) =>{
    state.xCursor = args.xCursor;
    state.yCursor = args.yCursor;
  },
  UPDATE_INPUT_KEY: (state, key) =>{
    state.keys[key.code] = key.status;
  },
  UPDATE_GAME_STATE: (state, deltaTime) =>{
    if(state.gameStatus != 'play'){
      return
    }
    updateGameState(state, deltaTime);
  },
  INIT: (state, args) =>{
    state.gameWidth = args.gameWidth;
    state.gameHeight = args.gameWidth;
    state.windowWidth = args.windowWidth;
    state.windowHeight = args.windowHeight;
    state.xWorld = state.windowWidth/2 - state.gameWidth/2;
    state.yWorld = state.windowHeight/2 - state.gameHeight/2;

    state.score = state.playerPrototype.score;
    state.health = state.playerPrototype.health;
    state.maxHealth = state.playerPrototype.health;
    state.manna = state.playerPrototype.manna;
    state.maxManna = state.playerPrototype.manna;
    state.damageImprove = 0;
    state.gameStatus = 'end';
  },
  START: (state) =>{
    state.gameStatus = 'play';
  },
  PAUSE: (state) =>{
    if(state.gameStatus == 'play'){
      state.gameStatus = 'pause';
    }
    else if(state.gameStatus == 'pause') {
      state.gameStatus ='play';
    }
  },
  RESET: (state) =>{
    state.xWorld = state.windowWidth/2 - state.gameWidth/2;
    state.yWorld = state.windowHeight/2 - state.gameHeight/2;

    state.enemies = [];
    state.attacks = [];
    state.coins = [];

    state.score = state.playerPrototype.score;
    state.health = state.playerPrototype.health;
    state.maxHealth = state.playerPrototype.health;
    state.manna = state.playerPrototype.manna;
    state.maxManna = state.playerPrototype.manna;
    state.damageImprove = 0;
    state.gameStatus = 'end';
  },
  BAY_IMPROVE: (state, args) =>{
    if(state.score - args.item.amount >= 0){
      state.score -= args.item.amount;

      if(args.key == 'health'){
        state[args.key] = state.maxHealth;
      } else if(args.key == 'manna'){
        state[args.key] = state.maxManna;
      } else if(args.key == 'damage'){
        state.damageImprove += args.item.value;
      } else if(args.key == 'maxHealth'){
        state[args.key] += args.item.value;
      } else if(args.key == 'maxManna'){
        state[args.key] += args.item.value;
      }
    }
  },
  MANNA_INCREASE: (state) => {
    if(state.gameStatus != 'play')
      return;
    if(state.manna < state.maxManna)
      state.manna++;
  }
}

const actions = {
  bayImprove({commit}, args) {
    commit("BAY_IMPROVE", args)
  },
  mannaIncrease({commit}) {
    commit("MANNA_INCREASE")
  },
  addEnemy({commit}, args) {
    commit("ADD_ENEMY", args)
  },
  addAttack({commit}) {
    commit("ADD_ATTACK")
  },
  addArchersAttack({commit}){
    commit("ADD_ARCHER_ATTACK")
  },
  updateInput({commit}, args) {
    commit("UPDATE_INPUT", args)
  },
  updateInputCursor({commit}, args) {
    commit("UPDATE_INPUT_CURSOR", args)
  },
  updateInputKey({commit}, key) {
    commit("UPDATE_INPUT_KEY", key)
  },
  updateState({commit}, deltaTime) {
    commit("UPDATE_GAME_STATE", deltaTime)
  },
  init({commit}, args) {
    commit("INIT", args)
  },
  start({commit}) {
    commit("START")
  },
  pause({commit}) {
    commit("PAUSE")
  },
  reset({commit}) {
    commit("RESET")
  },
}

export const updateGameState = (state, deltaTime) => {
  if(state.gameStatus != 'play'){
    return
  }
  const newWorldPos = worldMove(
    state.playerPrototype,
    state.xWorld,
    state.yWorld,
    state.keys,
    deltaTime);

  state.xWorld = newWorldPos[0];
  state.yWorld = newWorldPos[1];
  keyInputAddAttack(state);
  enemyMove(state, deltaTime);
  attackEnemyCollision(state);
  playerCoinsCollision(state);
  attackMove(state, deltaTime);
  playerAttackCollision(state);
  if(state.health <= 0){
    state.gameStatus = 'end';
  }
}

export const keyInputAddAttack = (state) => {
  if (state.keys['KeyQ']) {
    if(state.radiusAttacks.length != 0 || state.manna - state.attackPrototypes['radius'].manna < 0){
      return;
    }
    state.manna -= state.attackPrototypes['radius'].manna;
    const x = state.windowWidth/2 - state.xWorld;
    const y = state.windowHeight/2 - state.yWorld;
    state.radiusAttacks.push({
      id: state.attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: 10,
      dX: state.attackPrototypes['radius'].speed,
      player: true,
      radius: state.attackPrototypes['radius'].radius,
      damageRadius: state.attackPrototypes['radius'].lifeRadius,
      damage: state.attackPrototypes['radius'].damage,
      deactivate: false,
    });                 
    state.attacksCounter++;
  } else if (state.keys['KeyE']) {
    if(state.deadAttacks.length != 0 || state.manna - state.attackPrototypes['dead'].manna < 0){
      return;
    }
    state.manna -= state.attackPrototypes['dead'].manna;
    const x = state.windowWidth/2 - state.xWorld;
    const y = state.windowHeight/2 - state.yWorld;
    const distanceXAim = state.windowWidth/2 - state.xCursor;
    const distanceYAim = state.windowHeight/2 - state.yCursor;
    const [dX, dY] = linearIncrementByStep(distanceXAim, distanceYAim, state.attackPrototypes['dead'].speed);
    state.deadAttacks.push({
      id: state.attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: state.attackPrototypes['dead'].lifeRadius,
      dX: dX,
      dY: dY,
      player: true,
      radius: state.attackPrototypes['dead'].radius,
      damageRadius: state.attackPrototypes['dead'].lifeRadius,
      deactivate: false,
    });                 
    state.attacksCounter++;
  }
}

export const worldMove = (player, xWorld, yWorld, keys, deltaTime) => {
  const movement = player.speed * deltaTime;
  let dyWorld = 0;
  let dxWorld = 0;
  if (keys['KeyW']) {
    dyWorld = movement;
  }
  if (keys['KeyS']) {
    dyWorld = -movement;
  }
  if (keys['KeyA']) {
    dxWorld = movement;
  }
  if (keys['KeyD']) {
    dxWorld = -movement;
  }
  xWorld += dxWorld;
  yWorld += dyWorld;
  return [xWorld, yWorld];
}

export const enemyMove = (state, deltaTime) => {
  state.enemies.forEach( (enemy) => {
    let enemyDistanceX = (state.xWorld-state.windowWidth/2) + enemy.x;
    let enemyDistanceY = (state.yWorld-state.windowHeight/2) + enemy.y;
    let [dX, dY] = linearIncrement(enemyDistanceX, enemyDistanceY, enemy.speed, deltaTime);
    if(circleCollision(enemyDistanceX, enemyDistanceY, enemy.radius, state.playerPrototype.radius)){
      state.health--;
      enemy.x += dX;
      enemy.y += dY;
    }
    else{
      enemy.x -= dX;
      enemy.y -= dY;
    }
  });
}

export const attackEnemyCollision = (state) => {
  state.enemies.forEach( (enemy) => {
    state.attacks.forEach( (attack) => {
      if (!attack.player) {
        return;
      }
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.radius);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        attack.deactivate = true;
        enemyDamage(enemy, attack.damage + state.damageImprove);
      }
    });
    state.radiusAttacks.forEach( (attack) => {
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.damageRadius+10);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        enemyDamage(enemy, attack.damage);
      }
    });
    state.deadAttacks.forEach( (attack) => {
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.radius);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        enemyDamage(enemy, enemy.health+1);
      }
    });
  });

  if(state.radiusAttacks.length != 0)
    state.radiusAttacks[0].damage = 0;

  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
  state.enemies = state.enemies.filter((enemy) => enemy.deactivate != true);
}


export const enemyDamage = (enemy, damage) => {
  enemy.health -= damage;
  if(enemy.health <= 0){
    enemy.deactivate = true;
    addCoin(state, enemy.x, enemy.y);
    state.enemyCounter--;
    state.coinsCounter++;
  }
}

export const playerAttackCollision = (state) => {
  state.attacks.forEach( (attack) => {
    if(attack.player){
      return;
    }
    let distanceX = attack.x + (state.xWorld-state.windowWidth/2);
    let distanceY = attack.y + (state.yWorld-state.windowHeight/2);
    const colisionFlag = circleCollision(distanceX, distanceY, attack.radius, state.playerPrototype.radius);
    if(!attack.deactivate && colisionFlag){
      attack.deactivate = true;
      state.health-=attack.damage;
    }
  });
  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
}

export const playerCoinsCollision = (state) => {
  state.coins.forEach( (coin) => {
    let distanceX = coin.x + (state.xWorld-state.windowWidth/2);
    let distanceY = coin.y + (state.yWorld-state.windowHeight/2);
    const colisionFlag = circleCollision(distanceX, distanceY, state.coinRadius, state.playerPrototype.radius);
    if(!coin.deactivate && colisionFlag){
      coin.deactivate = true;
      state.score++;
    }
  });
  state.coins = state.coins.filter((coin) => coin.deactivate != true);
}
export const attackMove = (state, deltaTime) => {
  state.attacks.forEach( (attack) => {
    let dX = attack.dX*deltaTime;
    let dY = attack.dY*deltaTime;
    attack.x += dX;
    attack.y += dY;
    const distanceX = attack.xStart-attack.x;
    const distanceY = attack.yStart-attack.y;
    const colisionFlag = circleCollision(distanceX, distanceY, attack.R, attack.radius); 
    if(!colisionFlag){
      attack.deactivate = true;
    }
  });
  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);

  state.radiusAttacks.forEach( (attack) => {
    let dX = attack.dX*deltaTime;
    attack.R += dX;
    if(attack.R > attack.damageRadius){
      attack.deactivate = true;
    }
  });
  state.radiusAttacks = state.radiusAttacks.filter((attack) => attack.deactivate != true);

  state.deadAttacks.forEach( (attack) => {
    let dX = attack.dX*deltaTime;
    let dY = attack.dY*deltaTime;
    attack.x += dX;
    attack.y += dY;
    const distanceX = attack.xStart-attack.x;
    const distanceY = attack.yStart-attack.y;
    const colisionFlag = circleCollision(distanceX, distanceY, attack.R, attack.radius); 
    if(!colisionFlag){
      attack.deactivate = true;
    }
  });
  state.deadAttacks = state.deadAttacks.filter((attack) => attack.deactivate != true);
}

export const addCoin = (state, x, y) =>{
  state.coins.push({
    id:state.coinsCounter,
    x: x, 
    y: y, 
    deactivate:false
  });
}

export const circleCollision = (distanceX, distanceY, firstRadius, secondRadius) => {
  const distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
  const R = firstRadius + secondRadius;
  return distance <= R;
}

export const linearIncrement = (distanceX, distanceY, speed, deltaTime) => {
  const distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
  const sin = distanceY/distance;
  const cos = distanceX/distance;
  let dX = speed * cos * deltaTime;
  let dY = speed * sin * deltaTime;
  return [dX, dY];
}

export const linearIncrementByStep = (distanceX, distanceY, speed) => {
  const distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
  const sin = distanceY/distance;
  const cos = distanceX/distance;
  let dX = -cos*speed;
  let dY = -sin*speed;
  return [dX, dY];
}

export const spawnCoordsOnCircle = (centerX, centerY, R) => {
  let angle = Math.random() * (Math.PI -(-Math.PI)) -Math.PI;
  let x = centerX + R*Math.cos(angle);
  let y = centerY + R*Math.sin(angle);
  return [x,y];
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
  