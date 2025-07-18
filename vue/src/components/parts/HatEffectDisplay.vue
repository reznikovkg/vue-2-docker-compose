<template>
    <div class="hat__effect__display">
        <img :src="iconSrc" class="hat__effect__icon"> x <p class="hat__effect" :class="valueDisplayClass">{{ value }}</p>
    </div>
</template>

<script>
export default {
    name: 'HatEffectDisplay',
    props: {
        iconSrc: String,
        value: Number
    },
    computed: {
        valueDisplayClass () {
            if (this.value > 1) {
                return 'hat__effect__positive';
            }
            else if (this.value < 1) {
                return 'hat__effect__negative';
            }
            else return '';
        }
    }
}
</script>

<style scoped lang="less">
.hat {
    &__effect {
        font-size: @sFontBigger;
        margin: 0px;

        &__display {
            display: flex;
            align-items: center;
        }

        &__negative {
            color: @cBad;
        }

        &__positive {
            color: @cGood;
        }

        &__icon {
            height: 20px;
            width: 20px;
        }
    }
}
</style>