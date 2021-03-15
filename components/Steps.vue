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
          <div :class="$style.stepImageWrapper" class="mb-4">
            <v-img
              :class="$style.stepImage"
              :src="
                step.icon
                  ? $config.imageBaseUrl + step.icon.url
                  : '/no-camera.svg'
              "
              :alt="step.header"
              width="53px"
              max-width="53px"
              contain
            />
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
.stepsWrapper {
  // background-color: #ececec;
  // color: #18191f;
  .steps {
    &:hover {
      .stepImageWrapper {
        .stepImage {
          box-shadow: 0 0 10px #ccc;
          // transform: scale(1.1);
          transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);
        }
      }
    }

    // &:nth-child(even)
    margin-bottom: 50px;
    align-items: center;
    // justify-content: center;
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
        width: 53px;
        // max-width: 53px;
        min-height: 53px;
        transform: translateZ(0);
        transition-timing-function: ease-out;
      }
    }
    .stepPath {
      position: absolute;
      // transform: translate(-50px, -65px) rotate(108deg);
      transform: translate(-30px, -57px) rotate(95deg);
      // max-height: 53px; scale(-0.4)
      width: 70px;
      min-width: 70px;
      height: 25px;
      min-height: 25px;
      &:hover {
        path {
          stroke: red;
        }
        color: red;
      }
    }

    &:nth-child(even) .stepPath {
      // transform: translate(-75px, -65px) rotate(-96deg) scale(-0.4);
      transform: translate(0px, -57px) rotate(-82deg);
    }
  }
  // > div {
  //   padding-top: 80px;
  //   padding-bottom: 75px;
  // }

  @include md {
    .steps {
      .stepsHeader {
        font-weight: bold;
        font-size: 20px;
      }
      // .stepsText {
      //   font-size: 16px;
      // }
      align-items: flex-start;
      margin-bottom: 0px;
      .stepImageWrapper {
        justify-content: space-between;
        // padding-left: 16px;
      }
      .stepPath {
        position: relative;
        transform: translate(0, 0) rotate(0);
        // scale(0.8)
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
        // transform: translate(-131px, -76px) rotate(441.85deg) scale(-0.4);scale(0.8)
      }
      &:last-child .stepPath {
        display: none;
      }
    }
  }
  @include lg {
    // .stepsWrapper {
    .steps {
      .stepPath {
        margin-left: 40px;
        transform: translate(0, 0) rotate(0) scale(1);
      }
      &:nth-child(even) .stepPath {
        transform: translate(0, -22px) rotate(-166deg) scale(1);
      }
    }
    // }
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