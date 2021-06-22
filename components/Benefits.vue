<template>
    <section :class="$style.benefitsWrapper">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h2 class="mb-10 pageHeader">Наши преимущества</h2>
                </v-col>
            </v-row>
            <v-row class="justify-center" no-gutters>
                <v-col
                    v-for="(benefit, i) in items"
                    :key="`benefit-${i}`"
                    :class="$style.benefitItem"
                    class="pa-3"
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
                        <div :class="$style.benefitsText">{{ benefit.content }}</div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>
<style lang="scss" scoped module>
.benefitsWrapper {
  color: #18191f;
  .benefitItem {
    display: flex;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: -12px;
    }
    &:hover {
      .benefitsImageWrapper {
        background-color: $black;
        &:before {
          --size: -5px;
          top: var(--size);
          right: var(--size);
          bottom: var(--size);
          left: var(--size);
          border-width: 2px;
          border-color: $black;

          @include sm {
            --size: -8px;
            border-width: 3.5px;
          }
        }
        .benefitsImage {
          filter: invert(1);
        }
      }
    }
    .benefitsImageWrapper {
      background-color: var(--content-color, #ececec);
      display: inline-flex;
      border-radius: 50%;
      width: 60px;
      min-width: 60px;
      height: 60px;
      align-items: center;
      justify-content: center;
      transition: 0.3s ease all;
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      position: relative;
      margin-right: 10px;
      @include sm {
        margin-right: 24px;
        width: 72px;
        min-width: 72px;
        height: 72px;
      }
      &:before {
        content: "";
        position: absolute;
        border: #e1e1e1 solid 1px;
        border-radius: 50%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        // -webkit-transition-duration: 0.3s;
        // transition-duration: 0.3s;
        // // -webkit-transition-property: top, right, bottom, left;
        // transition-property: all;
        transition: 0.3s ease all;
      }
      .benefitsImage {
        transition: 0.2s ease;
        width: 32px;
        height: 32px;
        @include sm {
          width: 44px;
          height: 44px;
        }
      }
    }
    .benefitsTextWrapper {
      .benefitsHeader {
        font-weight: 600;
        font-size: 16px;
        line-height: 125%;
        margin-bottom: 8px;
        word-break: break-word;
        @include sm {
          font-size: 18px;
        }
        @include md {
          font-size: 20px;
          margin-bottom: 12px;
        }
      }
      .benefitsText {
        font-weight: normal;
        font-size: 12px;
        font-weight: 300;
        @include sm {
          font-size: 14px;
        }
        // @include md {
        //   font-size: 1rem;
        // }
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
