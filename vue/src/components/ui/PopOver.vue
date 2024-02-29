<template>
    <div class="popover-container">
      <div class="button-slot" @mouseover="show = true" @mouseleave="show = false">
        
        <slot name="button"></slot>
      </div>
      <transition name="fade">
        <div v-if="show" class="popover-slot">
        
          <slot name="popover"></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
      };
    },
  };
  </script>
  
  <style scoped>
  .popover-container {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
  }
  
  .button-slot {
    background-color: #4CAF50; 
    color: white;
    padding: 10px 15px;
    border-radius: 20px; 
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    transition: background-color 0.3s ease; 
  }
  
  .button-slot:hover {
    background-color: #367C39; 
  }
  
  .popover-slot {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 200px; 
    padding: 10px;
    margin-top: 10px; 
    box-sizing: border-box;
    transition: opacity 0.3s ease, transform 0.3s ease; 
  }
  
  .fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter, .fade-leave-to  {
  opacity: 0;
  transform: translateY(-10px);
}
  </style>
  