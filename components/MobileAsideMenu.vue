<template>
  <div :class="$style.chipsWrapper">
    <!-- <v-chip-group class="mb-12 hidden-md-and-up" column light>
      <v-chip
        v-for="child in services"
        :key="child.id"
        :to="`/services/${slug}/${child.slug}`"
        :title="child.name"
        outlined
      >
        <span class="d-inline-block text-truncate"> {{ child.name }}</span>
      </v-chip>
    </v-chip-group> -->
    <nuxt-link
      v-for="child in services"
      :key="child.id"
      :class="$style.chipItem"
      exact
      v-ripple
      :to="`/services/${slug}/${child.slug}`"
      :title="child.name"
    >
      {{ child.name }}
    </nuxt-link>
  </div>
</template>
<style lang="scss" scoped module>
.chipSelected {
  background-color: #4a4a4a !important;
  color: #f5f5f5 !important;
}
// .chipDisabled {
//   opacity: 0.4;
//   pointer-events: none;
//   user-select: none;
// }
.chipsWrapper {
  //   white-space: normal;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 8px 0;
  display: flex;
  flex: 1 0 auto;
  position: relative;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  margin-right: -0.6rem;
  .chipHeader {
    width: 100%;
    text-transform: uppercase;
    font-family: $heading-font-family;
    font-weight: bold;
    font-size: 16px;
    color: $black;
    align-items: center;
    display: flex;
    height: 48px;
    // padding: 0 16px 0 16px;
  }

  .chipItem {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // margin: 3px 8px 3px 0;
    margin-top: 0.3rem;
    margin-right: 0.6rem;
    margin-bottom: 0.3rem;
    margin-left: 0px;
    display: inline-block;
    padding: 5px 15px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    text-decoration: none;
    border: thin solid currentColor;
    color: $black;
    transition-duration: 0.28s;
    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    // background-color: $white;
    // max-width: 300px;

    &:hover {
      background-color: $black;
      color: $white;
    }
  }
  // .chipItem + .chipItem {
  //   margin-left: 0.6rem;
  // }
  //   .chip {
  //     margin: 4px 8px 4px 0;
  //     ::v-deep span {
  //       white-space: nowrap !important;
  //       overflow: hidden !important;
  //       text-overflow: ellipsis !important;
  //       height: auto;
  //       display: inline;
  //     }
  //   }
}
</style>
<script>
export default {
  props: {
    services: {
      type: Array,
      default: () => [],
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>