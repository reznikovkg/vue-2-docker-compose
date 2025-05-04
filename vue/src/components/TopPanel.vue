<template>
    <div class="panel-design">
      <div class="coords-design">
        Координаты: <br>{{getPos.x-325}}, {{-getPos.y+137}}
      </div>
      <div class="area-design">          
        Клёв:{{getArea}}
      </div>
    </div>

    
  </template>
  
<script>
import {mapActions, mapGetters} from "vuex";
export default {
  name: "TopPanel",
  computed:{
    ...mapGetters('movement',['getPos']),
    ...mapGetters('areas',['getArea'])
  },
  methods:{
    ...mapActions('areas',['checkArea'])
  },
  mounted() {
  setInterval(() => {
    this.checkArea();
  }, 100);
}
}
  </script>
  
  <style>
  .panel-design
  {
    margin-left: 500px;
    top:0;
    position: fixed;
    width: 500px;
    height: 0;
    border-top: 100px solid rgb(51, 180, 224);
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    opacity: 0.7;
    z-index: 3;
  }

  .coords-design
  {
    margin-left: 190px;
    top:0;
    position: fixed;
    font-size: 25px;
  }

  .area-design
  {
    margin-left: 190px;
    top:55px;
    position: fixed;
    font-size: 25px;
  }
  </style>