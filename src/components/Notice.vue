<script>
export default {
    name: "Notice",
    data() {
        return {
            text: "",
        }
    },
    methods: {
        show(text) {
            this.text = text;
            setTimeout(() => {
                this.text = "";
            }, 5000);
        }
    }
}
</script>

<template>
    <Transition>
        <h1 class="notice" v-if="text">{{ text }}</h1>
    </Transition>
</template>

<style scoped>
.notice {
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    z-index: 8;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>