<template>
    <section
        :class="[$style.serviceFeatureWrapper, isWithGray && $style.withGray]"
        class="sectionWrapper"
    >
        <VContainer>
            <VRow :class="$style.serviceFeatureRow"
                  justify="center"
                  no-gutters
            >
                <VCol :class="$style.serviceFeatureTextWrapper"
                      cols="12"
                      md="6"
                >
                    <h2 :class="$style.serviceFeatureHeader">
                        {{ header }}
                    </h2>
                    <div :class="$style.serviceFeatureContent" v-html="content" />
                    <div :class="$style.buttonWrapper">
                        <VBtn :class="$style.button"
                              :to="slug"
                              outlined
                              color="accent"
                              light
                        >
                            Подробнее
                        </VBtn>
                        <VBtn
                            :class="$style.button"
                            outlined
                            light
                            @click="handleOffer(name)"
                        >
                            Заказать
                        </VBtn>
                    </div>
                </VCol>
                <VCol
                    v-if="imgUrl"
                    :class="$style.serviceFeatureImgWrapper"
                    cols="12"
                    md="6"
                >
                    <service-image
                        :class="$style.serviceFeatureImg"
                        :img-url="imgUrl"
                        :alt="name"
                    />
                </VCol>
            </VRow>
        </VContainer>
    </section>
</template>

<script>
export default {
    name: 'ServiceFeature',
    props: {
        isWithGray: {
            type: Boolean,
            default: false,
        },
        imgUrl: {
            type: String,
            default: null,
        },
        header: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        slug: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
    },
    methods: {
        handleOffer(name) {
            this.$store.dispatch('showDialog', {
                isShow: true,
                name,
            });
        },
    },
};
</script>
<style lang="scss" module>
    .serviceFeatureWrapper {
        background-color: white;

        &.withGray {
            &:nth-child(odd) {
                background-color: $gray;
            }
        }

        &:nth-child(odd) {
            .serviceFeatureRow {
                flex-direction: row-reverse;
            }
        }

        .serviceFeatureRow {
            .serviceFeatureImgWrapper {
                display: flex;
                align-items: center;
                padding: 12px;

                .serviceFeatureImg {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    border-radius: 3px;
                    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);

                    @include sm {
                        width: 65%;
                        max-width: 65%;
                    }

                    @include md {
                        width: 100%;
                        max-width: 100%;
                    }
                }
            }

            .serviceFeatureTextWrapper {
                display: flex;
                justify-content: center;
                margin-bottom: 40px;
                padding: 12px;
                color: #18191f;
                flex-direction: column;

                @include md {
                    margin-top: auto;
                    margin-bottom: auto;
                }

                .buttonWrapper {
                    display: flex;
                    flex-wrap: wrap;

                    @include sm {
                        flex-wrap: nowrap;

                        .button + .button {
                            margin-left: 10px;
                        }
                    }

                    .button {
                        flex: 1 1 100%;
                        margin-bottom: 12px;

                        @include sm {
                            flex: 0 0 165px;
                        }
                    }
                }

                .serviceFeatureHeader {
                    margin-bottom: 24px;
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 125%;

                    @include sm {
                        font-size: 28px;
                    }
                }

                .serviceFeatureContent {
                    margin-bottom: 35px;
                    font-weight: 300;
                    line-height: 150%;

                    & ::v-deep p:last-of-type {
                        margin-bottom: 0;
                    }
                }
            }

            @include md {
                .serviceFeatureImgWrapper {
                    padding-left: 8.33333%;
                }
            }
        }

        @include md {
            &:nth-child(odd) {
                .serviceFeatureRow {
                    .serviceFeatureImgWrapper {
                        padding-right: 8.33333%;
                        padding-left: 12px;
                    }
                }
            }
        }
    }
</style>
