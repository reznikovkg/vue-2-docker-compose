<template>
    <div>
        <tr class="item-in-cart">
            <td> <img class="image" :src="getImage" /> </td>

            <td>
                <div class="name"> {{ item.name }} </div>
            </td>

            <td>
                <div class="brand"> {{ item.brand }} </div>
            </td>

            <td>
                <div class="prices"> {{ item.price.currentPrice }} </div>
            </td>

            <td> <button @click="() => removeItemFromCart(item)"> удалить </button></td>
        </tr>
    </div>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
    name: "CartModule",
    props: {
        item: Object,
    },

    methods: {
        ...mapMutations("cart", ["removeItemFromCart"])
    },

    computed: {
        getImage() {
            return this.item.images.find((image) => image.type === "main").url
        }
    }
}
</script>

<style>
.image {
    width: 30%;
}
</style>