<template>
  <div class="contentWrapper" v-html="content"></div>
</template>
<style lang="scss" scoped >
.contentWrapper {
  color: $black;
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
  ::v-deep ol {
    counter-reset: my-awesome-counter;
    list-style: none;
    padding-left: 40px;
    li {
      margin-bottom: 1rem;
      counter-increment: my-awesome-counter;

      position: relative;
      &:before {
        content: counter(my-awesome-counter);
        // display: inline-block;
        // background: #f3f3f3;
        // width: 30px;
        // height: 30px;
        // -webkit-border-radius: 30px;
        // border-radius: 30px;
        // text-align: center;
        // line-height: 30px;
        // font-size: 15px;
        // font-weight: 700;
        // margin: 0 10px 10px 0;
        color: white;
        font-size: 1.1rem;
        font-weight: bold;
        position: absolute;
        $size: 1.8rem;
        left: calc(-1 * #{$size} - 10px);
        line-height: #{$size};
        width: #{$size};
        height: #{$size};
        top: 0;
        background: $black;
        border-radius: 50%;
        text-align: center;
        box-shadow: 1px 1px 0 #999;
      }
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