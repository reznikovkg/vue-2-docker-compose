const state = {
  health:0,
  score:0,
  playerPrototype:{},
  enemyPrototype:{},
  attackPrototype:{},
  coinRadius:10,
 
  gameWidth:0,
  gameHeight:0,
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

  gameStatus:'end'
}

const getters = {
  enemies: (state) => state.enemies,
  attacks: (state) => state.attacks,
  coins: (state) => state.coins,
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
  ADD_ENEMY: (state) =>{
    if(state.gameStatus != 'play'){
      return
    }
    let playerX = state.windowWidth/2 - state.xWorld;
    let playerY = state.windowHeight/2 - state.yWorld;
    let [x,y] = spawnCoordsOnCircle(playerX, playerY, state.enemyPrototype.spawnRadius);
    state.enemies.push({
      id:state.enemyIDCounter, 
      x:x, 
      y:y,
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
    const [dX, dY] = linearIncrementByStep(distanceXAim, distanceYAim, state.attackPrototype.speed);
    state.attacks.push({
      id: state.attacksCounter,
      x: x,
      y: y,
      xStart: x,
      yStart: y,
      R: state.attackPrototype.lifeRadius,
      dX: dX,
      dY: dY,
      deactivate: false,
    });                 
    state.attacksCounter++;
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

    state.playerPrototype = args.playerPrototype,
    state.enemyPrototype = args.enemyPrototype,
    state.attackPrototype = args.attackPrototype,

    state.health = state.playerPrototype.health;

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
    state.gameStatus = 'end';
  },
}

const actions = {
  addEnemy({commit}) {
    commit("ADD_ENEMY")
  },
  addAttack({commit}) {
    commit("ADD_ATTACK")
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
  worldMove(state, deltaTime);
  enemyMove(state, deltaTime);
  attackEnemyCollision(state);
  playerCoinsCollision(state);
  attackMove(state, deltaTime);
  playerHealthCheck(state);
}

export const playerHealthCheck = (state) => {
  if(state.health <= 0){
    state.gameStatus = 'end';
  }
}

export const worldMove = (state, deltaTime) => {
  const movement =  state.playerPrototype.speed * deltaTime;
  let dyWorld = 0;
  let dxWorld = 0;
  if (state.keys['KeyW']) {
    dyWorld = movement;
  }
  if (state.keys['KeyS']) {
    dyWorld = -movement;
  }
  if (state.keys['KeyA']) {
    dxWorld = movement;
  }
  if (state.keys['KeyD']) {
    dxWorld = -movement;
  }
  if(leftBorderCollision(state, dxWorld) && rightBorderCollision(state, dxWorld)){
    state.xWorld += dxWorld;
  }
  if(topBorderCollision(state, dyWorld) && bottomBorderCollision(state, dyWorld)){
    state.yWorld += dyWorld;
  }
}

export const enemyMove = (state, deltaTime) => {
  state.enemies.forEach( (enemy) => {
    let enemyDistanceX = (state.xWorld-state.windowWidth/2) + enemy.x;
    let enemyDistanceY = (state.yWorld-state.windowHeight/2) + enemy.y;
    let [dX, dY] = linearIncrement(enemyDistanceX, enemyDistanceY, state.enemyPrototype.speed, deltaTime);
    if(circleCollision(enemyDistanceX, enemyDistanceY, state.enemyPrototype.radius, state.playerPrototype.radius)){
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
      let distanceX = enemy.x - attack.x;
      let distanceY = enemy.y - attack.y;
      const colisionFlag = circleCollision(distanceX, distanceY, state.enemyPrototype.radius, state.attackPrototype.radius);
      if(!attack.deactivate && !enemy.deactivate && colisionFlag){
        attack.deactivate = true;
        enemy.deactivate = true;
        addCoin(state, enemy.x, enemy.y);
        state.enemyCounter--;
        state.coinsCounter++;
      }
    });
  });
  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
  state.enemies = state.enemies.filter((enemy) => enemy.deactivate != true);
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
    const colisionFlag = circleCollision(distanceX, distanceY, attack.R, state.attackPrototype.radius); 
    if(!colisionFlag){
      attack.deactivate = true;
    }
  });
  state.attacks = state.attacks.filter((attack) => attack.deactivate != true);
}

export const addCoin = (state, x, y) =>{
  state.coins.push({
    id:state.coinsCounter,
    x: x, 
    y: y, 
    deactivate:false
  });
}

export const leftBorderCollision = (state, dxWorld) => {
  const newWorldBorderX = state.xWorld + dxWorld;
  return newWorldBorderX + state.playerPrototype.radius < state.windowWidth/2;
}

export const rightBorderCollision = (state, dxWorld) => {
  const newWorldBorderX = state.xWorld + state.gameWidth + dxWorld;
  return newWorldBorderX - state.playerPrototype.radius > state.windowWidth/2;
}

export const topBorderCollision = (state, dyWorld) => {
  const newWorldBorderY = state.yWorld + dyWorld;
  return newWorldBorderY + state.playerPrototype.radius < state.windowHeight/2;
}

export const bottomBorderCollision = (state, dyWorld) => {
  const newWorldBorderY = state.yWorld + state.gameHeight + dyWorld;
  return newWorldBorderY - state.playerPrototype.radius > state.windowHeight/2;
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
  