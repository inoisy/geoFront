<template>
  <v-img
    :src="imgUrl"
    :alt="alt"
    :aspect-ratio="14 / 9"
    max-height="300px"
  ></v-img>
</template>
<script>
export default {
  props: {
    img: {
      type: Object,
      default: () => {},
    },
    alt: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
    };
  },
  computed: {
    imgUrl() {
      if (!this.img) {
        return false;
      }
      // const isThumb = this.item.img.formats && this.item.img.formats.thumbnail.url
      if (
        this.img.formats &&
        this.img.formats.small &&
        this.img.formats.small.url
      ) {
        return this.imageBaseUrl + this.img.formats.small.url;
      }
      return this.imageBaseUrl + this.img.url;
      //  this.item.img && this.item.img.formats && this.item.img.formats.thumbnail.url
      //       ? this.imageBaseUrl + this.item.img.formats.thumbnail.url
      //       : require('~/assets/no-image1.png')
    },
    srcSet() {
      return "";
    },
  },
};
</script>
