<template>
  <v-navigation-drawer
    :value="show"
    temporary
    fixed
    right
    touchless
    class="pt-2"
    width="240px"
    @input="change"
  >
    <v-subheader>НАВИГАЦИЯ</v-subheader>
    <v-list class="pt-0">
      <template v-for="item in menuItems">
        <v-list-item
          :key="item.name"
          :to="`/${item.slug}`"
          nuxt
          ripple
          exact
          :title="item.name"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },
  computed: {
    menuItems() {
      return this.$store.getters.menuItems;
    },
  },
  methods: {
    change(val) {
      if (!val) {
        this.$emit("close");
      }
    },
  },
};
</script>