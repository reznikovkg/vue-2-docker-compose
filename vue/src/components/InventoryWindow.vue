<template>
  <div class="inventory" 
    v-show="!visible"
  >
    <div class="inventory__bag" 
      id="bag"
    >
      <div class="inventory__cell"
        v-for="(cell, index) in getInv"
        :key="'cell-'+index"
      >
        <img
          v-for="item in cell"
          :key="'item-'+item.id"
          :src="item.src"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  computed: {
    ...mapGetters('inventory',[
      'getInv'
    ]),
  },
  data(){
    return {
      visible:true
    }
  },

  mounted() {
    this.loadInventory();
    window.addEventListener('keydown', this.invControl);
  },

  methods: {
    ...mapActions('inventory',['addItem','loadInventory','clearInventory']),
    addRandomFish() {
      const randomId = Math.floor(Math.random() * 4) + 1;
      this.addItem(randomId);
    },
    invControl(event){
      if (event.key === 'e'){
        this.visible=!this.visible
      }
      if(event.key === 'r'){
        this.clearInventory()
      }
    }
  }
};
</script>

<style lang="scss">
.inventory{
  position: fixed;
  width: 170px;
  height: 170px;
  background-color: rgb(200, 146, 10);
  right: 10px;
  top: 10px;
  border-radius: 10px;
  z-index: 3;

  &__bag {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 4px;
  }
  &__cell {
    border-radius: 10px;
    border: 3px solid rgb(51, 51, 199);
    width: 47px;
    height: 47px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 4;
    }
  }
}
</style>