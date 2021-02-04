<template>
  <section
    :class="[$style.serviceFeatureWrapper, isWithGray && $style.withGray]"
  >
    <v-container grid-list-lg class="py-12">
      <template>
        <v-row :class="$style.serviceFeatureRow" justify="center">
          <v-col
            :class="$style.serviceFeatureTextWrapper"
            cols="12"
            md="6"
            class=""
          >
            <h2 :class="$style.serviceFeatureHeader">
              {{ header }}
            </h2>
            <div
              :class="$style.serviceFeatureContent"
              class="mb-5"
              v-html="content"
            ></div>
            <div>
              <v-btn class="mb-3 mr-2 d-inline-flex" :to="slug" outlined light>
                Подробнее
              </v-btn>
              <v-btn
                class="mb-3 mr-2 d-inline-flex"
                outlined
                light
                @click="handleOffer(name)"
              >
                Заказать
              </v-btn>
            </div>
          </v-col>
          <v-col
            v-if="img"
            :class="$style.serviceFeatureImgWrapper"
            cols="12"
            md="6"
          >
            <service-image
              :class="$style.serviceFeatureImg"
              :img="img"
              :alt="name"
            ></service-image>
          </v-col>
        </v-row>
      </template>
    </v-container>
  </section>
</template>
<style lang="scss" scoped module>
.serviceFeatureWrapper {
  background-color: white;
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
      color: #18191f;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .serviceFeatureHeader {
        font-weight: 600;
        font-size: 1.8rem;
        margin-bottom: 24px;
        line-height: 125%;
      }
      .serviceFeatureContent {
        font-weight: 300;
        // font-size: 16px;
        line-height: 150%;
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
    img: {
      type: Object,
      default: () => {},
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