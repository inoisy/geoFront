<template>
  <v-navigation-drawer
    :class="$style.wrapper"
    class="navigation-drawer-wrapper pt-2"
    :value="show"
    temporary
    fixed
    right
    touchless
    width="240px"
    @input="change"
  >
    <v-subheader :class="$style.subHeader">НАВИГАЦИЯ</v-subheader>
    <v-list :class="$style.listWrapper" dark class="pt-0">
      <template v-for="item in menuItems">
        <v-list-group v-if="item.items && item.items.length > 0" :key="item.to">
          <v-list-item
            slot="activator"
            class="pl-0"
            :to="item.to"
            :title="item.name"
          >
            <v-list-item-content>
              {{ item.name }}
            </v-list-item-content>
          </v-list-item>
          <template #appendIcon>
            <svg-icon class="icon" name="arrowdown" />
          </template>

          <v-list
            class="pa-0"
            dense
            dark
            v-for="product in item.items"
            :key="product.name"
          >
            <v-list-group>
              <v-list-item
                slot="activator"
                class="pl-6"
                nuxt
                exact
                dense
                :to="`/${item.slug}/${product.slug}`"
                :title="product.name"
              >
                <v-list-item-title>
                  {{ product.name }}
                </v-list-item-title>
              </v-list-item>
              <template #appendIcon>
                <svg-icon class="icon" name="arrowdown" />
              </template>
              <v-list dark>
                <v-list-item
                  v-for="child in product.child"
                  :key="child.id"
                  nuxt
                  exact
                  dense
                  :to="`/${item.slug}/${product.slug}/${child.slug}`"
                  :title="child.name"
                >
                  <v-list-item-title class="pl-6">
                    {{ child.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-list-group>
          </v-list>
        </v-list-group>
        <v-list-item
          v-else
          active-class="text--accent"
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
<style lang="scss" scoped module>
.wrapper {
  background-color: #363636 !important;
  z-index: 400;
  .subHeader {
    color: #fff !important;
  }
}
</style>
<style lang="scss" scoped>
.navigation-drawer-wrapper {
  // .theme--light.v-list {
  //   color: #fff !important;
  // }
  // .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  //   color: #fff !important;
  // }
  ::v-deep .v-list {
    .v-list-group__header__append-icon {
      width: 24px !important;
      min-width: 24px !important;
    }
    .v-list-item--active {
      // color: inherit;
      .icon {
        // color: rgba(0, 0, 0, 0.5);
        transform: rotate(180deg);
      }
    }
    .v-list-group {
      .v-list-group {
        .v-list-group__header {
          padding-left: 0 !important;
        }
      }
    }
  }
}
</style>
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