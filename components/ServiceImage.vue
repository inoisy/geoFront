<template>
    <VImg
        :src="imgUrl"
        :alt="alt"
        :title="alt"
        aspect-ratio="1.555"
        max-height="400px"
        gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
        transition="none"
    >
        <template #placeholder>
            <VRow class="fill-height ma-0"
                  align="center"
                  justify="center"
            >
                <VProgressCircular indeterminate color="accent"></VProgressCircular>
            </VRow>
        </template>
    </VImg>
</template>
<script>
export default {
    name: 'ServiceImage',
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
    .dialog-enter,
    .dialog-leave-to {
        opacity: 0;
        transform: scale(.5);
        transition: opacity 3s ease-in-out;
    }

    .dialog-enter-to,
    .dialog-leave {
        opacity: 1;
        transform: scale(1);
        transition: opacity 3s ease-in-out;
    }
</style>
