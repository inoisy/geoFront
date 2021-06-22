<template>
    <v-card v-if="imgUrl"
            :class="$style.imgWrapper"
            hover
            @click="$emit('show')"
    >
        <v-img
            :src="imgUrl"
            :alt="alt"
            :title="alt"
            :aspect-ratio="14 / 9"
            max-height="300px"
        />
    </v-card>
</template>
<script>
export default {
    props: {
        imgUrl: {
            type: String,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
    },
    // data() {
    //   return {
    //     imageBaseUrl: this.$config.imageBaseUrl,
    //   };
    // },
    // computed: {
    //   imgUrl() {
    //     if (!this.img) {
    //       return require("~/assets/icons/no-camera.svg");
    //     }
    //     if (
    //       this.img.formats &&
    //       this.img.formats.small &&
    //       this.img.formats.small.url
    //     ) {
    //       return this.imageBaseUrl + this.img.formats.small.url;
    //     }
    //     return this.imageBaseUrl + this.img.url;
    //   },
    //   // srcSet() {
    //   //   return "";
    //   // },
    // },
};
</script>

<style lang="scss" scoped module>
.imgWrapper {
  width: 100%;
  display: inline-flex;
  margin-bottom: 2rem;
  @include sm {
    float: right;
    width: 250px;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
  @include md {
    width: 350px;
  }
  @include lg {
    width: 400px;
  }
}
</style>
