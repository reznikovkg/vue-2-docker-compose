<template>
    <div ref="float" class="float" v-if="isCast">
        <img ref="float-inner" src="../assets/floats/float2.png" :style="animatedSinkLevel">
    </div>

    <div class="rod" ref="rod" :class="{ 'cast': isCast }">
        <img src="../assets/rod.png">
    </div>
</template>
<script>

export default {
    name: 'Rod',
    data() {
        return {
            floatPositionX: 0,
            floatPositionY: 0,
            rodPositionX: 0,
            rodPositionY: 0,
            animationIntervalId: 0,
        }
    },

    props: {
        isCast: Boolean,
        sinkLevel: {
            type: Number,
            default: 0,
        },
        floatIntensity: {
            type: Number,
            default: 0,
        },
        floatWaveIntensity: {
            type: Number,
            default: 1
        },
        waterRect: {
            type: Object,
            required: true
        }
    },

    computed: {
        floatPositionPercentX() {
            return (this.floatPositionX / this.waterRect.width) * 100;
        },

        floatPositionPercentY() {
            return (this.floatPositionY / this.waterRect.height) * 100;
        },

        animatedSinkLevel() {
            const randValue = Math.random() * 2 - 1;

            const sinkY = this.sinkLevel + randValue;
            return `transform: translateY(${sinkY}px)`;
        }
    },

    methods: {
        setFloatPosition(x, y) {
            const rod = this.$refs.rod;
            const float = this.$refs.float;

            rod.style.left = `${(x / this.waterRect.width) * 100}%`;

            this.floatPositionX = x;
            this.floatPositionY = this.waterRect.height - 100;

            const rect = rod.getBoundingClientRect();
            this.rodPositionX = rect.left;
            this.rodPositionY = rect.top;



            setTimeout(() => {
                this.floatPositionX = x;
                this.floatPositionY = y;
                float.style.opacity = 1;
                this.updateStyles(this.floatPositionPercentX, this.floatPositionPercentY);
            }, 300);
        },

        updateStyles(x, y) {
            const float = this.$refs.float;

            if (!float) {
                return;
            }

            float.style.left = `${x}%`;
            float.style.top = `${y.clamp(0, 40)}%`;

            const minScale = 0.6;
            const maxScale = 1;

            const scale = minScale + (y / 100) * (maxScale - minScale);
            float.style.width = `${32*scale}px`;
        }
    },

    beforeUnmount() {
        clearInterval(this.animationIntervalId);
    },

    mounted() {
        // animation
        this.animationIntervalId = setInterval(() => {
            const float = this.$refs.float;
            const randValue = Math.random() * 2 - 1;

            if (float) {
                this.updateStyles(this.floatPositionPercentX, 
                                  this.floatPositionPercentY + (Math.random() * this.floatIntensity) + (this.floatWaveIntensity * randValue));
            }
        }, 100);
    }
}
</script>
<style scoped>

@keyframes cast {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(10deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

.cast {
    animation: cast 500ms ease-in-out;
}

.rod {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transition: left 200ms;
}

.rod img {
    image-rendering: pixelated;
    height: 200px;
}

.float {
    position: absolute;
    image-rendering: pixelated;
    width: 32px;
    height: 32px;
    bottom: 80px;
    transition: left 200ms, top 1s, opacity 1s;
    overflow-y: hidden;
    opacity: 0;
    z-index: 1;
}

.float img {
    width: 100%;
}
</style>
