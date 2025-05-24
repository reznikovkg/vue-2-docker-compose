<template>
    <div class="bottom">
      <img src="../../assets/gate.png" class="gate" alt="" />
    </div>
  </template>
  
  <script></script>
  
  <style scoped lang="less">
  .bottom {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: gray;
    z-index: 5;
  }
  .gate {
    position: absolute;
    width: 39px;
    transform: rotateZ(-45deg) rotateX(-45deg) scaleY(2.4) translateY(1px) translateX(-14px);
  }
  </style>