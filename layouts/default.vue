<template>
  <v-app dark>
    <LazyHydrate when-idle>
      <default-app-bar @show="drawer = true" />
    </LazyHydrate>
    <v-main>
      <nuxt />
    </v-main>
    <v-lazy
      v-model="isFooter"
      min-height="300"
      style="background-color: #06070c"
    >
      <lazy-default-footer v-if="isFooter" />
    </v-lazy>
    <lazy-default-dialog v-if="isDialog" />
    <v-fab-transition appear>
      <lazy-floating-button v-if="isMounted" />
    </v-fab-transition>
    <lazy-navigation-drawer
      v-if="drawer"
      :show="drawer"
      @close="drawer = false"
    />
  </v-app>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
export default {
  // head() {
  //   return {
  // title: 'Payment Page - My awesome project',
  // script: [
  //   {
  //     hid: "calltracking",
  //     src: `http://cc.calltracking.ru/phone.ecee0.10700.async.js?nc=${Math.floor(
  //       new Date().getTime() / 300000
  //     )}`,
  //     // defer: true,'<https://js.stripe.com/v3/>',
  //     // Changed after script load
  //     // callback: () => { this.isStripeLoaded = true }
  //   },
  // ],
  //   };
  // },
  components: {
    LazyHydrate,
  },
  data() {
    return {
      drawer: false,
      isMounted: false,
      isFooter: false,
    };
  },
  computed: {
    isDialog() {
      return this.$store.state.dialog.isShow;
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
