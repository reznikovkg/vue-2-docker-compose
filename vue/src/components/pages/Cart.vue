<template>
    <PageLayout>
        <section class="p-16">
            <h1> Корзина </h1>
            
            <div class="cart">
                <div class="cart__item"> 
                    <CartItem v-for="(item, index) in getCart" 
                        :key="index" 
                        :item=item
                        @changeCount="(value) => onChangeCount(item, value)"
                    />
                </div>

                <div class="cart__information">
                    <p> Общая сумма заказа {{ calculatingAmount }}  </p>
                    <p> Количество товаров {{ calculatingCount }}  </p>
                    <button @click="removeAllItemsFromCart"> Удалить все </button>
                </div>
                
            </div>
            
        </section>
    </PageLayout>
</template>

<script>
import PageLayout from '../parts/PageLayout.vue';
import CartItem from '../parts/CartItem.vue';
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
            "count": "5",
            "selectCount": "2",
            "options": [
                {
                    "title": "sizes",
                    "value": "S",
                }
            ]
        })
    },
    methods: {
        ...mapMutations("cart", ["addItemToCart", "removeAllItemsFromCart"]),
        onChangeCount(item, value) { 
            const count = Number(item.selectCount) + Number(value);
            if (count <= item.count && count > 0) {
                item.selectCount = count;
            }
        },
    },
    computed: {
        ...mapGetters("cart", ["getCart"]),
        calculatingAmount() {
            const products = this.getCart
            return products.reduce((sum, product) => sum + Number(product.price.currentPrice * product.selectCount), 0)
        },
        calculatingCount() {
            const products = this.getCart;
            return products.length
        }
    },
    components: {
        PageLayout,
        CartItem,
    }
}
</script>

<style scoped lang="less">
.cart{
    display: flex;
    flex-direction: row;

    &__item {
        height: 100%;
        width: 70%;
    }

    &__information {
        display: flex;
        flex-direction: column;
    }
}
</style>