<template>
  <div>
    <default-header :header="title" :breadcrumbs="breadcrumbs"></default-header>
    <section class="white">
      <v-container class="sectionWrapper">
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
            lg="4"
            :class="$style.contactsWrapper"
            class="pa-3"
          >
            <v-list style="background: transparent !important" light>
              <!-- href="tel:+74991120654">
            +7 (499) 112-06-54  -->
              <!-- :href="`tel:${info.phone}`" -->
              <!-- {{ info.phone }} -->
              <v-list-item
                title="Телефон"
                class="ct_hid"
                href="tel:+74991120654"
              >
                <v-list-item-icon>
                  <svg-icon name="phone" />
                </v-list-item-icon>
                <v-list-item-content itemprop="telephone">
                  <span class="phone-text">+7 (499) 112-06-54</span>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :href="`mailto:${info.email}`" title="email">
                <v-list-item-icon>
                  <svg-icon name="mail" />
                </v-list-item-icon>
                <v-list-item-content itemprop="email">
                  {{ info.email }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item title="Адрес">
                <v-list-item-icon>
                  <svg-icon name="pin" />
                </v-list-item-icon>
                {{ info.address }}
              </v-list-item>
              <v-list-item title="Время работы">
                <v-list-item-icon>
                  <svg-icon name="time" />
                </v-list-item-icon>
                {{ info.accessTime }}
              </v-list-item>
            </v-list>
          </v-col>
          <v-col
            cols="12"
            md="6"
            offset-lg="1"
            lg="7"
            :class="$style.yandexMapWrapper"
            class="pa-3"
          >
            <client-only>
              <map-component :coords="info.addressCoords" />
            </client-only>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.yandexMapWrapper {
  min-height: 400px;
  @include md {
    height: 300px;
    min-height: 300px;
  }
  @include lg {
    height: 400px;
    min-height: 400px;
  }
}
.contactsWrapper {
  display: flex;
  align-items: center;
}
</style>
<script>
import {
  // hydrateOnInteraction,
  // hydrateNever,
  hydrateWhenIdle,
  hydrateWhenVisible,
} from "vue-lazy-hydration";
// import LazyHydrate from "vue-lazy-hydration";

const title = "Контакты";
const description =
  "Для получения профессиональной консультации, оформления заявки на желаемую услугу достаточно позвонить по телефонному номеру, указанному на сайте, выслать запрос на электронную почту.";
export default {
  components: {
    DefaultHeader: hydrateWhenIdle(() =>
      import("~/components/DefaultHeader.vue")
    ),
    MapComponent: hydrateWhenVisible(() =>
      import("~/components/MapComponent.vue")
    ),
  },
  data() {
    return {
      title,
      imageBaseUrl: this.$config.imageBaseUrl,
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: title,
          to: "/contacts",
        },
      ],
    };
  },
  computed: {
    info() {
      return this.$store.state.info;
    },
  },
  head() {
    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.siteUrl + "/contacts",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: this.$config.siteUrl + "/contacts",
        },
      ],
    };
  },
};
</script>
