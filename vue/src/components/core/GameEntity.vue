<template>
  <component
      :is="entity.type"
      :position="entity.position"
      :dimensions="entity.dimensions"
      :color="entity.color"
      :health="entity.health"
      :is-enemy="entity.isEnemy"
      :index="entity.index"
      v-on="$listeners"
  />
</template>

<script>
import PlayerShip from '@/components/parts/PlayerShip.vue'
import StarObject from '@/components/parts/StarObject.vue'
import AsteroidObject from '@/components/parts/AsteroidObject.vue'
import EnemyShip from '@/components/parts/EnemyShip.vue'
import BulletObject from '@/components/parts/BulletObject.vue'

export default {
  name: 'GameEntity',

  components: {
    PlayerShip,
    StarObject,
    AsteroidObject,
    EnemyShip,
    BulletObject
  },

  props: {
    entity: {
      type: Object,
      required: true,
      validator(entity) {
        const hasRequiredFields = ['type', 'position', 'dimensions'].every(prop => prop in entity)

        const isTypeValid = [
          'PlayerShip',
          'StarObject',
          'AsteroidObject',
          'EnemyShip',
          'BulletObject'
        ].includes(entity.type)

        const isPositionValid = (
            typeof entity.position?.x === 'number' &&
            typeof entity.position?.y === 'number'
        )

        const isDimensionsValid = (
            typeof entity.dimensions?.width === 'number' &&
            typeof entity.dimensions?.height === 'number' &&
            entity.dimensions.width > 0 &&
            entity.dimensions.height > 0
        )

        return hasRequiredFields && isTypeValid && isPositionValid && isDimensionsValid
      }
    }
  }
}
</script>
