import GameObject from './GameObject'

export default {
    mixins: [GameObject],
    props: {
        health: {
            type: Number,
            default: 1
        },
        direction: {
            type: Number,
            default: 0
        },
        bulletSize: {
            type: Number,
            default: 4
        }
    },
    methods: {
        takeDamage(amount = 1) {
            this.$emit('take-damage', amount)
        },
        fire() {
            this.$emit('fire', {
                position: {
                    x: this.position.x + this.size / 2 - this.bulletSize / 2,
                    y: this.position.y
                },
                isEnemy: this.isEnemy
            })
        }
    }
}