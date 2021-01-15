<template>
  <nuxt-link class="mr-auto logoWrapper" :class="mini && 'mini'" to="/">
    <svg-icon name="logo" class="logoImg mr-2" />
    <span class="logoHeader">GEOWORKS</span>
  </nuxt-link>
</template>
<style lang="scss"  >
.logoWrapper {
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  .logoHeader {
    color: #f1f3ef;
    font-family: "Castoro";
    font-size: 18px;
  }
  .logoImg {
    height: 54px;
    width: 54px;
  }
  &:hover {
    opacity: 0.8;
  }
}
.logoWrapper.mini {
  .logoHeader {
    font-size: 16px;
  }
  .logoImg {
    height: 38px;
    width: 38px;
  }
}

@include sm {
  .logoWrapper {
    .logoHeader {
      font-size: 20px;
    }
  }
  .logoWrapper.mini {
    .logoHeader {
      font-size: 18px;
    }
  }
}
@include md {
  .logoWrapper {
    .logoHeader {
      font-size: 28px;
    }
    .logoImg {
      height: 75px;
      width: 75px;
    }
  }
  .logoWrapper.mini {
    .logoHeader {
      font-size: 22px;
    }
    .logoImg {
      height: 44px;
      width: 44px;
    }
  }
}
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
