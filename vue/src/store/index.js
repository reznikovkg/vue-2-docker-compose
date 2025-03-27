const state = {
  player:{},
  health:0,
  score:0,
  playerPrototype:{},
  enemyPrototype:{},
  attackPrototype:{},
  coinRadius:40,
 
  w:0,
  h:0,
  xWorld: 0,
  yWorld: 0,
  wWindow:0,
  hWindow:0,

  bullCounter: 1,
  coinsCounter: 0,
  enemyIDCounter: 0,

  keys: {},
  enemies:[],
  attacks:[],
  coins:[],

  gameStatus:0
}

const getters = {
  ENEMIES: (state) => state.enemies,
  ATTACKS: (state) => state.attacks,
  COINS: (state) => state.coins,
  X_WORLD: (state) => state.xWorld,
  Y_WORLD: (state) => state.yWorld,
  WORLDSTYLE: (state) => {
    return {
      'width': state.w + 'px',
      'height': state.h + 'px',
      'left': state.xWorld + 'px',
      'top': state.yWorld + 'px'
    }
  },
  HEALTH: (state) => state.health,
  SCORE: (state) => state.score,
  GAMESTATUS: (state) => state.gameStatus
}

const mutations = {
  ADD_ENEMY: (state) =>{
    if(state.gameStatus != 0){
      return
    }
    let playerX = state.wWindow/2 - state.xWorld;
    let playerY = state.hWindow/2 - state.yWorld;
    let R = 300;
    let angle = Math.random() * (Math.PI -(-Math.PI)) -Math.PI;

    let x = playerX + R*Math.cos(angle);
    let y = playerY + R*Math.sin(angle);
    
    state.enemies.push({
      id:state.enemyIDCounter, 
      x:x, 
      y:y,
      deactivate: false
    });
    state.enemyIDCounter++;
  },
  ADD_ATTACK: (state) =>{
    if(state.gameStatus != 0){
      return
    }
    const deltaXAim = state.wWindow/2 - state.xCursor;
    const deltaYAim = state.hWindow/2 - state.yCursor;
    const gipo = Math.sqrt(deltaXAim*deltaXAim + deltaYAim*deltaYAim);
    const sin = deltaYAim/gipo;
    const cos = deltaXAim/gipo;

    state.attacks.push({
      id:state.bullCounter,
      x: state.wWindow/2 - state.xWorld,
      y: state.hWindow/2 - state.yWorld,
      xOld: state.wWindow/2 - state.xWorld,
      yOld: state.hWindow/2 - state.yWorld,
      deactivate: false,
      R: 180,
      dX:-cos*400,
      dY:-sin*400
    });
                        
    state.bullCounter++;
  },
  UPDATE_INPUT: (state, args) =>{
    state.keys = args.keys;
    state.xCursor = args.xCursor;
    state.yCursor = args.yCursor;
  },
  UPDATE: (state, deltaTime) =>{
    if(state.gameStatus != 0){
      return
    }
    Update(state, deltaTime);
  },
  INIT: (state, args) =>{
    state.w= args.w;
    state.h= args.h;
    state.wWindow= args.wWindow;
    state.hWindow= args.hWindow;
    state.xWorld = state.wWindow/2 - state.w/2;
    state.yWorld = state.hWindow/2 - state.h/2;

    state.playerPrototype=args.playerPrototype,
    state.enemyPrototype=args.enemyPrototype,
    state.attackPrototype=args.attackPrototype,

    Object.assign(state.player, state.playerPrototype);
    state.health = state.playerPrototype.health;

    state.gameStatus = 2;
  },
  START: (state) =>{
    state.gameStatus = 0;
  },
  PAUSE: (state) =>{
    if(state.gameStatus==0){
      state.gameStatus=1;
    }
    else if(state.gameStatus==1) {
      state.gameStatus=0;
    }
  },
  RESET: (state) =>{
    state.xWorld = state.wWindow/2 - state.w/2;
    state.yWorld = state.hWindow/2 - state.h/2;

    Object.assign(state.player, state.playerPrototype);

    state.enemies = [];
    state.attacks = [];
    state.coins = [];

    state.score = state.playerPrototype.score;
    state.health = state.playerPrototype.health;
    state.gameStatus = 2;
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
  updateState({commit}, deltaTime) {
    commit("UPDATE", deltaTime)
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

export const Update = (state, deltaTime) => {
  if(state.gameStatus == 0){
    WorldMove(state, deltaTime);
    EnemyMove(state, deltaTime);
    AttackEnemyColision(state);
    PlayercoinsColision(state);
    AttackMove(state, deltaTime);
    PlayerCheck(state);
  }
}
export const PlayerCheck = (state) => {
  if(state.health <= 0){
    state.gameStatus = 2;
  }
}
export const WorldMove = (state, deltaTime) => {
  const movement =  state.player.playerSpeed * deltaTime;
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
  CheckBorders(state, dxWorld, dyWorld);
}

export const CheckBorders = (state, dxWorld, dyWorld) => {
  let left = (state.xWorld - dxWorld) + state.player.playerRadius < state.wWindow/2;
  let right =(state.xWorld + state.w + dxWorld)-state.player.playerRadius > state.wWindow/2;
  if(left && right){
    state.xWorld += dxWorld;
  }else{
    if(!left) state.xWorld --;
    if(!right) state.xWorld ++;
  }
  let top = (state.yWorld - dyWorld) + 2*state.player.playerRadius < state.hWindow/2;
  let bottom =(state.yWorld + state.h + dyWorld)-state.player.playerRadius > state.hWindow/2;
  if(top && bottom){
    state.yWorld += dyWorld;
  }else{
    if(!top) state.yWorld --;
    if(!bottom) state.yWorld ++;
  }
}

export const EnemyMove = (state, deltaTime) => {
  for(const enemy in state.enemies){
    let enemyDeltaX = (state.xWorld-state.wWindow/2) + state.enemies[enemy].x;
    let enemyDeltaY = (state.yWorld-state.hWindow/2) + state.enemies[enemy].y;
    const d = Math.sqrt(enemyDeltaX*enemyDeltaX + enemyDeltaY*enemyDeltaY);
    const sin = enemyDeltaX/d;
    const cos = enemyDeltaY/d;
    let dX_ = state.enemyPrototype.enemySpeed*sin * deltaTime;
    let dY_ = state.enemyPrototype.enemySpeed*cos * deltaTime;
    const enemyPos = Math.sqrt(enemyDeltaX*enemyDeltaX + enemyDeltaY* enemyDeltaY);
    const R = state.player.playerRadius + state.enemyPrototype.enemyRadius;
    if(enemyPos <= R){
      state.health--;
      if(state.health < 0){
        state.health = 0;
      }
      state.enemies[enemy].x += dX_;
      state.enemies[enemy].y += dY_;
    }
    else{
      state.enemies[enemy].x -= dX_;
      state.enemies[enemy].y -= dY_;
    }
  }
}

export const AttackEnemyColision = (state) => {
  for(const enemy in state.enemies){
    for(const attack in state.attacks){
      let x1 = state.enemies[enemy].x;
      let y1 = state.enemies[enemy].y;
      let x2 = state.attacks[attack].x;
      let y2 = state.attacks[attack].y;
      let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      const colisionFlag = (d <= state.enemyPrototype.enemyRadius + state.attackPrototype.attackRadius);

      if(!state.attacks[attack].deactivate && !state.enemies[enemy].deactivate && colisionFlag){
        state.attacks[attack].deactivate = true;
        state.coins.push({
          id:state.coinsCounter,
          x:state.enemies[enemy].x, 
          y:state.enemies[enemy].y, 
          deactivate:false
        });
        state.enemies[enemy].deactivate = true;
        state.enemyCounter--;
        state.coinsCounter++;
      }
    }
  }
  state.attacks=state.attacks.filter((attack) => attack.deactivate != true);
  state.enemies=state.enemies.filter((enemy) => enemy.deactivate != true);
}

export const PlayercoinsColision = (state) => {
  for(const coin in state.coins){
    let x1 = state.coins[coin].x;
    let y1 = state.coins[coin].y;
    let x2 = -(state.xWorld-state.wWindow/2);
    let y2 = -(state.yWorld-state.hWindow/2);
    let d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

    if(!state.coins[coin].deactivate && d <= state.coinRadius){
      state.coins[coin].deactivate = true;
      state.score++;
    }
  }
  state.coins=state.coins.filter((coin) => coin.deactivate != true);
}

export const AttackMove = (state, deltaTime) => {
  for(const attack in state.attacks){

    let dX = state.attacks[attack].dX*deltaTime;
    let dY = state.attacks[attack].dY*deltaTime;
    const distanceX = state.attacks[attack].xOld-state.attacks[attack].x;
    const distanceY = state.attacks[attack].yOld-state.attacks[attack].y;
    let d = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
    state.attacks[attack].x += dX;
    state.attacks[attack].y += dY;

    if(d > state.attacks[attack].R){
      state.attacks[attack].deactivate = true;
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
  