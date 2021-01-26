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
        <logo class="pr-3" />

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
                    :class="$style['link']"
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
          class="d-dlex"
          :href="`tel:${info.phone}`"
          :class="$style['link-tel']"
          text
        >
          <!-- icon           -->
          <svg-icon name="phone" style="width: 24px; height: 24px" />

          <span class="hidden-sm-and-down pl-2">{{ info.phone }}</span>
        </v-btn>
        <v-btn
          :class="$style['link-icon']"
          class="d-dlex"
          icon
          :href="`mailto:${info.email}`"
        >
          <svg-icon name="mail" style="width: 24px; height: 24px" />
        </v-btn>
        <v-btn class="hidden-md-and-up" icon @click.stop="drawer = !drawer">
          <svg-icon name="menu" style="width: 24px; height: 24px" />
        </v-btn>
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
              {{ info.descriptor }}
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
              <v-list-item title="address">
                <v-list-item-icon>
                  <svg-icon name="pin" style="width: 24px; height: 24px" />
                </v-list-item-icon>
                <v-list-item-content>
                  <span style="font-size: 0.8rem">
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
    <v-fab-transition>
      <v-btn
        :class="$style.floatingButton"
        color="black"
        dark
        fixed
        bottom
        right
        fab
        large
        @click="handleOffer"
      >
        <svg width="26" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13 0C5.82 0 0 4.925 0 11c0 2.676 1.132 5.126 3.01 7.033.038.095 1.001 2.574-1.852 5.102a.5.5 0 0 0 .45.853c2.875-.17 5.335-1.597 6.837-2.697 1.42.45 2.95.709 4.555.709 7.18 0 13-4.925 13-11S20.18 0 13 0zm0 4.5a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 13 4.5zM12 10h2v7h-2v-7z"
            fill="#FFF"
            fill-rule="nonzero"
          ></path>
        </svg>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>
<style lang="scss" scoped module>
.floatingButton {
  width: 64px;
  height: 64px;
  &:before {
    content: "";
    width: 76px;
    height: 76px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    background: transparent;
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    animation: z-widget-simple-btn-pulse infinite 2s linear;
  }
}
@keyframes z-widget-simple-btn-pulse {
  0% {
    width: 70px;
    height: 70px;
  }
  50% {
    width: 100px;
    height: 100px;
  }
  100% {
    width: 70px;
    height: 70px;
  }
}
.footer {
  @include bg(url(~assets/images/footerbg.jpg));
  background-position: 80% 50%;
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
import Logo from "~/components/Logo";

export default {
  components: {
    Logo,
  },
  data() {
    return {
      companyName: "GEOWORKS",
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
  methods: {
    handleOffer() {
      this.$store.dispatch("showDialog", {
        name: "",
        isShow: true,
      });
      return true;
    },
  },
};
</script>
