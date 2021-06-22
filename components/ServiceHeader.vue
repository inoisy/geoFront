<template>
    <section
        :class="$style.firstSection"
        :style="`background-image: url(${require('~/assets/bg.jpg')})`"
    >
        <v-container
            :class="[$style.firstSectionInner, noIcon && 'noIcon']"
            fill-height
        >
            <breadcrumbs :items="breadcrumbs" :class="$style.breadcrumbs" />

            <div :class="$style.textWrapper">
                <h1
                    :class="[$style.header, header.length > 50 && $style.longHeader]"
                    class="mb-6"
                >
                    {{ header }}
                </h1>
                <div
                    v-if="subheader"
                    :class="$style.subheader"
                    class="mb-10"
                    v-html="subheader"
                >
                </div>
                <div v-if="price" :class="$style.price">{{ price }}</div>
                <v-btn
                    :class="$style.button"
                    class="callToActionButton mb-0"
                    outlined
                    dark
                    title="Заказать работы"
                    @click="handleOffer"
                >
                    Заказать работы
                </v-btn>
                <div v-if="icon && icon.url" :class="$style.iconWrapper">
                    <img
                        :class="$style.icon"
                        :src="imageBaseUrl + icon.url"
                        :alt="header"
                        :title="header"
                    />
                </div>
            </div>
        </v-container>
    </section>
</template>
<script>
import Breadcrumbs from '~/components/Breadcrumbs.vue';

export default {
    components: {
        Breadcrumbs,
    },
    props: {
        breadcrumbs: {
            type: Array,
            default: () => ([]),
        },
        header: {
            type: String,
            default: null,
        },
        subheader: {
            type: String,
            default: null,
        },
        icon: {
            type: Object,
            default: () => ({}),
        },
        price: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            imageBaseUrl: this.$config.imageBaseUrl,
        };
    },
    computed: {
        noIcon() {
            return !(this.icon && this.icon.url);
        },
    },
    methods: {
        handleOffer() {
            this.$store.dispatch('showDialog', {
                name: this.header,
                isShow: true,
            });
            return true;
        },
    },
};
</script>

<style lang="scss" module>
    .noIcon {
        .textWrapper {
            max-width: 100% !important;
        }
    }

    .firstSection {
        overflow-x: hidden;
        min-height: 370px;
        background-color: #161616;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        color: $white;

        .breadcrumbs {
            width: 100%;
            margin-bottom: 20px;
            padding: 12px;

            @include sm {
                margin-bottom: 32px;
            }
        }

        .firstSectionInner {
            position: relative;
            height: 100%;
            min-height: inherit;
            padding-top: 25px;
            padding-bottom: 65px;

            @include md {
                padding-top: 35px;
                padding-bottom: 85px;
            }

            .textWrapper {
                width: 100%;
                max-width: 100%;
                padding: 12px;

                .header {
                    font-size: 28px;
                    font-weight: 600;
                    line-height: 125%;

                    @include sm {
                        font-size: 32px;
                    }

                    @include md {
                        font-size: 2.5rem;
                    }
                }

                .longHeader {
                    font-size: 22px;

                    @include sm {
                        font-size: 26px;
                    }

                    @include md {
                        font-size: 32px;
                    }
                }

                .header + .button {
                    margin-top: 2rem !important;
                }

                .subheader ~ .iconWrapper {
                    margin-top: -40px;

                    @include sm {
                        margin-top: -50px;
                    }
                }

                .price {
                    margin-bottom: 25px;
                    font-size: 2rem;
                    font-weight: bold;
                    color: rgba($white, .87);
                }

                .subheader {
                    & ~ .price {
                        margin-top: -20px;
                    }

                    font-size: 14px;
                    line-height: 150%;
                    color: $white !important;

                    ::v-deep p {
                        color: $white !important;
                    }

                    ::v-deep span {
                        color: $white !important;
                    }

                    ::v-deep p:only-child {
                        width: 100%;
                    }

                    ::v-deep p:last-child {
                        margin-right: 75px;
                    }

                    @include sm {
                        font-size: 16px;

                        ::v-deep p:last-child {
                            margin-right: 90px;
                        }
                    }

                    @include md {
                        ::v-deep p:last-child {
                            margin-right: unset;
                        }
                    }

                    @include lg {
                        font-size: 18px;
                    }
                }

                @include md {
                    max-width: 70%;
                }

                @include lg {
                    max-width: 60%;
                }
            }

            .iconWrapper {
                float: right;
                width: 75px;
                height: 75px;
                margin-top: -15px;
                margin-bottom: -25px;
                margin-left: 5px;

                @include sm {
                    width: 90px;
                    height: 90px;
                    margin-top: -20px;
                    margin-bottom: -35px;
                }

                @include md {
                    position: absolute;
                    top: 50%;
                    right: 24px;
                    width: 230px;
                    height: 230px;
                    margin-top: unset !important;
                    margin-bottom: unset !important;
                    margin-left: 24px;
                    transform: translateY(-50%);
                }

                @include lg {
                    width: 270px;
                    height: 270px;
                }

                .icon {
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    opacity: .3;
                    filter: invert(100%);
                }
            }
        }
    }
</style>
