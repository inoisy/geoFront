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
        <v-menu
          v-if="item.items && item.items.length > 0"
          :key="index"
          :class="$style.link"
          class="fill-height hidden-sm-and-down"
          style="height: 100%"
          allow-overflow
          open-on-hover
          offset-y
          left
          z-index="3000"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              slot="activator"
              :class="$style.link"
              class="fill-height ma-0 header-link hidden-sm-and-down"
              style="height: 100%"
              text
              tile
              nuxt
              :to="item.slug"
              :title="item.name"
              v-on="on"
            >
              {{ item.name }}
              <svg-icon name="arrowdown" style="width: 24px; height: 24px" />
            </v-btn>
          </template>
          <v-list>
            <template v-for="(category, i) in item.items">
              <template v-if="category.children && category.children.length">
                <v-list-item
                  :key="'list-group' + i"
                  :to="`/services/${category.slug}`"
                  :title="category.name"
                  :class="$style.link"
                  class="list-item"
                >
                  <span style="line-height: normal; font-size: 15px">
                    {{ category.name }}
                  </span>
                </v-list-item>
                <v-list-item
                  v-for="child in category.children"
                  :key="child.id"
                  :to="`/services/${child.slug}`"
                  :title="child.name"
                  :class="$style.link"
                  class="list-item"
                >
                  <span class="pl-4">{{ child.name }}</span>
                </v-list-item>
              </template>
              <v-list-item
                v-else
                :key="i"
                :class="$style.link"
                class="list-item"
                nuxt
                :to="`${item.slug}/${category.slug}`"
                :title="category.name"
              >
                {{ category.name }}
              </v-list-item>
            </template>
          </v-list>
        </v-menu>

        <v-btn
          v-else
          :key="index"
          :to="item.slug"
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
      </template>

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
import Logo from "~/components/Logo.vue";

export default {
  components: { Logo },
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
};
</script>