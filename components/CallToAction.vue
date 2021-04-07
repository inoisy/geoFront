<template>
  <v-parallax class="parallaxWrapper" :src="src" dark>
    <!-- :height="height" -->
    <v-container :class="$style.parallaxInner">
      <h2 class="pageHeader mb-2 pa-3 col col-12">Бесплатная консультация</h2>
      <!-- <img :srcSet="srcSet.srcSet" :src="srcSet.src" />
:src="require('~/assets/call.jpg?resize&size=1980')" :srcSet="srcSet.srcSet" :src="srcSet.src"-->
      <div
        class="mb-3 pa-3 col col-12 col-sm-8 col-md-8 col-lg-7 text-center text-md-left"
        style="font-size: 1.2rem"
      >
        <div style="margin-bottom: 2.5rem">
          <!-- Остались вопросы или не можете определиться какая услуга вам нужна? -->
          Получить консультацию и расчёт полной стоимости услуг можно оставив
          контакты в форме ниже или позвонив по телефону

          <!-- <a :class="$style.phone" :href="`tel:${phone}`"> -->
          <!-- {{ phone }} -->
          <a :class="$style.phone" class="ct_hid" href="tel:+74991120654">
            <span class="phone-text">+7 (499) 112-06-54</span>
          </a>
        </div>
        <!-- outlined dark-->
        <v-btn class="callToActionButton" color="white" @click="handleOffer">
          Получить консультацию
        </v-btn>
      </div>
      <!-- <LazyHydrate on-interaction>
        <contact-form
          class="col col-sm-10 col-md-9 mx-auto"
          :full-width="false"
        />
      </LazyHydrate> -->
    </v-container>
  </v-parallax>
</template>

<script>
const oneSize = require("~/assets/call.jpg?resize&size=1980");
// $xl-width:1904px;
// $lg-width: 1264px;
// $md-width: 960px;
// $sm-width: 600px;

// const multipleSizes = require("~/assets/call.jpg?resize&sizes[]=630&sizes[]=980&sizes[]=1264&sizes[]=1904");
// console.log(
//   "🚀 ~ file: CallToAction.vue ~ line 35 ~ multipleSizes",
//   multipleSizes
// );

export default {
  data() {
    return {
      // srcSet: multipleSizes,
      src: oneSize.src,
    };
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
  computed: {
    // height() {
    //   return this.$vuetify.breakpoint.smAndDown ? 500 : 500;
    // },
    phone() {
      return this.$store.state.info.phone;
    },
  },
};
</script>
<style lang="scss" scoped>
// .callToActionButton {
//   box-shadow: 0 2px 15px rgba($white, 0.65);
//   transition-property: box-shadow, transform, opacity, background-color,
//     border-color, color;
//   &:hover {
//     background-color: $accent !important;
//     border-color: $accent !important;
//     color: $white;
//     box-shadow: 0 2px 18px rgba($accent, 0.8);
//   }
// }
.parallaxWrapper {
  color: $black;
  background-color: $white;
  ::v-deep .v-parallax__image {
    filter: brightness(0.2);
    // background-color: #000000;
    // &:after {
    //   content: "";
    //   background-image: linear-gradient(147deg, #000000 0%, #434343 58%);
    // }
    /* width: 100%; */
    /* max-width: ; */
  }
}
</style>
<style lang="scss" scoped module>
// color: #f1f3ef;
// background-color: #161616;
.parallaxInner {
  align-items: center;
  display: flex;
  flex-direction: column;
  @include md {
    align-items: flex-start;
  }
}
.phone {
  font-weight: 700;
  white-space: nowrap;
  text-decoration: none;
  color: $white;
  &:hover {
    color: $accent;
  }
}
</style>