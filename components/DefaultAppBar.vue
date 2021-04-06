<template>
  <header :class="$style.appBar" id="appBar">
    <v-container
      fill-height
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
          <svg-icon name="arrowdown" style="margin-right: -5px" />
        </v-btn>
      </template>
      <!-- href="tel:+74991120654">
            +7 (499) 112-06-54 -->
      <!-- :href="`tel:${info.phone}`" -->
      <!-- {{ info.phone }} -->
      <!-- <client-only> -->
      <v-btn
        class="d-dlex ct_hid"
        href="tel:+74991120654"
        :class="$style.linkTel"
        title="Телефон"
        text
      >
        <svg-icon name="phone" />
        <span :class="$style.linkTelText" class="pl-2">
          +7 (499) 112-06-54
        </span>
      </v-btn>
      <!-- </client-only> -->
      <!-- <a class="ct_hid" href="tel:+74991120654">+7 (499) 112-06-54</a> -->

      <v-btn
        :class="$style.linkIcon"
        class="d-dlex"
        icon
        :href="`mailto:${info.email}`"
        title="Почта"
      >
        <svg-icon name="mail" />
      </v-btn>
      <v-btn
        :class="$style.linkIcon"
        class="hidden-md-and-up"
        icon
        title="Меню"
        @click.stop="$emit('show')"
      >
        <svg-icon name="menu" />
      </v-btn>
      <lazy-toolbar-catalog-menu
        v-if="!isMobile && isMounted"
        :items="menuItems[0].items"
        parent-slug="services"
      />
    </v-container>
  </header>
</template>
<style lang="scss" scoped module>
.appBar {
  height: var(--toolbar-height);
  min-height: var(--toolbar-height);

  background-color: rgb(21, 19, 23);
  // border-color: rgb(21, 19, 23);
  // box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
  //   0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  // box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
  //   0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  position: fixed;
  top: 0;
  z-index: 250;
  margin-top: 0px;
  // transform: translateY(0px);
  left: 0px;
  right: 0px;
  --icon-size: 36px;
  --font-size: 14px;
  --padding: 6px;

  @include sm {
    --icon-size: 48px;
  }
  @include md {
    --padding: 8px;
  }
  @include lg {
    --font-size: 15px;
    --padding: 16px;
  }
  // @include md {

  // }
  .header {
    flex-wrap: nowrap !important;
    background-color: #151317;
  }

  .link,
  .linkTel {
    font-size: var(--font-size) !important;
  }
  .link {
    height: 100% !important;
    min-width: 100px;
    color: #f1f3ef;
    padding: 0 var(--padding) !important;
  }

  .linkTel {
    height: var(--icon-size) !important;
    width: var(--icon-size) !important;
    display: flex;
    min-height: var(--icon-size) !important;
    min-width: var(--icon-size) !important;
    padding: 0;
    border-radius: 50%;
    color: $white !important;
    font-size: var(--font-size);
    // @include sm {
    //   height: var(--icon-size) !important;
    //   width: var(--icon-size) !important;
    // }
    .linkTelText {
      display: none;
    }
    @include lg {
      height: 100% !important;
      width: unset !important;
      // font-size: 0.8rem !important;
      color: #f1f3ef;
      border-radius: 0;
      padding: 0 var(--padding) !important;
      .linkTelText {
        display: inline;
      }
    }
    // @include lg {
    //   padding: 0 16px !important;
    // }
  }
  .linkIcon {
    height: var(--icon-size) !important;
    width: var(--icon-size) !important;
    display: flex;
    color: $white !important;
  }
  .linkIcon + .linkIcon {
    margin-left: 5px;
  }
  .linkTel + .linkIcon {
    margin-left: 5px;
  }
  .link + .linkTel {
    margin-left: 5px;
  }
  // @include sm {
  //   .linkIcon {
  //     height: var(--icon-size) !important;
  //     width: var(--icon-size) !important;
  //   }
  // }
  // @include md {
  //   .link,
  //   .linkTel {
  //     font-size: 0.8rem !important;
  //     // padding: 0 6px !important;
  //   }
  // }
  // @include lg {
  //   .link,
  //   .linkTel {
  //     font-size: 0.85rem !important;
  //     // padding: 0 12px !important;
  //   }
  // }
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