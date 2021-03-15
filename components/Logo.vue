<template>
  <nuxt-link class="logoWrapper" :class="mini && 'mini'" to="/" title="Логотип">
    <!-- <svg-icon name="logo" class="logo" /> -->
    <v-img
      class="logo"
      :src="require('~/assets/logo.svg')"
      alt="Логотип"
      contain
    />
  </nuxt-link>
</template>
<style lang="scss" scoped>
.logoWrapper {
  display: flex;
  align-items: center;
  .logo {
    width: 160px;
    max-height: 85%;
    @include sm {
      width: 200px;
    }
    @include md {
      width: 260px;
    }
  }
  &.mini {
    .logo {
      width: 180px;
      max-width: 180px;
      height: 50px;
    }
  }
  &:hover {
    opacity: 0.8;
  }
}
// .mini {
//   .logo {
//     width: 180px;
//     height: 50px;
//   }
// }
</style>
<script>
export default {
  props: {
    mini: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
