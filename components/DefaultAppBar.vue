<template>
  <div :class="$style.appBar">
    <v-container
      fill-height
      grid-list-lg
      :class="$style['header']"
      class="py-0 d-flex align-center"
    >
      <logo class="pr-3 mr-auto fill-height" />

      <template v-for="(item, index) in menuItems">
        <v-btn
          v-if="!item.disable"
          :key="index"
          :to="`/${item.slug}`"
          :title="item.name"
          :class="$style.link"
          class="ma-0 hidden-sm-and-down"
          text
          tile
          nuxt
          exact
        >
          {{ item.name }}
        </v-btn>
        <v-btn
          v-else
          :id="item.slug"
          :key="index"
          :title="item.name"
          :class="$style.link"
          class="ma-0 hidden-sm-and-down"
          text
          tile
        >
          {{ item.name }}
          <svg-icon name="arrowdown" style="width: 24px; height: 24px" />
        </v-btn>
      </template>
      <lazy-toolbar-catalog-menu
        v-if="!isMobile && isMounted"
        :items="menuItems[0].items"
        parent-slug="services"
      />

      <v-btn
        class="d-dlex"
        :href="`tel:${info.phone}`"
        :class="$style['link-tel']"
        title="Телефон"
        text
      >
        <svg-icon name="phone" style="width: 24px; height: 24px" />
        <span class="hidden-sm-and-down pl-2">{{ info.phone }}</span>
      </v-btn>
      <v-btn
        :class="$style['link-icon']"
        class="d-dlex"
        icon
        :href="`mailto:${info.email}`"
        title="Почта"
      >
        <svg-icon name="mail" style="width: 24px; height: 24px" />
      </v-btn>
      <v-btn
        class="hidden-md-and-up"
        icon
        title="Меню"
        @click.stop="$emit('show')"
      >
        <svg-icon name="menu" style="width: 24px; height: 24px" />
      </v-btn>
    </v-container>
  </div>
</template>
<style lang="scss" scoped module>
.appBar {
  height: 64px;
  margin-top: 0px;
  left: 0px;
  right: 0px;
  background-color: rgb(21, 19, 23);
  border-color: rgb(21, 19, 23);
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  position: fixed;
  top: 0;
  z-index: 5;
  @include md {
    height: 90px;
  }
}
.header {
  flex-wrap: nowrap !important;
}

.link,
.link-tel {
  font-size: 0.8rem !important;
}
.link {
  height: 100% !important;

  color: #f1f3ef;
  padding: 0 6px !important;
  @include md {
    padding: 0 8px !important;
  }
  @include lg {
    padding: 0 16px !important;
  }
}
.link-tel {
  height: 48px !important;
  width: 48px !important;
  display: flex;
  min-height: 48px !important;
  min-width: 48px !important;
  padding: 0;
  border-radius: 50%;
  @include md {
    height: 100% !important;
    width: unset !important;
    font-size: 0.8rem !important;
    color: #f1f3ef;
    border-radius: 0;
    padding: 0 8px !important;
  }
  @include lg {
    padding: 0 16px !important;
  }
}
.link-icon {
  height: 36px !important;
  width: 36px !important;
  display: flex;
}
@include sm {
  .link-icon {
    height: 48px !important;
    width: 48px !important;
  }
}
@include md {
  .link,
  .link-tel {
    font-size: 0.8rem !important;
    // padding: 0 6px !important;
  }
}
@include lg {
  .link,
  .link-tel {
    font-size: 0.85rem !important;
    // padding: 0 12px !important;
  }
}
</style>
<script>
// import Logo from "~/components/Logo.vue";

export default {
  // components: { Logo },
  data() {
    return {
      isMounted: false,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    menuItems() {
      return this.$store.getters.menuItems;
    },
    info() {
      return this.$store.state.info;
    },
    services() {
      return this.$store.state.services;
    },
  },

  mounted() {
    this.isMounted = true;
  },
};
</script>