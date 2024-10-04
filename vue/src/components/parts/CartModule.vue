<template>
    <div>
        <div class = "item-in-cart">
            <img class="image" :src="getImage"/> 
            <div class ="name"> {{item.name}} </div>
            <div class ="brand"> {{item.brand}} </div>  
            <div class ="prices"> {{item.price.currentPrice}} </div> 
            <div class ="count">  {{item.count}} </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CartModule",
        props:{
            item: Object,
        },
            
        computed: {

            getImage() {
                return this.item.images.find((image) => image.type === "main").url
            }
        }
    }
</script>

<style>

</style>