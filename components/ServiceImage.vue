<template>
  <div class="black--text">
    <v-img
      :src="imgUrl"
      :alt="alt"
      :title="alt"
      aspect-ratio="1.555"
      max-height="400px"
      gradient="to top right, rgba(0,0,0,0), rgba(0,0,0,.4)"
    />
    <!-- {{ srcSet }} -->
    <!-- :srcset="srcComputed.set" :srcSet="srcSet"-->
    <!-- :sizes="srcComputed.sizes" -->
  </div>
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
      //   sizes: "",
    };
  },
  computed: {
    // srcSet() {
    //   if (!this.img.formats) return;
    //   const length = Object.values(this.img.formats).length - 1;
    //   console.log(
    //     "🚀 ~ file: ServiceImage.vue ~ line 42 ~ srcSet ~ length",
    //     length
    //   );
    //   return Object.values(this.img.formats)
    //     .sort(function (a, b) {
    //       if (a.width > b.width) {
    //         return 1;
    //       }
    //       if (a.width < b.width) {
    //         return -1;
    //       }
    //       return 0;
    //     })
    //     .reduce((acc, val, index) => {
    //       console.log("srcSet -> val", index);
    //       acc = acc + `${this.imageBaseUrl + val.url} ${index + 1}x`;
    //       if (index !== length) {
    //         acc = acc + `, `;
    //       }
    //       return acc;
    //     }, "");
    // },
    imgUrl() {
      if (!this.img) {
        return require("~/assets/icons/no-camera.svg");
      }
      if (!this.img.formats) {
        return this.imageBaseUrl + this.img.url;
      }
      if (this.img.formats.small) {
        return this.imageBaseUrl + this.img.formats.small.url;
      }
      return this.imageBaseUrl + this.img.formats.thumbnail.url;
    },
    //     srcComputed() {
    //       //   console.log(Object.values(this.img.formats));
    //       const values = Object.values(this.img.formats).sort(
    //         (a, b) => b.width - a.width
    //       );
    //       const length = values.length - 1;
    //       let sizes = "";
    //       const set = values.reduce((acc, val, index) => {
    //         acc = acc + `${this.imageBaseUrl + val.url} ${val.width}w`;
    //         sizes = sizes + `(max-width: ${val.width}px) ${val.width - 40}px`;
    //         if (index !== length) {
    //           acc = acc + `, `;
    //           sizes = sizes + `, `;
    //         }
    //         return acc;
    //       }, "");
    //       //   this.sizes = sizes;
    //       return {
    //         sizes,
    //         set,
    //       };
    //     },
  },
};
</script>