<template>
  <!-- <div class="black--text"> -->
  <v-img
    :src="imgUrl"
    :alt="alt"
    :title="alt"
    aspect-ratio="1.555"
    max-height="400px"
    gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
  />
  <!-- </div> -->
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
      //Object,
      // default: () => {},
    },
    alt: {
      type: String,
      required: true,
      // default: "",
    },
  },
  // data() {
  //   return {
  //     imageBaseUrl: this.$config.imageBaseUrl,
  //   };
  // },
  // computed: {
  // imgUrl() {
  //   if (!this.img) {
  //     return require("~/assets/icons/no-camera.svg");
  //   }
  //   if (!this.img.formats) {
  //     return this.imageBaseUrl + this.img.url;
  //   }
  //   if (this.img.formats.small) {
  //     return this.imageBaseUrl + this.img.formats.small.url;
  //   }
  //   return this.imageBaseUrl + this.img.formats.thumbnail.url;
  // },
  // },
};
</script>