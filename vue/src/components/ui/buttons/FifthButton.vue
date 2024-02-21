<template>
  <div>
    <button class="btn5" @mouseover="hovering = true" @mouseleave="hovering = false" :class="{'btn5-hovered': hovering}">
      LINK TO ACTION
    </button>
  </div>
</template>

<script >
  export default {
    name: 'FifthButton',
    data () {
      return {
        hovering: false
      }
    }
  }
</script>

<style>

.btn5 {
  color: white;
  font-size: 24px;
  margin: 30px 30px;
  padding: 35px 80px;
  border: none;
  border-radius: 5px;
  background: #19a6cb;
  position: relative;
}
.btn5-hovered {
  padding-top: 25px;
  padding-bottom: 45px;
}
.btn5-hovered::before {
  content: '';
  height: 15px;
  width: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.1);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>