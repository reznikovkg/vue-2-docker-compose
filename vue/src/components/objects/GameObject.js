export default {
    props: {
        position: {
            type: Object,
            required: true,
            default: () => ({ x: 0, y: 0 })
        },
        size: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            default: 1
        },
        color: {
            type: String,
            default: '#ffffff'
        }
    },
    computed: {
        objectStyle() {
            return {
                left: `${this.position.x}px`,
                top: `${this.position.y}px`,
                width: `${this.size}px`,
                height: `${this.size}px`,
                backgroundColor: this.color,
                position: 'absolute'
            }
        }
    },
    methods: {
        checkCollision(other) {
            return (
                this.position.x < other.position.x + other.size &&
                this.position.x + this.size > other.position.x &&
                this.position.y < other.position.y + other.size &&
                this.position.y + this.size > other.position.y
            )
        },
        move(dx = 0, dy = 0) {
            this.$emit('update-position', {
                x: this.position.x + dx,
                y: this.position.y + dy
            })
        }
    }
}