<template>
    <section :class="$style.stepsWrapper">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 class="mb-10 text-center text-md-left pageHeader">Этапы работ</h2>
                </v-col>
            </v-row>

            <v-row class="justify-center">
                <v-col
                    v-for="(step, i) in items"
                    :key="`step${i}`"
                    :class="$style.steps"
                    cols="10"
                    md="3"
                >
                    <div :class="$style.stepImageWrapper" class="mb-6">
                        <div :class="$style.stepImageInner">
                            <v-img
                                v-if="step.icon"
                                :class="$style.stepImage"
                                :src="$config.imageBaseUrl + step.icon.url"
                                :alt="step.header"
                                width="53px"
                                max-width="53px"
                                contain
                            />
                        </div>

                        <svg-icon :class="$style.stepPath" name="path" />
                    </div>

                    <h3 :class="$style.stepsHeader" class="mb-2">
                        {{ step.header }}
                    </h3>
                    <div :class="$style.stepsText" class="mb-3 text-center text-md-left">
                        {{ step.content }}
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

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
<style lang="scss" scoped module>
    @function strip-unit($number) {
        @if type-of($number) == "number" and not unitless($number) {
            @return $number / ($number * 0 + 1);
        }

        @return $number;
    }

    .stepsWrapper {
        $icon-size: 70px;
        $icon-padding: 10px;
        // background-color: #ececec;
        // color: #18191f;
        .steps {
            .stepImageWrapper {
                display: flex;
                justify-content: center;
                width: 100%;

                .stepImage {
                    width: 53px;
                    min-height: 53px;
                    transition: all .2s ease-in-out;
                }

                .stepImageInner {
                    position: relative;

                    &:before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        display: block;
                        width: $icon-size + $icon-padding * 2;
                        height: $icon-size + $icon-padding * 2;
                        border-radius: 50%;
                        background-color: $white;
                        opacity: 0;
                        transform: translate(-50%, -50%);
                        transform-origin: center;
                        transition: .3s ease-in-out;
                        mix-blend-mode: difference;
                    }
                }
            }

            &:hover {
                .stepImageWrapper {
                    .stepImageInner {
                        &:before {
                            z-index: 1;
                            // background-color: $black;
                            opacity: 1;
                        }
                        // .stepImage {
                        //   filter: invert(1);
                        // }
                    }
                }
            }

            display: flex;
            align-items: center;
            margin-bottom: 50px;
            flex-direction: column;

            &:first-child .stepPath {
                display: none;
            }

            &:last-child {
                margin-bottom: 0;
            }

            .stepsHeader {
                font-size: 18px;
                font-weight: 600;
            }

            .stepsText {
                font-size: 14px;
                font-weight: 300;

                @include lg {
                    font-size: 16px;
                }
            }

            .stepPath {
                position: absolute;
                width: 70px;
                min-width: 70px;
                height: 25px;
                min-height: 25px;
                transform: translate(-30px, -57px) rotate(95deg);
            }

            &:nth-child(even) .stepPath {
                transform: translate(0, -57px) rotate(-82deg);
            }
        }

        @include md {
            .steps {
                .stepsHeader {
                    font-size: 20px;
                    font-weight: bold;
                }

                align-items: flex-start;
                margin-bottom: 0;

                .stepImageWrapper {
                    justify-content: space-between;
                }

                .stepPath {
                    position: relative;
                    width: calc(100% - 80px);
                    min-width: unset;
                    height: 53px;
                    min-height: 53px;
                    margin-left: 24px;
                    transform: translate(0, 0) rotate(0);
                }

                &:first-child .stepPath {
                    display: block;
                }

                &:nth-child(even) .stepPath {
                    transform: translate(0, -22px) rotate(-166deg);
                }

                &:last-child .stepPath {
                    display: none;
                }
            }
        }

        @include lg {
            .steps {
                .stepPath {
                    margin-left: 40px;
                    transform: translate(0, 0) rotate(0) scale(1);
                }

                &:nth-child(even) .stepPath {
                    transform: translate(0, -22px) rotate(-166deg) scale(1);
                }
            }
        }
    }
</style>
