<template>
  <v-chip-group class="mb-12 hidden-md-and-up" column light>
    <v-chip
      v-for="child in services"
      :key="child.id"
      :to="`/services/${slug}/${child.slug}`"
      :title="child.name"
      outlined
    >
      <span class="d-inline-block text-truncate"> {{ child.name }}</span>
    </v-chip>
  </v-chip-group>
</template>

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