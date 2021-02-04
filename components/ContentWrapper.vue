<template>
  <div :class="$style.contentWrapper" v-html="content"></div>
</template>
<style lang="scss" scoped module>
.contentWrapper {
  //   padding-top: 3rem;
  //   padding-bottom: 2rem;
  color: $black;

  //   @include md {
  //     padding-top: 6rem;
  //     padding-bottom: 5rem;
  //   }

  a {
    color: $black;
    text-decoration: none;

    &:hover {
      color: $accent;
    }
  }

  ::v-deep h2 {
    margin-bottom: 2rem;
  }

  ::v-deep h3 {
    margin-bottom: 1rem;
  }

  ::v-deep ul,
  ol {
    li {
      margin-bottom: 1rem;
    }
  }

  ::v-deep ul {
    list-style: square inside url("~assets/icons/bullet_min.svg");
    padding-left: 5px !important;
  }

  ::v-deep h2:not(:first-child) {
    margin-top: 3rem;
  }
}
</style>
<script>
export default {
  props: {
    content: {
      type: String,
      default: "",
    },
  },
};
</script>