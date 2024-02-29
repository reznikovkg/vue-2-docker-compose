<template>
  <div id="app">
    <PopOver>
      <template v-slot:button>
       
        <div>Отчество: Фамилия И. О.</div>
      </template>
      <template v-slot:popover>
        
        <div>Фамилия Имя Отчество</div>
        <div>01.01.1920 - 01.01.2020</div>
        <div>id: 100</div>
      </template>
    </PopOver>
  </div>
</template>

<script>

import PopOver from "@/components/ui/PopOver";

export default {
  name: 'App',

  components: {
    PopOver
  }
}
</script>

<style lang="less">

@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

@ffOne: 'Jost', sans-serif;
@cBaseTwo: #f0f0f0; 
@cBaseOne: #fff; 
@cBaseThree: #333; 
@sizeBorderDefault: 1px;

body {
  margin: 0;
  padding: 0;
  background-color: @cBaseTwo;
}

a {
  text-decoration: none;
}

section {
  background-color: @cBaseOne;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  font-family: @ffOne;
  color: @cBaseThree;
  margin: 0;
}

h2 {
  font-size: 32px;
}

.p-16 {
  padding: 16px;
}

.d-flex {
  display: flex;
}

.rcms {
  &-divider {
    &-h {
      width: 100%;
      height: @sizeBorderDefault;
      background-color: @cBaseTwo;
    }
  }

  &-loading {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(100, 100, 100, 0.5);
      cursor: wait;
    }
  }
}


.popover-button {
  background-color: #4CAF50; 
  color: white; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  outline: none; 
}


.popover-content {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  padding: 16px;
  width: auto; 
}

.popover-container {
  position: fixed;
  top: 0; 
  left: 50%; 
  transform: translateX(-50%); 
  z-index: 1000; 
}

.popover-button {
  padding: 10px 20px;
}


@media (max-width: 600px) {
  .popover-button {
    padding: 5px 10px;
    font-size: 12px;
  }
}

@media (min-width: 1200px) {
  .popover-button {
    padding: 15px 30px;
    font-size: 18px;
  }
}

</style>