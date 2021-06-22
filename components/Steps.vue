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
      .stepImageInner {
        position: relative;
        &:before {
          content: "";
          display: block;
          position: absolute;
          transition: 0.3s ease-in-out;
          transform-origin: center;
          width: $icon-size + $icon-padding * 2;
          height: $icon-size + $icon-padding * 2;
          top: 50%;
          left: 50%;
          background-color: $white;
          opacity: 0;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
        }
      }
    }
    &:hover {
      .stepImageWrapper {
        .stepImageInner {
          &:before {
            // background-color: $black;
            opacity: 1;
            z-index: 1;
          }
          // .stepImage {
          //   filter: invert(1);
          // }
        }
      }
    }

    margin-bottom: 50px;
    align-items: center;
    display: flex;
    flex-direction: column;
    &:first-child .stepPath {
      display: none;
    }
    &:last-child {
      margin-bottom: 0px;
    }
    .stepsHeader {
      font-weight: 600;
      font-size: 18px;
    }
    .stepsText {
      font-size: 14px;
      font-weight: 300;
      @include lg {
        font-size: 16px;
      }
    }
    .stepImageWrapper {
      display: flex;
      width: 100%;
      justify-content: center;
      .stepImage {
        transition: all 0.2s ease-in-out;
        width: 53px;
        min-height: 53px;
      }
    }
    .stepPath {
      position: absolute;
      transform: translate(-30px, -57px) rotate(95deg);
      width: 70px;
      min-width: 70px;
      height: 25px;
      min-height: 25px;
    }

    &:nth-child(even) .stepPath {
      transform: translate(0px, -57px) rotate(-82deg);
    }
  }

  @include md {
    .steps {
      .stepsHeader {
        font-weight: bold;
        font-size: 20px;
      }
      align-items: flex-start;
      margin-bottom: 0px;
      .stepImageWrapper {
        justify-content: space-between;
      }
      .stepPath {
        position: relative;
        transform: translate(0, 0) rotate(0);
        margin-left: 24px;
        width: calc(100% - 80px);
        min-width: unset;
        height: 53px;
        min-height: 53px;
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
