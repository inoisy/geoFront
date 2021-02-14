<template>
  <v-footer
    :class="$style.footer"
    class="footer pt-4"
    dark
    height="auto"
    :style="`background-image: url(${require('~/assets/footerbg.jpg')})`"
  >
    <!-- v-intersect.once="onIntersect" -->
    <v-container grid-list-lg class="py-12">
      <v-row class="d-flex justify-center">
        <v-col cols="12" sm="6" md="6" lg="3">
          <logo :mini="true" class="mb-5" />
          <p style="font-weight: normal; font-size: 14px; line-height: 24px">
            {{ info.descriptor }}
          </p>
        </v-col>
        <v-col cols="12" sm="6" md="6" lg="3">
          <v-subheader class="hidden-sm-and-down">КОНТАКТЫ</v-subheader>
          <v-list style="background: transparent !important">
            <v-list-item
              class
              title="Телефон"
              :href="`tel:${info.phone}`"
              height="48"
            >
              <v-list-item-icon>
                <svg-icon name="phone" style="width: 24px; height: 24px" />
              </v-list-item-icon>
              <v-list-item-content itemprop="telephone">
                {{ info.phone }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item :href="`mailto:${info.email}`" title="email">
              <v-list-item-icon>
                <svg-icon name="mail" style="width: 24px; height: 24px" />
              </v-list-item-icon>
              <v-list-item-content itemprop="email">
                {{ info.email }}
              </v-list-item-content>
            </v-list-item>
            <v-list-item title="Адрес">
              <v-list-item-icon>
                <svg-icon name="pin" style="width: 24px; height: 24px" />
              </v-list-item-icon>
              <v-list-item-content>
                <span style="font-size: 12px">
                  {{ info.address }}
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="hidden-sm-and-down" cols="12" sm="6" md="6" lg="3">
          <v-subheader>НАВИГАЦИЯ</v-subheader>
          <v-list
            style="background: transparent !important"
            class="footer-list"
          >
            <v-list-item
              v-for="menuItem in menuItems"
              :key="menuItem.slug"
              :to="`${menuItem.slug}`"
              :title="menuItem.name"
              exact
            >
              {{ menuItem.name }}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col class="hidden-sm-and-down" cols="12" sm="6" md="6" lg="3">
          <v-subheader>УСЛУГИ</v-subheader>
          <v-list
            style="background: transparent !important"
            class="footer-list"
          >
            <v-list-item
              v-for="service in services"
              :key="service.slug"
              :to="`/services/${service.slug}`"
              :title="service.name"
              exact
            >
              {{ service.name }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style lang="scss" scoped module>
.footer {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 80% 50%;
  // background-image: url(/footerbg.jpg);
  @include sm {
    background-position: 90% 50%;
  }
  @include md {
    background-position: 100% 50%;
  }
}
</style>
<script>
// import Logo from "~/components/Logo.vue";
export default {
  // components: { Logo },
  computed: {
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