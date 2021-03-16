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
      <v-container>
        <v-row align="center" no-gutters>
          <v-col class="pa-3" cols="12">
            <nuxt-link :to="`/services/${service.slug}`" :title="service.name">
              <h2 :class="$style.serviceHeader" class="d-inline-block">
                {{ service.name }}
              </h2>
            </nuxt-link>

            <prices
              v-if="service.prices"
              :class="$style.prices"
              :content="service.prices"
            />
            <div
              v-for="child in service.child"
              :key="child.id"
              :class="$style.childWrapper"
              class="position-relative"
            >
              <div class="mb-6">
                <nuxt-link
                  :class="$style.childLink"
                  :title="child.name"
                  :to="`/services/${service.slug}/${child.slug}`"
                >
                  <h2 :class="$style.childName">{{ child.name }}</h2>
                </nuxt-link>
              </div>

              <prices
                v-if="child.prices"
                :class="$style.prices"
                :content="child.prices"
              />
              <div v-else-if="child.price" :class="$style.price">
                {{ child.price }}
              </div>
              <v-btn
                :class="$style.button"
                class="callToActionButton"
                outlined
                light
                title="Заказать"
                @click="handleOffer(child)"
              >
                Заказать
              </v-btn>
              <v-img
                v-if="child.icon"
                :class="$style.servicesIcon"
                :src="imageBaseUrl + child.icon.url"
                :alt="child.name"
              />
            </div>
          </v-col>
        </v-row>

        <!-- <svg-icon
                      name="bullet"
                      style="width: 13px; height: 13px"
                    ></svg-icon> -->
        <!-- <v-col cols="12" pa-3>
            {{ services }} -->

        <!-- <LazyHydrate never>
              <content-wrapper :content="page.content" />
            </LazyHydrate> -->
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
.servicesWrapper {
  // padding-top: 6rem;
  padding-bottom: 6rem;
  --button-color: 93 93 93;
  &:nth-child(2n + 1) {
    background-color: #f4f4f4;
    --content-color: white;
  }
  // background-color: white;
  // color: $black;
  .childWrapper {
    .childName {
      font-size: 2rem;
      line-height: 125%;
      display: inline;
    }
    // .prices{
    //   & ~ .button
    // }
    .button {
      margin-top: 2rem;
      width: 100%;
      box-shadow: 0 2px 10px rgba(100, 100, 100, 0.65);
      @include sm {
        width: auto;
        min-width: 180px;
      }
      @include md {
        min-width: 220px;
      }
    }
    .price {
      font-weight: bold;
      font-size: 1.7rem;
      margin-top: -10px;
      color: rgba($black, 0.87);
      // & + .button {
      //   margin-bottom: 10px;
      // }
    }
    & + .childWrapper {
      margin-top: 4.5rem;
      @include md {
        margin-top: 6rem;
      }
    }
    .childLink {
      text-decoration: none;
      color: $black;
      &:hover {
        color: $accent;
      }
    }
  }

  // ul {
  //   list-style: square inside url("~assets/icons/bullet.svg");
  //   padding-left: 0px;
  //   li {
  //     margin-bottom: 15px;
  //     a {
  //       color: $black;
  //       &:hover {
  //         color: $accent;
  //       }
  //     }
  //   }
  // }
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

  // .serviceItem {
  //   position: relative;
  // }
  --icon-size: 100px;
  .servicesIcon {
    width: var(--icon-size);
    height: var(--icon-size);
    // position: absolute;
    float: right;
    margin-bottom: 10px;
    margin-left: 10px;
    // right: 14px;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.05;
    @include sm {
      --icon-size: 150px;
    }
  }
  .serviceHeader {
    font-weight: 600;
    font-size: 2.5rem;
    text-transform: uppercase;
    color: $black;
    position: relative;
    margin-bottom: 5rem;
    @include md {
      font-size: 3rem;
    }
    &:hover {
      color: $accent;
      &:after {
        background-color: $accent;
      }
    }
    &:after {
      content: "";
      display: block;
      height: 2px;
      width: 120px;
      background-color: $black;
      position: absolute;
      bottom: -8px;
      left: 3px;
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
// @include md {
//   .servicesWrapper {
//     // .servicesTextWrapper {
//     //   max-width: 60%;
//     // }
//     .servicesIcon {
//       width: 27%;
//       height: auto;
//     }
//   }
// }
// @include lg {
//   .servicesWrapper {
//     // .servicesTextWrapper {
//     //   max-width: 60%;
//     // }
//     .servicesIcon {
//       width: 20%;
//     }
//   }
// }
</style>

<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";

// import DefaultHeader from "~/components/DefaultHeader.vue";

const title = "Цены";
export default {
  components: {
    LazyHydrate,
  },
  async asyncData({
    params,
    app: {
      apolloProvider: { defaultClient: apolloClient },
    },
    error,
  }) {
    // const client = ;
    const {
      data: { services },
    } = await apolloClient.query({
      variables: {
        slug: params.parent,
      },
      query: gql`
        query ServicePricesQuery {
          services(where: { isMain: true }, sort: "name:asc") {
            name
            slug
            icon {
              url
            }
            prices
            child(
              limit: 999
              where: { _or: [{ price_null: false }, { prices_null: false }] }
              sort: "prices:desc,name:asc"
            ) {
              id
              icon {
                url
              }
              name
              slug
              prices
              price
            }
          }
        }
      `,
    });

    if (!services || !services.length) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }
    // const { child, ...service } = services[0];
    // const children = child.reduce((acc, val) => {
    //   acc.push({
    //     ...val,
    //     img: calculateImageUrl(val.img),
    //   });
    //   return acc;
    // }, []);
    // console.log("prices ", services);

    return {
      services: services, //.filter((item) => item.child.length),
      // .reduce((acc, item) => {
      //   const { child, ...itemData } = item;
      //   const child = Object.assign({})
      //   console.log("🚀 ~ file: prices.vue ~ line 325 ~ .reduce ~ itemData", {
      //     ...itemData,
      //     child: child.sort((a, b) => a.price > b.price),
      //   });
      //   // acc.push();
      //   acc.push(item);
      //   return acc;
      // }, []), // TODO
      // service,
      // children: child.reduce((acc, val) => {
      //   acc.push({
      //     ...val,
      //     img: calculateImageUrl(val.img),
      //   });
      //   return acc;
      // }, []), // Object.freeze(services[0]),
      // breadcrumbs: [
      //   {
      //     text: "Главная",
      //     to: "/",
      //   },
      //   {
      //     text: "Услуги",
      //     to: "/services",
      //   },
      //   {
      //     text: service.name,
      //     to: service.slug,
      //   },
      // ],
    };
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
          //   to: "/about",
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
  // methods: {
  //   handleOffer() {
  //     return true;
  //   },
  // },
  head() {
    return {
      title,
      meta: [
        // {
        //   hid: "description",
        //   name: "description",
        //   content: this.page.metaDescription || `${title} - GeoWorks`,
        // },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.siteUrl + this.$route.path,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        // {
        //   hid: "og:description",
        //   property: "og:description",
        //   content: this.page.metaDescription || `${title} - GeoWorks`,
        // },
      ],
      link: [
        {
          rel: "canonical",
          href: this.$config.siteUrl + "/prices",
        },
      ],
    };
  },
};
</script>
