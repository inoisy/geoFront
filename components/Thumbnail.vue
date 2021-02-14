<template>
  <v-img :src="imgUrl" :alt="alt" :aspect-ratio="14 / 9" max-height="300px" />
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
        return require("~/assets/icons/no-camera.svg");
      }
      if (
        this.img.formats &&
        this.img.formats.small &&
        this.img.formats.small.url
      ) {
        return this.imageBaseUrl + this.img.formats.small.url;
      }
      return this.imageBaseUrl + this.img.url;
    },
    // srcSet() {
    //   return "";
    // },
  },
};
</script>
