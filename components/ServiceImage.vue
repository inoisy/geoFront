<template>
    <v-img
        :src="imgUrl"
        :alt="alt"
        :title="alt"
        aspect-ratio="1.555"
        max-height="400px"
        gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
        transition="none"
    >
        <template #placeholder>
            <v-row class="fill-height ma-0"
                   align="center"
                   justify="center"
            >
                <v-progress-circular indeterminate color="accent"></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>
<script>
export default {
    props: {
        imgUrl: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    },
};
</script>
<style lang="scss">
    .xxx-enter-active {
        transition: opacity 3s ease-in-out;
    }

    .xxx-leave-active {
        transition: none;
    }

    .xxx-enter,
    .xxx-leave,
    .xxx-leave-to {
        opacity: 0;
    }

    .xxx-enter-to {
        opacity: 1;
    }

    .dialog-enter,
    .dialog-leave-to {
        opacity: 0;
        // .modal-mask {
        //   opacity: 0;
        // }
        // .modal-inner {
        transform: scale(.5);
        transition: opacity 3s ease-in-out;
        // }
    }

    .dialog-enter-to,
    .dialog-leave {
        opacity: 1;
        // .modal-mask {
        //   opacity: 1;
        // }
        // .modal-inner {
        transform: scale(1);
        transition: opacity 3s ease-in-out;
        // }
    }
</style>
