<template>
  <!-- <div> -->
  <section
    :class="$style.firstSection"
    :style="`background-image: url(${require('~/assets/bg.jpg')})`"
  >
    <v-container fill-height class="py-12">
      <v-row align="center" no-gutters>
        <breadcrumbs
          class="px-3"
          :items="breadcrumbs"
          :class="$style.breadcrumbs"
        />
        <v-col class="pa-3" cols="12" sm="10" md="10" lg="7">
          <h1 :class="$style.header" class="mb-0">{{ header }}</h1>
        </v-col>
      </v-row>
    </v-container>
  </section>
  <!-- </div> -->
</template>
<style lang="scss" scoped module>
.firstSection {
  background-position: center;
  background-color: #161616;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 370px;
  color: $white;
  .breadcrumbs {
    position: absolute;
    top: 10px;
    padding-left: 12px;
  }
  > div {
    min-height: inherit;
  }
  .header {
    font-weight: 600;
    font-size: 3.5rem;
  }
}
</style>
<script>
import Breadcrumbs from "~/components/Breadcrumbs.vue";

export default {
  components: { Breadcrumbs },
  props: {
    header: {
      type: String,
      default: "",
    },
    breadcrumbs: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
