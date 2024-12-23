<template>
    <div class="rotary" ref="rotaryControl" @mousedown="startDrag">
      <div class="rotary__inner"> </div>
      <div class="rotary__value"> {{ value.toFixed(0) }} </div>
      <div class="rotary__handle" :style="{'left': handleX + 'px', 'top': handleY + 'px' }"> </div>
    </div>
</template>
  
  <script>
  export default {
    name:'CounterPart',
    data() {
      return {
        isDragging: false,
        lastAngle: 0,        
        currentAngle: 0,    
        value: 0,            
        handleX: 0,     
        handleY: 0,
      };
    },
    methods: {
      startDrag(event) {
        this.isDragging = true;
        this.lastAngle = this.getAngle(event);
  
        // Добавляем события для отслеживания движения
        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("mouseup", this.stopDrag);
      },
      onDrag(event) {
        if (!this.isDragging) return;
  
        const currentAngle = this.getAngle(event);
        let angleDelta = currentAngle - this.lastAngle;
        
        this.lastAngle = currentAngle;
        
        this.currentAngle += angleDelta;
        if (this.currentAngle >= 360) {
           this.currentAngle -= 360;
        } else if (this.currentAngle < 0) {
             this.currentAngle += 360;
        } else 


        this.value += angleDelta;
        
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.stopDrag);
      },
      getAngle(event) {
        const boundingRect = this.$refs.rotaryControl.getBoundingClientRect();
        const centerX = boundingRect.left + boundingRect.width / 2;
        const centerY = boundingRect.top + boundingRect.height / 2;
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;
        let angle = Math.atan2(deltaY, deltaX);
        
        const radius = boundingRect.width/2;
        this.handleX = boundingRect.left + radius + (radius-6) * Math.cos(angle);
        this.handleY = boundingRect.top + radius + (radius-6) * Math.sin(angle);
        
        angle += Math.PI/2;
        angle = angle < 0 ? angle + 2 * Math.PI : angle;

        angle *= 180 / Math.PI
        return angle;
      },
    },
    destroyed() {
        this.stopDrag();
    },
  };
  </script>
  
  <style scoped lang="less">
  .rotary {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #d3cfcf;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &__inner {
        width: 120px;
        height: 120px;
        background-color: #eeebeb;
        border-radius: 50%;
        position: absolute;
        transition: transform 0.1s;
    }

    &__value {
        position: absolute;
        font-size: 24px;
        font-weight: bold;
    }

    &__handle {
        position: absolute;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        border-width: 1px;
        border-style: solid;
        margin: -5px 0 0 -5px;
        cursor: pointer;
        opacity: 0.85;
    }
}
</style>
  