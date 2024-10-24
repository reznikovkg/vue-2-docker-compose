<template>
    <div class="container">
      <h1 class="title">SVG Grid</h1>
      <svg :width="width" :height="height" class="grid">
        <!-- Сетка -->
        <g class="grid-lines">
          <line
            v-for="x in gridX"
            :key="'x' + x"
            :x1="x"
            :y1="0"
            :x2="x"
            :y2="height"
            class="grid-line"
          />
          <line
            v-for="y in gridY"
            :key="'y' + y"
            :x1="0"
            :y1="y"
            :x2="width"
            :y2="y"
            class="grid-line"
          />
        </g>
  
        <!-- Точки -->
        <g class="points">
          <circle
            v-for="(point, index) in points"
            :key="'point' + index"
            :cx="point.x"
            :cy="height - point.y"
            :r="radius"
            :fill="point.color"
            class="point"
          />
        </g>
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      points: {
        type: Array,
        required: true,
      },
      radius: {
        type: Number,
        required: true,
      },
      gridSize: {
        type: Number,
        default: 50,
      },
    },
    computed: {
      gridX() {
        return Array.from(
          { length: Math.ceil(this.width / this.gridSize) },
          (_, i) => i * this.gridSize
        );
      },
      gridY() {
        return Array.from(
          { length: Math.ceil(this.height / this.gridSize) },
          (_, i) => i * this.gridSize
        );
      },
    },
  };
  </script>
  
  <style lang="less">
  @grid-line-color: #e0e0e0;
  @point-stroke-color: #555;
  @title-color: #333;
  @title-font-size: 24px;
  @container-padding: 20px;
  @point-hover-color: #ff6347;
  
  .container {
    padding: @container-padding;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: @title-font-size;
    color: @title-color;
    font-family: 'Arial', sans-serif;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .grid {
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    
    &-lines {
      .grid-line {
        stroke: @grid-line-color;
        stroke-width: 1px;
      }
    }
  
    &-points {
      .point {
        stroke: @point-stroke-color;
        stroke-width: 2px;
        transition: fill 0.3s, transform 0.3s;
        
        &:hover {
          fill: @point-hover-color;
          transform: scale(1.2);
        }
      }
    }
  }
  </style>
  