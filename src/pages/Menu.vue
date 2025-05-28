<script>
import Backer from "../components/Backer.vue";

export default {
    name: "Menu",
    components: {Backer}
}
</script>

<template>
    <div class="menu-wrapper">
        <div class="menu-container">
            <h1><img src="../assets/floats/float2.png"> Рыбалка</h1>
            <p>Добро пожаловать, рыбак!</p>
            <div class="buttons">
                <router-link to="/locations" class="button">Играть</router-link>
                <router-link to="/shop" class="button">Магазин</router-link>
                <router-link to="/inventory" class="button">Инвентарь</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buttons {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
}

.menu-container {
    margin: 0 auto;
    padding-top: 1em;
    text-align: center;
}

.menu-wrapper {
    background-image: url("../assets/menu.png");
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh
}

h1 img {
    height: 32px;
}
</style>