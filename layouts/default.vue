<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      fixed
      right
      touchless
      class="pt-2"
      width="240px"
    >
      <v-subheader>НАВИГАЦИЯ</v-subheader>
      <v-list class="pt-0">
        <template v-for="item in menuItems">
          <v-list-item
            :key="item.name"
            :to="item.slug"
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

    <v-app-bar
      color="#151317"
      fixed
      app
      class="main-header"
      :height="isMobile ? 64 : 90"
    >
      <v-container
        fill-height
        grid-list-lg
        :class="$style['header']"
        class="py-0 d-flex align-center"
      >
        <logo />

        <template v-for="(item, index) in menuItems">
          <v-menu
            v-if="item.items && item.items.length > 0"
            :key="index"
            :class="$style['link']"
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
                :class="$style['link']"
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
                <arrow-down-icon />
                <!-- <v-icon>arrow_drop_down</v-icon> -->
              </v-btn>
            </template>
            <v-list>
              <template v-for="(category, i) in item.items">
                <template v-if="category.children && category.children.length">
                  <v-list-item
                    :key="'list-group' + i"
                    :to="`/services/${category.slug}`"
                    :title="category.name"
                    :class="$style['link']"
                    class="list-item"
                  >
                    <span style="line-height: normal; font-size: 15px">{{
                      category.name
                    }}</span>
                  </v-list-item>
                  <v-list-item
                    v-for="child in category.children"
                    :key="child.id"
                    :to="`/services/${child.slug}`"
                    :title="child.name"
                    :class="$style['link']"
                    class="list-item"
                  >
                    <span class="pl-4">{{ child.name }}</span>
                  </v-list-item>
                </template>
                <v-list-item
                  v-else
                  :key="i"
                  :class="$style['link']"
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
            :class="$style['link']"
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
          :class="$style['link-icon']"
          class="d-dlex"
          icon
          :href="`tel:${info.phone}`"
        >
          <phone-icon />
        </v-btn>
        <v-btn
          :class="$style['link-icon']"
          class="d-dlex"
          icon
          :mailto="`tel:${info.email}`"
        >
          <mail-icon />
        </v-btn>
        <!-- <v-btn :class="$style['link-icon']" class="d-dlex" icon>
          <search-icon />
        </v-btn> -->
        <v-btn class="hidden-md-and-up" icon @click.stop="drawer = !drawer">
          <menu-icon />
        </v-btn>
        <!-- </div> -->
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer :class="$style.footer" class="footer pt-4" dark height="auto">
      <v-container grid-list-lg class="py-12">
        <v-row class="d-flex justify-center">
          <v-col cols="12" sm="6" md="6" lg="3">
            <logo :mini="true" class="mb-5" />
            <p style="font-weight: normal; font-size: 14px; line-height: 24px">
              Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl
              nunc quam ac sed turpis volutpat. Cursus sed massa non nisi,
              placerat.
            </p>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="3">
            <v-subheader class="hidden-sm-and-down">КОНТАКТЫ</v-subheader>
            <v-list style="background: transparent !important">
              <v-list-item
                class
                title="telephone"
                :href="`tel:${info.phone}`"
                height="48"
              >
                <v-list-item-icon>
                  <phone-icon />
                </v-list-item-icon>
                <v-list-item-content itemprop="telephone">{{
                  info.phone
                }}</v-list-item-content>
              </v-list-item>
              <v-list-item :href="`mailto:${info.email}`" title="email">
                <v-list-item-icon>
                  <mail-icon />
                </v-list-item-icon>
                <v-list-item-content itemprop="email">
                  {{ info.email }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item title="address">
                <v-list-item-icon>
                  <pin-icon />
                </v-list-item-icon>
                <v-list-item-content
                  ><span style="font-size: 0.8rem">{{ info.address }}</span>
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
                :to="menuItem.slug"
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
    <default-dialog></default-dialog>
  </v-app>
</template>
<style lang="scss" scoped module>
.footer {
  @include bg(url(~assets/images/footerbg.jpg));
  background-position: 80% 50%;
}
.header {
  flex-wrap: nowrap !important;
}

.link {
  height: 100% !important;
  font-size: 0.8rem !important;
  // padding: 0 8px !important;
  color: #f1f3ef;
  // display: flex;
}
.link-icon {
  height: 36px !important;
  width: 36px !important;
  display: flex;
}
@include sm {
  .footer {
    background-position: 90% 50%;
  }
  .link-icon {
    height: 48px !important;
    width: 48px !important;
  }
}
@include md {
  .footer {
    background-position: 100% 50%;
  }
  .link {
    font-size: 0.8rem !important;
    // padding: 0 6px !important;
  }
}
@include lg {
  .link {
    font-size: 0.85rem !important;
    // padding: 0 12px !important;
  }
}
</style>
<script>
import Logo from "~/components/Logo";
import MenuIcon from "~/assets/icons/menu.svg?inline";
import ArrowDownIcon from "~/assets/icons/arrowDown.svg?inline";
import MailIcon from "~/assets/icons/mail.svg?inline";
import PhoneIcon from "~/assets/icons/phone.svg?inline";
import PinIcon from "~/assets/icons/pin.svg?inline";
// import SearchIcon from "~/assets/icons/search.svg?inline";

export default {
  components: {
    Logo,
    MenuIcon,
    ArrowDownIcon,
    MailIcon,
    PhoneIcon,
    PinIcon,
    // SearchIcon,
  },
  data() {
    return {
      companyName: "GEOWORKS",

      // contacts: {
      //   phone: "+1111",
      //   email: "dsda@sdas.re",
      //   accessTime: "sda",
      //   address: "dsad",
      // },

      drawer: false,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    services() {
      return this.$store.state.services;
    },
    menuItems() {
      return [
        {
          name: "Главная",
          slug: "/",
        },
        {
          name: "Услуги",
          slug: "/services",
          items: this.services,
        },
        {
          name: "О компании",
          slug: "/about",
        },
        {
          name: "Контакты",
          slug: "/contacts",
        },
      ];
    },
    info() {
      return this.$store.state.info;
    },
  },
};
</script>
