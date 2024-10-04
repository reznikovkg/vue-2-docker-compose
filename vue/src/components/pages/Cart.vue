<template>
    <PageLayout>
        <section class="p-16">
            <h1> Корзина </h1>
            <p> Общая сумма заказа {{ calculatingAmount }} </p>
            <CartModule v-for="(item, index) in getCart" :key="index" :item=item />

        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import CartModule from '../parts/CartModule.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: 'CartPage',

    mounted() {
        this.addItemToCart({
            "id": "111",
            "name": "Футболка",
            "brand": "Nike",
            "price": {
                "currentPrice": "9000",
                "discount": "10%",
                "originalPrice": "10000"
            },
            "images": [
                {
                    "url": "https://cdn1.ozone.ru/s3/multimedia-r/c600/6855038235.jpg",
                    "type": "main"
                },
                {
                    "url": "https://media.gq.com/photos/5e6944f74d6be70008ac16c2/master/w_2000,h_1333,c_limit/Uniqlo-U-crew-neck-short-sleeve-T-shirt.jpg",
                    "type": "secondary"
                }
            ],
            "count": "2",
            "options": [
                {
                    "title": "sizes",
                    "value": "S",
                }
            ]
        })
    },

    methods: {
        ...mapMutations("cart", ["removeItemToCart", "addItemToCart"])
    },

    computed: {

        ...mapGetters("cart", ["getCart"]),

        calculatingAmount() {
            //console.log(this.getCart)
            const products = this.getCart
            return products.reduce((sum, product) => sum + Number(product.price.currentPrice), 0)
        },
    },
    components: {
        PageLayout,
        CartModule,
    }
}

</script>