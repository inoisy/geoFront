<template>
    <v-dialog
        v-model="isShow"
        :scrollable="false"
        :max-width="`calc(var(--dialog-img-max-height) * ${1 / aspectRatio})`"
    >
        <v-card :class="$style.imageDialogInner" dark>
            <div class="pos-relative">
                <div :style="`padding-top: ${aspectRatio * 100}%`" />
                <v-img
                    :class="$style.dialogImg"
                    :src="imgUrl"
                    :alt="alt"
                    cover
                    @load="$emit('loaded')"
                    @error="$emit('loaded')"
                >
                    <template #placeholder>
                        <div class="fill-height row align-center justify-center ma-auto">
                            <v-progress-circular indeterminate color="accent" />
                        </div>
                    </template>
                </v-img>
                <div :class="$style.buttonWrapper">
                    <v-btn :class="$style.button"
                           fab
                           @click="isShow = false"
                    >
                        <svg-icon name="close" />
                    </v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
        imgWidth: {
            type: Number,
            required: true,
        },
        imgHeight: {
            type: Number,
            required: true,
        },
    },


    computed: {
        aspectRatio() {
            return this.imgHeight / this.imgWidth;
        },
        isShow: {
            get() {
                return this.show;
            },
            set(val) {
                if (!val) {
                    this.$emit('close');
                }
            },
        },
    },
};
</script>
<style lang="scss" >
    .pos-relative {
        position: relative;
    }

    :root {
        --dialog-margin: 20px;
        --dialog-max-height:
            calc(
                100vh - var(--toolbar-height) - var(--dialog-margin) * 2
            );
        --fab-button-size: 44px;
        --dialog-img-padding: 12px;
        --dialog-img-max-height:
            calc(
                var(--dialog-max-height) - var(--dialog-img-padding) * 2
            );

        @include md {
            --dialog-margin: 40px;
            --dialog-img-padding: 24px;
            --fab-button-size: 48px;
        }
    }
</style>
<style lang="scss" module>
    .imageDialogInner {
        position: relative;
        overflow: hidden;
        height: inherit;
        max-height: inherit;
        padding: var(--dialog-img-padding);

        .dialogImg {
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            border-radius: 4px;
            transform: translateZ(0) perspective(1px);
        }

        .buttonWrapper {
            position: absolute;
            top: var(--dialog-img-padding);
            right: var(--dialog-img-padding);
            z-index: 10;

            .button {
                width: var(--fab-button-size) !important;
                height: var(--fab-button-size) !important;
                border: thin solid $white;
            }
        }
    }
</style>
