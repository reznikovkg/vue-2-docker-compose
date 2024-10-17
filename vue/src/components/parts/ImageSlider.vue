<template>
    <div class="image-slider">
        <div class="image-slider__images-cnt">
            <div class="image-slider__image-cnt" v-for="(image, index) in images" :key="index"
                @click="() => handleImageClick(index)">
                <img class="image-slider__image" :src="image.url" alt="" />
            </div>
        </div>
        <div class="image-slider__chosen-image-cnt">
            <img class="image-slider__chosen-image" :src="getCurrentImageUrl" alt="" />
        </div>
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
        getCurrentImageUrl() {
            return this.images[this.currentActive].url
        }
    },
    methods: {
        handleImageClick(index) {
            this.currentActive = index
        },
    }
}
</script>

<style scoped lang="less">
.image-slider {
    display: flex;
    width: 100%;
    height: calc(100% - 11%);

    &__images-cnt {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        padding-right: 16px;
        width: 11%;
        box-sizing: content-box;

        scroll-snap-type: y mandatory;
        gap: 5%;

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
        background-color: @cBaseWhite;
        filter: drop-shadow(3px 3px 3px #00000030);
        border-radius: 4px;

        height: 16%;
    }

    &__image {
        max-width: 100%;
        max-height: 100%;

        background-color: @cBaseWhite;
    }

    &__chosen-image-cnt {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: @cBaseWhite;
        filter: drop-shadow(3px 3px 3px #00000030);

        width: calc(100% - 11% - 16px);
        height: 100%;
    }

    &__chosen-image {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>