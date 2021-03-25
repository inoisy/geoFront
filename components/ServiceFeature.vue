<template>
  <section
    :class="[$style.serviceFeatureWrapper, isWithGray && $style.withGray]"
    class="sectionWrapper"
  >
    <v-container>
      <v-row :class="$style.serviceFeatureRow" justify="center" no-gutters>
        <v-col :class="$style.serviceFeatureTextWrapper" cols="12" md="6">
          <h2 :class="$style.serviceFeatureHeader">
            {{ header }}
          </h2>
          <div :class="$style.serviceFeatureContent" v-html="content" />
          <div :class="$style.buttonWrapper">
            <v-btn :class="$style.button" :to="slug" outlined light>
              Подробнее
            </v-btn>
            <v-btn
              :class="$style.button"
              outlined
              light
              @click="handleOffer(name)"
            >
              Заказать
            </v-btn>
          </div>
        </v-col>
        <v-col
          v-if="imgUrl"
          :class="$style.serviceFeatureImgWrapper"
          cols="12"
          md="6"
        >
          <v-img
            :class="$style.serviceFeatureImg"
            :src="imgUrl"
            :alt="name"
            :title="name"
            aspect-ratio="1.555"
            max-height="400px"
            gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
          />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<style lang="scss" scoped module>
.serviceFeatureWrapper {
  background-color: white;
  // padding-top: 6rem;
  // padding-bottom: 5rem;
  &.withGray {
    &:nth-child(odd) {
      background-color: $gray;
    }
  }

  &:nth-child(odd) {
    // background-color: $gray;
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
        border-radius: 3px;
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 100%;
        display: block;
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
      padding: 12px;
      color: #18191f;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 40px;
      @include md {
        margin-bottom: auto;
        margin-top: auto;
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
          margin-bottom: 12px;
          flex: 1 1 100%;
          @include sm {
            flex: 0 0 165px;
          }
        }
      }
      .serviceFeatureHeader {
        font-weight: 600;
        font-size: 22px;
        margin-bottom: 24px;
        line-height: 125%;
        @include sm {
          font-size: 28px;
        }
        // @include md {
        //   font-size: 32px;
        // }
      }
      .serviceFeatureContent {
        font-weight: 300;
        // font-size: 16px;
        line-height: 150%;
        margin-bottom: 35px;
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
<script>
import ServiceImage from "~/components/ServiceImage.vue";

export default {
  components: { ServiceImage },
  props: {
    isWithGray: {
      type: Boolean,
      default: false,
    },
    imgUrl: {
      type: String,
      default: null,
      // default: () => {},
    },
    header: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleOffer(name) {
      this.$store.dispatch("showDialog", {
        isShow: true,
        name,
      });
    },
  },
};
</script>