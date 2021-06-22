<template>
    <div :class="$style.floatingButtonWrapper">
        <v-btn
            :class="$style.floatingButton"
            color="black"
            dark
            fab
            large
            title="Обратный звонок"
            @click="handleOffer"
        >
            <svg-icon name="order" />
        </v-btn>
    </div>
</template>
<script>
export default {


    methods: {
        handleOffer() {
            this.$store.dispatch('showDialog', {
                name: '',
                isShow: true,
            });
            return true;
        },
    },
};
</script>
<style lang="scss" module>
    .floatingButtonWrapper {
        position: fixed;
        right: 16px;
        bottom: 16px;
        border-radius: 50%;
        animation: pulse-black infinite 2s linear;

        .floatingButton {
            width: 64px;
            height: 64px;
            border: thin solid rgba($white, .7) !important;
            transform: perspective(1px) translateZ(0);
            animation: pulse-white infinite 2s linear;
        }
    }

    @keyframes pulse-white {
        0% {
            box-shadow: 0 0 0 0 rgba($white, .7);
        }

        50% {
            box-shadow: 0 0 0 5px rgba($white, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba($white, 0);
        }
    }

    @keyframes pulse-black {
        0% {
            box-shadow: 0 0 0 0 rgba($black, .7);
        }

        50% {
            box-shadow: 0 0 0 11px rgba($black, 0);
        }

        100% {
            box-shadow: 0 0 0 0 rgba($black, 0);
        }
    }
</style>
