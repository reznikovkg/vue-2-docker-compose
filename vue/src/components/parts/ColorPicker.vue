<template>
    <div class="colorpicker">
        <div ref="colorSelectorRef" class="colorpicker__selector" @click="selectColor($event)" >
            <div class="colorpicker__color">
                <div 
                    class="colorpicker__handle"
                    :style="{'left': handleX + 'px', 'top': handleY + 'px' }"
                > 
                </div>
            </div>
        </div>
        <div ref="colorHueRef" class="colorpicker__hue" @click="selectHue($event)" >
            <div 
                class="colorpicker__hue-handle"
                :style="{'top': hueHandleY + 'px '}"
            > 
            </div>
        </div> 
    </div>
    
</template>

<script>
export default {
    name: "ColorPicker",
    props: {
        format: String
    },
    emits: ['color'],
    data() {
        return {
            hsb: {
                h: 0,
                s: 0,
                b: 0,
            },
            handleX: 0,     
            handleY: 0,
            hueHandleY: 0,
        };
    },
    methods: {
        selectColor (event) {
            this.handleX = event.clientX
            this.handleY = event.clientY

            const rect = this.$refs.colorSelectorRef.getBoundingClientRect();
            let saturation = Math.floor((event.clientX - rect.left) * 100 / 150);
            let brightness = Math.floor(( 150 - (event.clientY - rect.top)) * 100 / 150);
            
            this.hsb = {
                h: this.hsb.h,
                s: saturation,
                b: brightness,
            }
            this.updateColor()
        },
        selectHue (event) {
            const rect = this.$refs.colorHueRef.getBoundingClientRect();
            let hue = Math.floor(360 * (150 - (event.clientY - rect.top)) / 150 )

            this.hsb = {
                h: hue,
                s: this.hsb.s,
                b: this.hsb.b,
            }

            this.hueHandleY = event.clientY

            this.$refs.colorSelectorRef.style.background = '#' + this.HSBtoHEX()
            this.updateColor()
        },
        HSBtoRGB() {
            let s = this.hsb.s / 100;
            let b = this.hsb.b / 100;
            const k = (n) => (n + this.hsb.h / 60) % 6;
            const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
            return { r: Math.round(255 * f(5)), g: Math.round(255 * f(3)), b: Math.round(255 * f(1)) };
        },
        HSBtoHEX() {
            var rgb = this.HSBtoRGB()
            var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
            for (var key in hex) {
                if (hex[key].length === 1) {
                    hex[key] = '0' + hex[key];
                }
            }
            return hex.join('');
        },
        updateColor() {
            let value = null
            switch (this.format) {
                case 'hex':
                    value = this.HSBtoHEX();
                    break;
                case 'rgb':
                    value = this.HSBtoRGB();
                    break;
                default :
                    value = this.hsb;
                    break;
            }
            this.$emit('color', value)
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

    &__hue-handle {
        position: absolute;
        width: 21px;
        margin-inline-start: -4px;
        margin-block-start: -3px;
        height: 5px;
        border-width: 2px;
        border-style: solid;
        opacity: 0.85;
        cursor: pointer;
        border-color: #ccd2db;
    }
}
</style>