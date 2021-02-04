<template>
  <section :class="$style.benefitsWrapper">
    <v-container grid-list-lg>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-10 text-center text-md-left pageHeader">
            Наши преимущества
          </h2>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col
          v-for="(benefit, i) in benefits"
          :key="`benefit-${i}`"
          :class="$style.benefitItem"
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
            <p :class="$style.benefitsText">{{ benefit.content }}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped module>
.benefitsWrapper {
  color: #18191f;
  > div {
    padding-top: 65px;
    padding-bottom: 65px;
  }
  .benefitItem {
    display: flex;
    .benefitsImageWrapper {
      background-color: #ececec;
      display: inline-flex;
      border-radius: 50%;
      width: 72px;
      min-width: 72px;
      height: 72px;
      align-items: center;
      justify-content: center;
      margin-right: 24px;
      .benefitsImage {
        width: 44px;
        height: 44px;
      }
    }
    .benefitsTextWrapper {
      .benefitsHeader {
        font-weight: 600;
        font-size: 18px;
        line-height: 125%;
        margin-bottom: 16px;
      }
      .benefitsText {
        font-weight: normal;
        font-size: 14px;
        font-weight: 300;
      }
    }
  }
  @include md {
    .benefitItem {
      .benefitsTextWrapper {
        .benefitsHeader {
          font-size: 1.5rem;
        }
        .benefitsText {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    benefits: {
      type: Array,
      default: () => [],
    },
  },
};
</script>