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
        ></div>
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
      <!-- </v-row> -->
    </v-container>
  </section>
</template>

<style lang="scss" scoped module>
.noIcon {
  .textWrapper {
    max-width: 100% !important;
  }
}
.firstSection {
  overflow-x: hidden;
  // @include bg(
  //   linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%),
  //   linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.57)),
  //   url(/bg1.jpg)
  // );
  color: $white;
  background-color: #161616;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 370px;
  .breadcrumbs {
    //   position: absolute;
    //   top: 10px;
    // padding-left: 0px;
    padding: 12px;
    width: 100%;
    margin-bottom: 20px;
    @include sm {
      margin-bottom: 32px;
    }
  }
  .firstSectionInner {
    padding-bottom: 65px;
    padding-top: 25px;
    position: relative;
    height: 100%;
    min-height: inherit;
    @include md {
      padding-top: 35px;
      padding-bottom: 85px;
    }
    .textWrapper {
      padding: 12px;
      max-width: 100%;
      width: 100%;
      .header {
        font-weight: 600;
        font-size: 28px;
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
        font-weight: bold;
        font-size: 2rem;
        // margin-top: -20px;
        margin-bottom: 25px;
        color: rgba($white, 0.87);
        // color: rgba($black, 0.87);
      }
      .subheader {
        & ~ .price {
          margin-top: -20px;
        }

        line-height: 150%;
        font-size: 14px;
        color: $white !important;
        ::v-deep p {
          color: $white !important;
        }
        ::v-deep span {
          color: $white !important;
        }
        // p:last-child {
        //   margin-bottom: 0;
        // }
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
    // .button {
    //   height: 36px;
    //   min-width: 64px;
    //   padding: 0 16px;
    //   font-size: 12px;
    //   @include md {
    //     height: 44px;
    //     min-width: 78px;
    //     padding: 0 19.5555555556px;
    //     font-size: 14px;
    //   }
    //   @include lg {
    //     height: 52px;
    //     min-width: 92px;
    //     padding: 0 23.1111111111px;
    //     font-size: 1rem;
    //   }
    // }
    .iconWrapper {
      height: 75px;
      width: 75px;
      float: right;
      margin-bottom: -25px;
      margin-top: -15px;
      margin-left: 5px;
      @include sm {
        height: 90px;
        width: 90px;
        margin-bottom: -35px;
        margin-top: -20px;
      }
      @include md {
        margin-bottom: unset !important;
        margin-top: unset !important;
        margin-left: 24px;
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        width: 230px;
        height: 230px;
      }
      @include lg {
        width: 270px;
        height: 270px;
      }
      .icon {
        opacity: 0.3;
        max-width: 100%;
        width: 100%;
        height: auto;
        filter: invert(100%);
      }
    }
  }
  // clear: right;
  // position: absolute;
  // right: 12px;
  // bottom: 12px;
  // display: table;
  // width: 70px;
  // float: right;
  // margin-left: auto;
  // margin-bottom: -25px;
  // margin-top: -60px;
  // height: 13rem;
  // @include md {
  //   margin-bottom: auto;
  //   margin-top: auto;
  // }
  // .asideImageVector {
  //   filter: grayscale(1);
  //   height: 13rem;
  //   width: 13rem;
  //   display: block;
  //   @include md {
  //     height: 15rem;
  //     width: 15rem;
  //   }
  // }
  // transform: translate(0, -50%);
  // width: 15%;
  // > div {
  //   min-height: inherit;
  // }

  // @include sm {
  //   .firstSectionInner {
  //     .textWrapper {
  //       max-width: 70%;
  //     }
  //     .iconWrapper {
  //       width: 25%;
  //       // top: 20px;
  //     }
  //   }
  // }
  // @include md {
  //   .firstSectionInner {
  //     .textWrapper {
  //       max-width: 70%;
  //     }
  //     .iconWrapper {
  //       width: 27%;
  //       // right: 0;
  //       top: 50%;
  //       transform: translate(0, -50%);
  //     }
  //   }
  // }
  // @include lg {
  //   .firstSectionInner {
  //     .textWrapper {
  //       max-width: 70%;
  //     }
  //     .iconWrapper {
  //       width: 20%;
  //     }
  //   }
  // }
}
</style>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";

export default {
  components: {
    Breadcrumbs,
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: () => [],
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
      default: () => {},
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
      this.$store.dispatch("showDialog", {
        name: this.header,
        isShow: true,
      });
      return true;
    },
  },
};
</script>
