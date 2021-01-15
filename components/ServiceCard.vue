<template>
  <v-card
    :to="`/services/${parentSlug}/${item.slug}`"
    light
    hover
    style="width: 100%; height: 100%"
  >
    <v-img
      :src="
        item.img && item.img.url
          ? imageBaseUrl + item.img.url
          : require('~/assets/icons/no-camera.svg')
      "
      height="200px"
    ></v-img>
    <v-card-title>
      <span class="text-truncate"> {{ item.name }}</span>
    </v-card-title>
    <v-card-text>
      <div class="text-elepsis">{{ item.description }}</div>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped>
.text-elepsis {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
  // padding: 0;
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
};
</script>
