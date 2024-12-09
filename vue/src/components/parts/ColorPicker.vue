<template>
    <div class="colorpicker">
        <div class="colorpicker__selector" @click="position" >
            <div class="colorpicker__color">
                <div 
                    class="colorpicker__handle"
                    :style="{'left': mouseX + 'px', 'top': mouseY + 'px' }"
                > 
                </div>
            </div>
        </div>
        
        <div class="colorpicker__hue">
            <div 
                class="colorpicker__hue-handle"
                
            > 
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    name: "ColorPicker",
    data() {
        return {
            mouseX: 0,     
            mouseY: 0,
        };
    },
    methods: {
        position (event) {
            this.mouseX = event.pageX;
            this.mouseY = event.pageY;

        }
    } 
}
</script>
 
<style scoped lang="less">
.colorpicker{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #1f2937;
    border-radius: 7px;
    width: 187px;
    height: 160px;
    
    &__selector {
        width: 150px;
        height: 150px;
        background-color: rgb(255, 0, 0);
    }

    &__color {
        width: 150px;
        height: 150px;
        background: linear-gradient(to top, #000 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    }

    &__handle {
        position: absolute;
        border-radius: 100%;
        width: 10px;
        height: 10px;
        border-width: 1px;
        border-style: solid;
        margin: -5px 0 0 -5px;
        cursor: pointer;
        opacity: 0.85;
    }

    &__hue {
        top: 8px;
        width: 17px;
        height: 150px;
        background: linear-gradient(0deg, red 0, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, red);
    }
}
</style>