<template>
  <v-slide-group>
    <template v-slot:next>
      <svg-icon name="next" style="width: 24px; height: 24px" />
    </template>
    <template v-slot:prev>
      <svg-icon name="prev" style="width: 24px; height: 24px" />
    </template>
    <v-slide-item v-for="child in items" :key="child.id">
      <div class="pa-3" style="width: 350px">
        <service-card :item="child" :parent-slug="slug"></service-card>
      </div>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import ServiceCard from "~/components/ServiceCard.vue";

export default {
  components: { ServiceCard },
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
};
</script>