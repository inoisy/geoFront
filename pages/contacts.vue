<template>
  <div>
    <default-header
      header="КОНТАКТЫ"
      :breadcrumbs="breadcrumbs"
    ></default-header>
    <section class="white">
      <v-container grid-list-lg>
        <v-row class="py-12">
          <v-col cols="12" md="6" lg="4" :class="$style.contactsWrapper">
            <v-list style="background: transparent !important" light>
              <v-list-item
                class
                title="telephone"
                :href="`tel:${info.phone}`"
                height="48"
              >
                <v-list-item-icon>
                  <!-- <phone-icon /> -->
                  <svg-icon name="phone" style="width: 24px; height: 24px" />
                </v-list-item-icon>
                <v-list-item-content itemprop="telephone">
                  {{ info.phone }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item :href="`mailto:${info.email}`" title="email">
                <v-list-item-icon>
                  <!-- <mail-icon /> -->
                  <svg-icon name="mail" style="width: 24px; height: 24px" />
                </v-list-item-icon>
                <v-list-item-content itemprop="email">
                  {{ info.email }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item title="Адрес">
                <v-list-item-icon>
                  <!-- <pin-icon /> -->
                  <svg-icon name="pin" style="width: 24px; height: 24px" />
                </v-list-item-icon>
                {{ info.address }}
              </v-list-item>
              <v-list-item title="Время работы">
                <v-list-item-icon>
                  <svg-icon name="time" style="width: 24px; height: 24px" />

                  <!-- <time-icon /> -->
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
          >
            <client-only>
              <yandex-map
                :class="$style.yandexMap"
                :coords="info.addressCoords"
                zoom="16"
                style=""
              >
                <ymap-marker
                  marker-id="1"
                  marker-type="placemark"
                  :coords="info.addressCoords"
                ></ymap-marker>
              </yandex-map>
            </client-only>
            <!--  -->
          </v-col>
        </v-row>
      </v-container>
    </section>
    <!-- <section class="grey lighten-4 black--text">
      <v-container grid-list-lg class="py-14">
        <v-row>
          <h2 class="mb-6">Свяжитесь с нами</h2>
          <contact-form :dark="false" />
        </v-row>
      </v-container>
    </section> -->
  </div>
</template>
<style lang="scss" scoped module>
.yandexMapWrapper {
  min-height: 400px;
  .yandexMap {
    width: 100%;
    height: 100%;
  }
}
.contactsWrapper {
  display: flex;
  align-items: center;
}
@include md {
  .yandexMapWrapper {
    height: 300px;
    min-height: 300px;
  }
}
@include lg {
  .yandexMapWrapper {
    height: 400px;
    min-height: 400px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Контакты",
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
  methods: {
    handleOffer() {
      // TODO
      return true;
    },
  },
  head() {
    return {
      title: "Контакты",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Для получения профессиональной консультации, оформления заявки на желаемую услугу достаточно позвонить по телефонному номеру, указанному на сайте, выслать запрос на электронную почту.",
        },
      ],
    };
  },
};
</script>
