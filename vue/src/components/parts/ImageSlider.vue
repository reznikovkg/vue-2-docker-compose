<template>
    <div class="image-slider">
        <div class="image-slider__images" ref="scroll">
            <div class="image-slider__image-cnt" v-for="(image) in images" :key="image.url">
                <img class="image-slider__image" :src="image.url" alt="" />
            </div>
        </div>
        <div class="image-slider__prev-btn" v-show="isPrevAvailable" @click="handlePrevClick"></div>
        <div class="image-slider__next-btn" v-show="isNextAvailable" @click="handleNextClick"></div>
    </div>
</template>

<script>
export default {
    name: 'ImageSlider',
    props: {
        images: []
    },
    data() {
        return {
            currentActive: 0,
        }
    },
    computed: {
        isPrevAvailable() {
            return this.currentActive !== 0
        },
        isNextAvailable() {
            return this.currentActive !== this.images.length - 1
        }
    },
    methods: {
        handlePrevClick() {
            if (this.isPrevAvailable) {
                this.currentActive--
                this.$refs.scroll.childNodes[this.currentActive].scrollIntoView({ behavior: 'smooth' })
            }
        },
        handleNextClick() {
            if (this.isNextAvailable) {
                this.currentActive++
                this.$refs.scroll.childNodes[this.currentActive].scrollIntoView({ behavior: 'smooth' })
            }
        },
    }
}
</script>

<style scoped lang="less">
.image-slider {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid @cBaseThree;
    border-radius: 5%;

    &__next-btn,
    &__prev-btn {
        position: absolute;
        top: 0px;
        width: 50%;
        height: 100%;

        &:hover {
            background-color: @cBaseSeven;
            opacity: 0.1;
        }
    }

    &__next-btn {
        border-radius: 0 5% 5% 0;
        right: 0px;
    }

    &__prev-btn {
        border-radius: 5% 0 0 5%;
        left: 0px;
    }

    &__images {
        display: flex;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        width: 100%;
        height: 100%;
        border-radius: 5%;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    &__image-cnt {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        scroll-snap-align: center;
        background-color: @cBaseSeven;

        height: 100%;
        width: 100%;
    }

    &__image {
        max-width: 100%;
        max-height: 100%;

        background-color: @cBaseEight;
        border-radius: 5%;
    }
}
</style>