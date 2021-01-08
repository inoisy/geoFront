<template>
  <!-- <v-container grid-list-lg class="pt-12">
    <template v-for="(service, i) in services">
      <v-row
        :key="`service-text-${i}`"
        :class="$style['service-feature-row']"
        class="mb-12"
      >
        <v-col
          :class="$style['service-feature-text-wrapper']"
          cols="12"
          sm="10"
          md="6"
          class=""
        >
          <h2 :class="$style['service-feature-header']">
            {{ service.name }}
          </h2>
          <div
            :class="$style['service-feature-content']"
            v-html="service.description"
          ></div>
        </v-col>
        <v-col
          :class="$style['service-feature-img-wrapper']"
          cols="12"
          sm="10"
          md="4"
        >
          <img
            :class="$style['service-feature-img']"
            :src="
              service.img
                ? imageBaseUrl + service.img.url
                : require('~/assets/icons/no-camera.svg')
            "
            :alt="service.name"
        /></v-col>
      </v-row>
    </template>
  </v-container> -->
  <v-container grid-list-lg class="pt-12">
    <template v-for="(service, i) in services">
      <v-row
        :key="`service-text-${i}`"
        :class="$style.serviceFeatureRow"
        class="mb-12"
        justify="center"
      >
        <v-col
          :class="$style.serviceFeatureTextWrapper"
          cols="12"
          sm="10"
          md="6"
          class=""
        >
          <h2 :class="$style.serviceFeatureHeader">
            {{ service.name }}
          </h2>
          <div
            :class="$style.serviceFeatureContent"
            class="mb-5"
            v-html="service.description"
          ></div>
          <div>
            <v-btn
              class="mb-3 mr-2 d-inline-flex"
              :to="`/services/${service.slug}`"
              outlined
              light
            >
              Подробнее
            </v-btn>
            <v-btn
              class="mb-3 mr-2 d-inline-flex"
              outlined
              light
              @click="handleOffer"
            >
              Заказать
            </v-btn>
            <!-- {{ service }} -->
          </div>
        </v-col>
        <v-col
          :class="$style.serviceFeatureImgWrapper"
          cols="12"
          sm="10"
          md="6"
        >
          <img
            :class="$style.serviceFeatureImg"
            :src="
              service.img && service.img.url
                ? imageBaseUrl + service.img.url
                : require('~/assets/icons/no-camera.svg')
            "
            :alt="service.name"
        /></v-col>
      </v-row>
    </template>
  </v-container>
</template>
<style lang="scss" scoped module>
// .service-feature-row {
//   justify-content: center;
//   .service-feature-img-wrapper {
//     display: flex;
//     align-items: center;
//     .service-feature-img {
//       border-radius: 3px;
//       box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.2);
//       width: 100%;
//       max-width: 100%;
//       display: block;
//     }
//   }
//   .service-feature-text-wrapper {
//     color: #18191f;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     .service-feature-header {
//       font-weight: normal;
//       font-size: 26px;
//       line-height: 32px;
//       margin-bottom: 24px;
//     }
//     .service-feature-content {
//       font-weight: 300;
//       font-size: 16px;
//       line-height: 22px;
//     }
//   }
//   &:nth-child(odd) {
//     flex-direction: row-reverse;
//   }
// }
// @include md {
//   .service-feature-row {
//     justify-content: space-between;
//     .service-feature-img-wrapper {
//       padding-left: 8.33333%;
//     }
//     // padding-left: 8.33333%;
//     &:nth-child(odd) {
//       .service-feature-img-wrapper {
//         padding-right: 8.33333%;
//         padding-left: 12px;
//       }
//     }
//   }
// }

.serviceFeatureRow {
  .serviceFeatureImgWrapper {
    display: flex;
    align-items: center;
    .serviceFeatureImg {
      border-radius: 3px;
      box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }
  .serviceFeatureTextWrapper {
    color: #18191f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .serviceFeatureHeader {
      font-weight: 600;
      font-size: 32px;
      margin-bottom: 24px;
      line-height: 125%;
    }
    .serviceFeatureContent {
      font-weight: 300;
      font-size: 16px;
      line-height: 150%;
    }
  }
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
  @include md {
    .serviceFeatureImgWrapper {
      padding-left: 8.33333%;
    }
    // padding-left: 8.33333%;
    &:nth-child(odd) {
      .serviceFeatureImgWrapper {
        padding-right: 8.33333%;
        padding-left: 12px;
      }
    }
  }
}
</style>
<script>
export default {
  props: {
    services: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
    };
  },
  methods: {
    handleOffer() {
      return true;
    },
  },
};
</script>
