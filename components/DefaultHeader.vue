<template>
  <div>
    <section :class="$style.firstSection">
      <v-container grid-list-lg fill-height class="py-12">
        <v-row align="center">
          <breadcrumbs :items="breadcrumbs" :class="$style.breadcrumbs" />
          <!-- <v-breadcrumbs
            :class="$style.breadcrumbs"
            divider="/"
            :items="breadcrumbs"
          >
            <template v-slot:item="{ item }">
              <v-breadcrumbs-item
                :to="item.to"
                :class="$style.breadcrumbsItem"
                nuxt
                exact
                :title="item.text"
                class="breadcrumbs-item"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </template>
          </v-breadcrumbs> -->
          <v-col cols="12" sm="10" md="10" lg="7">
            <h1 :class="$style.header" class="mb-0">{{ header }}</h1>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.firstSection {
  @include bg(
    linear-gradient(180deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url(/bg1.jpg)
  );
  min-height: 370px;
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
