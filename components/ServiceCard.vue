<template>
  <v-card
    :to="`/services/${parentSlug}/${item.slug}`"
    :title="item.name"
    light
    hover
  >
    <v-img :src="imgUrl" height="200px" :alt="item.name" :title="item.name" />
    <v-card-title :class="$style.cardTitle">
      <span class="text-truncate">
        {{ item.name }}
      </span>
    </v-card-title>
    <v-card-text :class="$style.cardDescription">
      <div :class="$style.elepsis">
        {{ item.description }}
      </div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped module>
.cardTitle {
  font-size: 18px !important;
  line-height: 150% !important;
}
.cardDescription {
  font-size: 16px !important;
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
    item: {
      type: Object,
      default: () => {},
    },
    parentSlug: {
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
      if (!this.item.img) {
        return require("~/assets/icons/no-camera.svg");
      }
      if (
        this.item.img.formats &&
        this.item.img.formats.small &&
        this.item.img.formats.small.url
      ) {
        return this.imageBaseUrl + this.item.img.formats.small.url;
      }
      return this.imageBaseUrl + this.item.img.url;
    },
  },
};
</script>
