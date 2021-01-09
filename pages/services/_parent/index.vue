<template>
  <div>
    <service-header
      :breadcrumbs="breadcrumbs"
      :header="service.name"
      :subheader="service.subheader"
      :icon="service.icon"
    ></service-header>
    <section class="content-wrapper white">
      <v-container grid-list-lg>
        <v-row>
          <v-col :class="$style.asideMenuWrapper" cols="12">
            <v-card :class="$style.asideMenu" light>
              <v-list color="transparent" dense light>
                <v-list-item
                  v-for="child in service.child"
                  :key="child.id"
                  :to="`/services/${service.slug}/${child.slug}`"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="child.name"> </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <div v-html="service.content"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section
      v-for="(service, i) in service.child"
      :key="`service-text-${i}`"
      :class="$style.serviceFeatureWrapper"
    >
      <v-container grid-list-lg class="py-12">
        <template>
          <v-row :class="$style.serviceFeatureRow" justify="center">
            <v-col
              :class="$style.serviceFeatureTextWrapper"
              cols="12"
              md="6"
              class=""
            >
              <h2 :class="$style.serviceFeatureHeader">
                {{ service.name }}
              </h2>
              <div
                :class="$style.serviceFeatureContent"
                class="mb-5"
                v-html="service.description"
              ></div>
              <div>
                <v-btn
                  class="mb-3 mr-2 d-inline-flex"
                  :to="`/services/${service.parent[0].slug}/${service.slug}`"
                  outlined
                  light
                >
                  Подробнее
                </v-btn>
                <v-btn
                  class="mb-3 mr-2 d-inline-flex"
                  outlined
                  light
                  @click="handleOffer(service.name)"
                >
                  Заказать
                </v-btn>
              </div>
            </v-col>
            <v-col
              v-if="service.img"
              :class="$style.serviceFeatureImgWrapper"
              cols="12"
              md="6"
            >
              <v-img
                :class="$style.serviceFeatureImg"
                :src="
                  service.img && service.img.url
                    ? imageBaseUrl + service.img.url
                    : require('~/assets/icons/no-camera.svg')
                "
                :alt="service.name"
                :aspect-ratio="14 / 9"
                max-height="300px"
            /></v-col>
          </v-row>
        </template>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.asideMenuWrapper {
  // flex-direction: column-reverse;
  // display: flex;

  .asideMenu {
    max-width: 100%;
    margin-bottom: 50px;
    // float: right;
    // margin-left: 30px;
    // margin-bottom: 30px;
  }
}

@include md {
  .asideMenuWrapper {
    display: block;
    .asideMenu {
      // margin-top: 0px;
      max-width: 30%;
      float: right;
      margin-left: 30px;
      margin-bottom: 30px;
    }
  }
}
// &:nth-child(odd) {
//     background-color: gray;
//   }
.serviceFeatureWrapper {
  background-color: white;
  &:nth-child(odd) {
    background-color: $gray;
    .serviceFeatureRow {
      flex-direction: row-reverse;
    }
  }

  .serviceFeatureRow {
    .serviceFeatureImgWrapper {
      display: flex;
      align-items: center;
      .serviceFeatureImg {
        border-radius: 3px;
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 100%;
        display: block;
        @include sm {
          width: 65%;
          max-width: 65%;
        }
        @include md {
          width: 100%;
          max-width: 100%;
        }
      }
    }
    .serviceFeatureTextWrapper {
      color: #18191f;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .serviceFeatureHeader {
        font-weight: 600;
        font-size: 32px;
        margin-bottom: 24px;
        line-height: 125%;
      }
      .serviceFeatureContent {
        font-weight: 300;
        // font-size: 16px;
        line-height: 150%;
      }
    }

    @include md {
      .serviceFeatureImgWrapper {
        padding-left: 8.33333%;
      }
      // padding-left: 8.33333%;
      // &:nth-child(odd) {
      //   .serviceFeatureImgWrapper {
      //     padding-right: 8.33333%;
      //     padding-left: 12px;
      //   }
      // }
    }
  }
  @include md {
    &:nth-child(odd) {
      .serviceFeatureRow {
        .serviceFeatureImgWrapper {
          padding-right: 8.33333%;
          padding-left: 12px;
        }
      }
    }
  }
}
</style>
<script>
import gql from "graphql-tag";

export default {
  async asyncData({ params, app, error }) {
    const client = app.apolloProvider.defaultClient;
    const { data } = await client.query({
      variables: {
        slug: params.parent,
      },
      query: gql`
        query ServicesQuery($slug: String!) {
          services(where: { slug: $slug }) {
            name
            slug
            description
            subheader
            metaDescrtiption
            content
            icon {
              url
            }
            child {
              id
              name
              slug
              description
              parent {
                slug
              }
              img {
                url
              }
            }
          }
        }
      `,
    });
    if (!data.services || !data.services.length) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }
    return {
      // slug: params.parent,
      service: data.services[0],
    };
  },
  data() {
    return {
      imageBaseUrl: this.$config.imageBaseUrl,
    };
  },

  computed: {
    breadcrumbs() {
      return [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Услуги",
          to: "/services",
        },
        {
          text: this.service.name,
          to: this.service.slug,
        },
      ];
    },
  },
  methods: {
    handleOffer(serviceName) {
      this.$store.dispatch("showDialog", {
        name: serviceName,
        isShow: true,
      });
      // return true;
    },
  },
};
</script>
