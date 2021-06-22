<template>
    <v-card
        :to="`/services/${parentSlug}/${slug}`"
        :title="name"
        nuxt
        light
        hover
    >
        <service-image :img-url="imgUrl" :alt="name" />
        <!-- <v-img :src="imgUrl" height="200px" :alt="name" :title="name" /> -->
        <v-card-title :class="$style.cardTitle">
            <span class="text-truncate">
                {{ name }}
            </span>
        </v-card-title>
        <v-card-text :class="$style.cardDescription">
            <div :class="$style.elepsis">
                {{ description }}
            </div>
        </v-card-text>
    </v-card>
</template>
<style lang="scss" scoped module>
.cardTitle {
  font-size: 1rem !important;
  line-height: 150% !important;
  font-weight: bold;
}
.cardDescription {
  // font-size: 16px !important;
  line-height: 125% !important;
  .elepsis {
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>
<script>
export default {
    props: {
        // item: {
        //   type: Object,
        //   default: () => {},
        // },
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
        parentSlug: {
            type: String,
            required: true,
        },
        imgUrl: {
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
    //     if (!this.item.img) {
    //       return require("~/assets/icons/no-camera.svg");
    //     }
    //     if (
    //       this.item.img.formats &&
    //       this.item.img.formats.small &&
    //       this.item.img.formats.small.url
    //     ) {
    //       return this.imageBaseUrl + this.item.img.formats.small.url;
    //     }
    //     return this.imageBaseUrl + this.item.img.url;
    //   },
    // },
};
</script>
