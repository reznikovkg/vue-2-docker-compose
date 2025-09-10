<template>
  <ModalComponent :buttons="['Понятно', 'В инвентарь']" @response="(index) => response(index)">
    <div>
      <p>Отсутствуют следующие элементы экипировки, необходимые для рыбалки:</p>
      <ul>
        <li v-if="!inventory.equipedRod">Удилище</li>
        <li v-if="!inventory.equipedReel">Катушка</li>
        <li v-if="!inventory.equipedLine">Леска</li>
        <li v-if="!inventory.equipedBait">Наживка</li>
      </ul>
      <p>Экипируйте эти предметы чтобы начать рыбачить</p>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "@/components/parts/Modal";
import {mapState} from "vuex";

export default {
  name: "NotItemsEquipedModal",
  components: {
    ModalComponent
  },
  computed: {
    ...mapState({
      inventory: state => state.inventory
    })
  },
  methods: {
    response(index) {
      if (index == 1) {
        this.$router.push("/inventory");
      }

      this.$emit('close');
    }
  }
}
</script>