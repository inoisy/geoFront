<template>
  <div>
    <LazyHydrate when-idle>
      <default-header :header="title" :breadcrumbs="breadcrumbs" />
    </LazyHydrate>
    <section
      v-for="(service, i) in services"
      :key="`service-${i}`"
      :class="$style.servicesWrapper"
      class="sectionWrapper"
    >
      <v-container fill-height>
        <v-row align="center" no-gutters>
          <v-col :class="$style.serviceItem" class="pa-3" cols="12">
            <v-img
              v-if="service.icon"
              :class="$style.servicesIcon"
              :src="imageBaseUrl + service.icon.url"
              :alt="service.name"
            />
            <div :class="$style.servicesTextWrapper" class="mb-7">
              <nuxt-link
                :to="`/services/${service.slug}`"
                :title="service.name"
              >
                <h2 :class="$style.serviceHeader" class="d-inline-block">
                  {{ service.name }}
                </h2>
              </nuxt-link>

              <div class="mb-7" v-html="service.descriptionLong"></div>
              <div :class="$style.buttonWrapper">
                <v-btn
                  :class="$style.button"
                  class="mb-3"
                  :to="`/services/${service.slug}`"
                  title="Подробнее"
                  outlined
                  light
                >
                  Подробнее
                </v-btn>
                <v-btn
                  :class="$style.button"
                  outlined
                  light
                  title="Заказать работы"
                  @click="handleOffer(service)"
                >
                  Заказать работы
                </v-btn>
              </div>
            </div>

            <ul v-if="service.child && service.child.length">
              <li v-for="child in service.child" :key="child.id">
                <nuxt-link
                  :title="child.name"
                  :to="`/services/${service.slug}/${child.slug}`"
                >
                  {{ child.name }}
                </nuxt-link>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.servicesWrapper {
  // padding-top: 6rem;
  // padding-bottom: 5rem;
  &:nth-child(2n + 1) {
    background-color: #f4f4f4;
  }
  // background-color: white;
  // color: $black;
  a {
    text-decoration: none;
  }
  ul {
    list-style: square inside url("~assets/icons/bullet.svg");
    padding-left: 0px;
    li {
      margin-bottom: 15px;
      a {
        color: $black;
        &:hover {
          color: $accent;
        }
      }
    }
  }
  .buttonWrapper {
    display: flex;
    flex-wrap: wrap;
    @include sm {
      flex-wrap: nowrap;
      .button + .button {
        margin-left: 10px;
      }
    }
    .button {
      flex: 1 1 100%;
      @include sm {
        flex: 0 0 190px;
      }
    }
  }

  .serviceItem {
    position: relative;
  }
  --icon-size: 100px;
  .servicesIcon {
    width: var(--icon-size);
    height: var(--icon-size);
    // position: absolute;
    float: right;
    margin-bottom: 10px;
    margin-left: 10px;
    // right: 14px;
    opacity: 0.3;
    @include sm {
      --icon-size: 150px;
    }
  }
  .serviceHeader {
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
    color: $black;
    position: relative;
    margin-bottom: 40px;
    &:hover {
      color: $accent;
    }
    &:after {
      content: "";
      display: block;
      height: 1px;
      width: 90px;
      background-color: $black;
      position: absolute;
      top: 40px;
    }
  }
}

// @include sm {
//   .servicesWrapper {
//     .servicesTextWrapper {
//       max-width: 70%;
//     }
//     .servicesIcon {
//       width: 25%;
//       height: auto;
//     }
//   }
// }
@include md {
  .servicesWrapper {
    .servicesTextWrapper {
      max-width: 60%;
    }
    .servicesIcon {
      width: 27%;
      height: auto;
    }
  }
}
@include lg {
  .servicesWrapper {
    .servicesTextWrapper {
      max-width: 60%;
    }
    .servicesIcon {
      width: 20%;
    }
  }
}
</style>
<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";

const title = "Услуги";
const description =
  "Наша организация оказывает широкий спектр современных и востребованных геодезических услуг. После проведения научных изысканий подготавливаются проектные документы, служащие основой по вопросам строительства объектов.";
export default {
  components: {
    LazyHydrate,
  },
  async asyncData({ app, error }) {
    const {
      data: { services },
    } = await app.apolloProvider.defaultClient.query({
      query: gql`
        {
          services(where: { isMain: true }) {
            name
            slug
            descriptionLong
            icon {
              url
            }
            child(sort: "name:asc") {
              name
              slug
            }
          }
        }
      `,
    });
    if (!services) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }

    return {
      services, // : services, // Object.freeze(services), // services.forEach(Object.freeze),
    };
  },

  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
      title,
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: title,
          to: "/services",
        },
      ],
    };
  },
  methods: {
    handleOffer(service) {
      this.$store.dispatch("showDialog", {
        name: service.name,
        isShow: true,
      });
      return true;
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
          content: this.$config.siteUrl + "/services",
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
          href: this.$config.siteUrl + "/services",
        },
      ],
    };
  },
};
</script>
