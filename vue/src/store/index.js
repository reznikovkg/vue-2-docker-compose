const state = {
  health:0,
  maxHealth:0,
  maxManna:0,
  score:0,
  manna:0,
  damageImprove:0,
  playerDirection: "w", // w s a d as sd aw wd
  prices:{
    health:{
      value: "max",
      amount: 1
    },
    damage:{
      value: 1,
      amount: 2
    },
    manna:{
      value: "max",
      amount: 1
    },
    maxHealth:{
      value: 10,
      amount: 1
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
  playerDirection: (state) => state.playerDirection,
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
  state.playerDirection = newWorldPos[2];

  const [newManna, newAttacksCounter] = keyInputAddAttack(
    state.keys,
    state.radiusAttacks,
    state.deadAttacks,
    state.attackPrototypes,
    state.windowWidth,
    state.windowHeight,
    state.xWorld,
    state.yWorld,
    state.xCursor,
    state.yCursor,
    state.attacksCounter,
    state.manna);
  state.manna = newManna;
  state.attacksCounter = newAttacksCounter;

  state.health = enemyMove( 
    state.enemies,
    state.xWorld,
    state.yWorld,
    state.windowWidth,
    state.windowHeight,
    state.playerPrototype,
    state.health,
    deltaTime);

  const [newEnemyCounter, newCoinsCounter] = attackEnemyCollision(
    state.enemies,
    state.attacks,
    state.radiusAttacks,
    state.deadAttacks,
    state.damageImprove,
    state.enemiesCounter,
    state.coinsCounter);

  state.enemiesCounter = newEnemyCounter;
  state.coinsCounter = newCoinsCounter;
  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
  state.enemies = state.enemies.filter((enemy) => enemy.deactivate != true);
  
  state.score = playerCoinsCollision(
    state.score,
    state.coins,
    state.xWorld,
    state.yWorld, 
    state.windowWidth,
    state.windowHeight,
    state.coinRadius,
    state.playerPrototype.radius);
  state.coins = state.coins.filter((coin) => coin.deactivate != true);

  attackMove(state.attacks, state.radiusAttacks, state.deadAttacks, deltaTime);

  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
  state.radiusAttacks = state.radiusAttacks.filter((attack) => attack.deactivate != true);
  state.deadAttacks = state.deadAttacks.filter((attack) => attack.deactivate != true);

  state.health = playerAttackCollision(
    state.health,
    state.attacks,
    state.xWorld,
    state.yWorld,
    state.windowWidth,
    state.windowHeight,
    state.playerPrototype.radius);

  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);

  if(state.health <= 0){
    state.gameStatus = 'end';
  }
}

export const keyInputAddAttack = (
  keys,
  radiusAttacks,
  deadAttacks,
  attackPrototypes,
  windowWidth,
  windowHeight,
  xWorld,
  yWorld,
  xCursor,
  yCursor,
  attacksCounter,
  manna) => {
  if (keys['KeyQ']) {
    if(radiusAttacks.length != 0 || manna - attackPrototypes['radius'].manna < 0){
      return [manna, attacksCounter];
    }
    manna -= attackPrototypes['radius'].manna;
    const x = windowWidth/2 - xWorld;
    const y = windowHeight/2 - yWorld;
    radiusAttacks.push({
      id: attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: 10,
      dX: attackPrototypes['radius'].speed,
      player: true,
      radius: attackPrototypes['radius'].radius,
      damageRadius: attackPrototypes['radius'].lifeRadius,
      damage: attackPrototypes['radius'].damage,
      deactivate: false,
    });                 
    attacksCounter++;
  } else if (keys['KeyE']) {
    if(deadAttacks.length != 0 || manna - attackPrototypes['dead'].manna < 0){
      return [manna, attacksCounter];
    }
    manna -= attackPrototypes['dead'].manna;
    const x = windowWidth/2 - xWorld;
    const y = windowHeight/2 - yWorld;
    const distanceXAim = windowWidth/2 - xCursor;
    const distanceYAim = windowHeight/2 - yCursor;
    const [dX, dY] = linearIncrementByStep(distanceXAim, distanceYAim, attackPrototypes['dead'].speed);
    deadAttacks.push({
      id: attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: attackPrototypes['dead'].lifeRadius,
      dX: dX,
      dY: dY,
      player: true,
      radius: attackPrototypes['dead'].radius,
      damageRadius: attackPrototypes['dead'].lifeRadius,
      deactivate: false,
    });                 
    attacksCounter++;
  }

  return [manna, attacksCounter];
}

export const worldMove = (player, xWorld, yWorld, keys, deltaTime) => {
  const movement = player.speed * deltaTime;
  let dyWorld = 0;
  let dxWorld = 0;
  let playerDirection = 'i';
  if (keys['KeyW']) {
    dyWorld = movement;
    playerDirection = 'w';
    if (keys['KeyD']) {
      dxWorld = -movement/Math.sqrt(2);
      dyWorld = movement/Math.sqrt(2);
      playerDirection = 'wd';
    }
    else if (keys['KeyA']) {
      dxWorld = movement/Math.sqrt(2);
      dyWorld = movement/Math.sqrt(2);
      playerDirection = 'wa';
    }
  }
  else if (keys['KeyS']) {
    dyWorld = -movement;
    playerDirection = 's';
    if (keys['KeyD']) {
      dxWorld = -movement/Math.sqrt(2);
      dyWorld = -movement/Math.sqrt(2);
      playerDirection = 'sd';
    }
    else if (keys['KeyA']) {
      dxWorld = movement/Math.sqrt(2);
      dyWorld = -movement/Math.sqrt(2);
      playerDirection = 'sa';
    }
  }
  else if (keys['KeyA']) {
    dxWorld = movement;
    playerDirection = 'a';
  }
  else if (keys['KeyD']) {
    dxWorld = -movement;
    playerDirection = 'd';
  }
  xWorld += dxWorld;
  yWorld += dyWorld;
  return [xWorld, yWorld, playerDirection];
}

export const enemyMove = (
  enemies,
  xWorld,
  yWorld,
  windowWidth,
  windowHeight,
  playerPrototype,
  health,
  deltaTime) => {
  enemies.forEach( (enemy) => {
    let enemyDistanceX = (xWorld - windowWidth/2) + enemy.x;
    let enemyDistanceY = (yWorld - windowHeight/2) + enemy.y;
    let [dX, dY] = linearIncrement(enemyDistanceX, enemyDistanceY, enemy.speed, deltaTime);
    if(circleCollision(enemyDistanceX, enemyDistanceY, enemy.radius, playerPrototype.radius)){
      health--;
      enemy.x += dX;
      enemy.y += dY;
    }
    else{
      enemy.x -= dX;
      enemy.y -= dY;
    }
  });
  return health;
}

export const attackEnemyCollision = (
    enemies, 
    attacks,
    radiusAttacks,
    deadAttacks, 
    damageImprove,
    enemyCounter,
    coinsCounter) => {
  enemies.forEach( (enemy) => {
    attacks.forEach( (attack) => {
      if (!attack.player) {
        return;
      }
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.radius);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        attack.deactivate = true;
        enemyDamage(enemy, attack.damage + damageImprove);
        enemyCounter--;
        coinsCounter++;
      }
    });
    radiusAttacks.forEach( (attack) => {
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.damageRadius+10);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        enemyDamage(enemy, attack.damage);
        enemyCounter--;
        coinsCounter++;
      }
    });
    deadAttacks.forEach( (attack) => {
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, enemy.radius, attack.radius);
      if (!attack.deactivate && !enemy.deactivate && colisionFlag) {
        enemyDamage(enemy, enemy.health+1);
        enemyCounter--;
        coinsCounter++;
      }
    });
  });

  if(radiusAttacks.length != 0)
    radiusAttacks[0].damage = 0;

  return [enemyCounter, coinsCounter];
}


