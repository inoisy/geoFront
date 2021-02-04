<template>
  <v-row>
    <v-col v-for="child in items" :key="child.id" cols="12" sm="6">
      <!-- <LazyHydrate  when-visible> -->
      <service-card :item="child" :parent-slug="slug"></service-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {},
    },
    slug: {
      type: String,
      default: "",
    },
  },
  computed: {
    length() {
      return this.items.length;
    },
  },
};
</script>

<style>
</style>