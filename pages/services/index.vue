<template>
  <div>
    <default-header header="УСЛУГИ" :breadcrumbs="breadcrumbs" />
    <section
      v-for="(service, i) in services"
      :key="`service-${i}`"
      :class="$style.servicesWrapper"
    >
      <v-container grid-list-lg fill-height class="py-12">
        <v-row align="center">
          <v-col :class="$style.serviceItem" class="py-12" cols="12">
            <img
              v-if="service.icon"
              :class="$style.servicesIcon"
              :src="imageBaseUrl + service.icon.url"
              :alt="service.name"
            />
            <div :class="$style.servicesTextWrapper" class="mb-7">
              <nuxt-link :to="`/services/${service.slug}`">
                <h2 :class="$style.serviceHeader" class="d-inline-block">
                  {{ service.name }}
                </h2>
              </nuxt-link>

              <div class="mb-7" v-html="service.descriptionLong"></div>
              <v-btn
                class="mb-3 mr-2"
                :to="`/services/${service.slug}`"
                outlined
                light
              >
                Подробнее
              </v-btn>
              <v-btn class="mb-3" outlined light @click="handleOffer(service)">
                Заказать работы
              </v-btn>
            </div>

            <ul v-if="service.child.length">
              <li v-for="child in service.child" :key="child.id">
                <nuxt-link :to="`/services/${service.slug}/${child.slug}`">
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
<style lang="scss" >
.breadcrumbs-item {
  a {
    color: white;
  }
}
</style>
<style lang="scss" scoped module>
.servicesWrapper {
  &:nth-child(odd) {
    background-color: #f4f4f4;
  }
  background-color: white;
  color: $black;
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
  .serviceItem {
    position: relative;
  }
  .servicesTextWrapper {
    // max-width: 50%;
    // background-color: black;
  }
  .servicesIcon {
    width: 50px;
    height: auto;
    position: absolute;
    right: 14px;
    opacity: 0.3;
  }
  .serviceHeader {
    font-weight: 500;
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

@include sm {
  .servicesWrapper {
    .servicesTextWrapper {
      max-width: 70%;
    }
    .servicesIcon {
      width: 25%;
    }
  }
}
@include md {
  .servicesWrapper {
    .servicesTextWrapper {
      max-width: 50%;
    }
    .servicesIcon {
      width: 27%;
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
import DefaultHeader from "~/components/DefaultHeader.vue";
export default {
  components: { DefaultHeader },
  async asyncData({ app, error }) {
    const client = app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: gql`
        {
          services(where: { isMain: true }) {
            name
            slug
            description
            descriptionLong
            metaDescrtiption
            icon {
              url
            }
            child {
              id
              name
              slug
            }
          }
        }
      `,
    });
    if (!data.services) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }
    return {
      services: data.services,
    };
  },

  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Услуги",
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
      title: "Услуги",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Наша организация оказывает широкий спектр современных и востребованных геодезических услуг. После проведения научных изысканий подготавливаются проектные документы, служащие основой по вопросам строительства объектов.",
        },
      ],
    };
  },
};
</script>
