<template>
  <v-app dark>
    <!-- <LazyHydrate on-interaction> -->
    <lazy-navigation-drawer
      v-if="drawer"
      :show="drawer"
      @close="drawer = false"
    />
    <!-- </LazyHydrate> -->
    <LazyHydrate when-idle>
      <default-app-bar @show="drawer = true" />
    </LazyHydrate>
    <!-- {{ footerHeight }} -->
    <v-main>
      <nuxt />
    </v-main>
    <!-- <LazyHydrate when-visible> -->
    <v-lazy v-model="isFooter" min-height="300">
      <lazy-default-footer v-if="isFooter" />
    </v-lazy>
    <lazy-default-dialog v-if="isDialog" />
    <lazy-floating-button v-if="isMounted" />
    <!-- {{ footerHeight }} -->
  </v-app>
</template>

<script>
import LazyHydrate from "vue-lazy-hydration";
export default {
  components: {
    LazyHydrate,
    // DefaultFooter,
    // DefaultAppBar: hydrateWhenIdle(() =>
    //   import("~/components/DefaultAppBar.vue")
    // ),
    // LazyNavigationDrawer: hydrateWhenVisible(() =>
    //   import("~/components/LazyNavigationDrawer.vue")
    // ),
    // LazyDefaultDialog: hydrateOnInteraction(() =>
    //   import("~/components/LazyDefaultDialog.vue")
    // ),
    // LazyFloatingButton: hydrateWhenIdle(() =>
    //   import("~/components/LazyFloatingButton.vue")
    // ),
    // DefaultFooter: hydrateWhenVisible(() =>
    //   import("~/components/DefaultFooter.vue")
    // ),
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