export const enemyDamage = (enemy, damage) => {
  enemy.health -= damage;
  if(enemy.health <= 0){
    enemy.deactivate = true;
    addCoin(state, enemy.x, enemy.y);
  }
}

export const playerAttackCollision = (health, attacks, xWorld, yWorld, windowWidth, windowHeight, playerRadius) => {
  attacks.forEach( (attack) => {
    if(attack.player){
      return;
    }
    let distanceX = attack.x + (xWorld - windowWidth/2);
    let distanceY = attack.y + (yWorld - windowHeight/2);
    const colisionFlag = circleCollision(distanceX, distanceY, attack.radius, playerRadius);
    if(!attack.deactivate && colisionFlag){
      attack.deactivate = true;
      health -= attack.damage;
    }
  });
  return health;
}

export const playerCoinsCollision = (
    score,
    coins,
    xWorld,
    yWorld, 
    windowWidth,
    windowHeight,
    coinRadius,
    playerRadius) => {
  coins.forEach( (coin) => {
    let distanceX = coin.x + (xWorld - windowWidth/2);
    let distanceY = coin.y + (yWorld - windowHeight/2);
    const colisionFlag = circleCollision(distanceX, distanceY, coinRadius, playerRadius);
    if(!coin.deactivate && colisionFlag){
      coin.deactivate = true;
      score++;
    }
  });
  return score;
}
export const attackMove = (attacks, radiusAttacks, deadAttacks, deltaTime) => {
  attacks.forEach( (attack) => {
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

  radiusAttacks.forEach( (attack) => {
    let dX = attack.dX*deltaTime;
    attack.R += dX;
    if(attack.R > attack.damageRadius){
      attack.deactivate = true;
    }
  });

  deadAttacks.forEach( (attack) => {
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
  