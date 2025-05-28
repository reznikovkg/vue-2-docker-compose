<template>
    <transition name="modal-fade">
        <div class="modal" v-if="shown" @click="close">
            <div class="modal-content" @click.stop>
                <div style="padding: 20px">
                    <slot></slot>
                </div>

                <div
                    v-if="buttons.length > 0"
                    class="modal-bottom"
                >
                    <button
                        v-for="(button, index) in buttons"
                        :title="showTitle(index)"
                        @click="response(index)"
                    >
                        {{ button }}
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {
            resolvePromise: null,
        };
    },
    mounted() {
        window.addEventListener("keydown", event => {
            if (event.key == "Escape") {
                this.close();
            }

            if (this.show && event.key == "Enter") {
                // Confirm
                this.response(0);
            }
        });
    },
    props: {
        buttons: {
            type: Array,
            default: ["Ok"]
        },
        shown: {
            type: Boolean,
            required: true
        },
    },
    emits: ["response", "close", "open"],
    methods: {
        showTitle(index) {
            switch (index) {
                case 0:
                    return "Hotkey: [Enter]"
                case 1:
                    return "Hotkey: [Escape]"
            }
        },

        close() {
            this.$emit("close");
        },


        response(index) {
            this.$emit("response", index);
            this.close();
            if (this.resolvePromise) {
                this.resolvePromise(index);
            }
        }
    },
};
</script>

<style scoped>

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    z-index: 1000;
    display: flex;
    place-items: center;
    transition: opacity 0.2s ease-in-out;
}

.modal-bottom {
    display: flex;
    gap: 10px;
    position: sticky;
    bottom: 0;
    background-color: var(--background3);
}

.modal-bottom button {
    padding: 10px 15px;
    width: 100%;
    height: 3em;
}

.modal-content {
    max-width: 95vw;
    max-height: 100vh;
    margin: 20px auto;
    background-color: var(--background);
    overflow-y: auto;
}

.close-button {
    width: 18px;
    height: 18px;
    background-color: transparent;
    padding: 2px;
    text-align: center;
    margin: 4px 4px 4px auto;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.2s ease;
    transform: scale(1.0, 1.0);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
    transform: scale(1.0, 0.97);
}
</style>
