<template>
    <section :class="$style.benefitsWrapper">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 class="mb-10 pageHeader">Наши преимущества</h2>
                </v-col>
            </v-row>
            <v-row class="justify-center" no-gutters>
                <v-col
                    v-for="(benefit, i) in items"
                    :key="`benefit-${i}`"
                    :class="$style.benefitItem"
                    class="pa-3"
                    cols="12"
                    sm="10"
                    md="6"
                >
                    <div :class="$style.benefitsImageWrapper">
                        <v-img
                            :class="$style.benefitsImage"
                            :src="
                                benefit.icon
                                    ? $config.imageBaseUrl + benefit.icon.url
                                    : '/no-camera.svg'
                            "
                            :alt="benefit.header"
                            contain
                        />
                    </div>
                    <div :class="$style.benefitsTextWrapper">
                        <h3 :class="$style.benefitsHeader">{{ benefit.header }}</h3>
                        <div :class="$style.benefitsText">{{ benefit.content }}</div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>
<style lang="scss" scoped module>
    .benefitsWrapper {
        color: #18191f;

        .benefitItem {
            display: flex;
            margin-bottom: 12px;

            &:last-child {
                margin-bottom: -12px;
            }

            &:hover {
                .benefitsImageWrapper {
                    background-color: $black;

                    &:before {
                        --size: -5px;

                        top: var(--size);
                        right: var(--size);
                        bottom: var(--size);
                        left: var(--size);
                        border-color: $black;
                        border-width: 2px;

                        @include sm {
                            --size: -8px;

                            border-width: 3.5px;
                        }
                    }

                    .benefitsImage {
                        filter: invert(1);
                    }
                }
            }

            .benefitsImageWrapper {
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                min-width: 60px;
                height: 60px;
                margin-right: 10px;
                border-radius: 50%;
                background-color: var(--content-color, #ececec);
                transform: perspective(1px) translateZ(0);
                transition: .3s ease all;
                box-shadow: 0 0 1px rgba(0, 0, 0, 0);

                @include sm {
                    width: 72px;
                    min-width: 72px;
                    height: 72px;
                    margin-right: 24px;
                }

                &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    border-radius: 50%;
                    border: #e1e1e1 solid 1px;
                    // -webkit-transition-duration: 0.3s;
                    // transition-duration: 0.3s;
                    // // -webkit-transition-property: top, right, bottom, left;
                    // transition-property: all;
                    transition: .3s ease all;
                }

                .benefitsImage {
                    width: 32px;
                    height: 32px;
                    transition: .2s ease;

                    @include sm {
                        width: 44px;
                        height: 44px;
                    }
                }
            }

            .benefitsTextWrapper {
                .benefitsHeader {
                    margin-bottom: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 125%;
                    word-break: break-word;

                    @include sm {
                        font-size: 18px;
                    }

                    @include md {
                        margin-bottom: 12px;
                        font-size: 20px;
                    }
                }

                .benefitsText {
                    font-size: 12px;
                    font-weight: normal;
                    font-weight: 300;

                    @include sm {
                        font-size: 14px;
                    }
                    // @include md {
                    //   font-size: 1rem;
                    // }
                }
            }
        }
    }
</style>
<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
