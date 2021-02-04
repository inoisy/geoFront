<template>
  <div class="white text--black">
    <section :class="$style['first-section']">
      <v-container grid-list-lg fill-height class="py-12">
        <v-row justify="center" align="center">
          <v-col cols="12" sm="10" md="10" lg="7">
            <h1 :class="$style.header" class="mb-5 text-center">
              {{ page.header }}
            </h1>
            <p :class="$style.subheader" class="text-center mb-6">
              {{ page.subheader }}
            </p>
            <v-btn
              id="main-screen-btn"
              class="mx-auto d-flex"
              x-large
              outlined
              @click="handleOffer(false)"
            >
              Оставить заявку
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section>
      <v-container grid-list-lg style="position: relative">
        <v-row
          justify="center"
          align="center"
          :class="$style.serviceCardWrapper"
        >
          <v-col
            v-for="(service, i) in services"
            :key="`service-card-${i}`"
            class="mb-3"
            cols="12"
            sm="10"
            md="4"
          >
            <v-card
              :to="`/services/${service.slug}`"
              :class="$style.serviceCard"
              :title="service.name"
              class="px-6 py-4"
              light
            >
              <div
                :class="$style.serviceImgWrapper"
                class="d-flex align-center mb-2"
              >
                <v-img
                  :src="
                    service.icon
                      ? $config.imageBaseUrl + service.icon.url
                      : '/no-camera.svg'
                  "
                  :alt="service.name"
                  class="d-block mx-auto"
                  width="55px"
                  height="55px"
                />
              </div>
              <h2 :class="$style.serviceCardHeader" class="mb-2">
                {{ service.name }}
              </h2>
              <p :class="$style.serviceCardDescription">
                {{ service.description }}
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <LazyHydrate
      v-for="(service, i) in services"
      :key="`service-${i}`"
      when-visible
    >
      <service-feature
        :header="service.info.header"
        :content="service.info.content"
        :img="service.info.img"
        :slug="`/services/${service.slug}`"
        :name="service.name"
      ></service-feature>
    </LazyHydrate>
    <LazyHydrate when-visible>
      <steps :steps="page.steps" class="mt-12" />
    </LazyHydrate>
    <LazyHydrate when-visible>
      <benefits :benefits="page.benefits" />
    </LazyHydrate>
  </div>
</template>
<style lang="scss" scoped module>
.first-section {
  min-height: 610px;
  > div {
    min-height: inherit;
  }
  @include bg(
    linear-gradient(180deg, rgba(0, 0, 0, 0.68) 0%, rgba(0, 0, 0, 0) 100%),
    linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url(/bg.jpg)
  );
  background-position: 80%;
}
.header {
  font-size: 2rem;
  line-height: 125%;
}
.subheader {
  font-size: 1rem;
}
.serviceCardWrapper {
  margin-top: -50px;
}
.serviceCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;

  width: 100%;
  color: #18191f;
  text-align: center;
  // transition-duration: 2s;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.24) !important;
  // transition: all;
  box-sizing: inherit;
  transition-property: all;
  transition-duration: 0.6s;
  transition-timing-function: ease;
  &:hover {
    box-shadow: 4px 4px 25px 4px rgba(0, 0, 0, 0.25) !important;
    transform: translateY(-5px);
    transform-origin: center;
    // transition-duration: 2s;
  }
  .serviceImgWrapper {
    min-height: 80px;
  }
  .serviceCardHeader {
    font-weight: 600;
    font-size: 22px;
    text-transform: uppercase;
    color: #18191f;
  }
  .serviceCardDescription {
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;

    margin: 0;
    color: #18191f;
    font-weight: 300;
  }
  @include sm {
    .serviceCardDescription {
      font-size: 14px;
    }
  }
  @include md {
    .serviceImgWrapper {
      min-height: 100px;
    }
    .serviceCardDescription {
      font-size: 16px;
    }
  }
}

.serviceFeatureRow {
  .serviceFeatureImgWrapper {
    display: flex;
    align-items: center;
    .serviceFeatureImg {
      border-radius: 3px;
      box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 100%;
      display: block;
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
      font-size: 16px;
      line-height: 150%;
    }
  }
  &:nth-child(odd) {
    flex-direction: row-reverse;
  }
  @include md {
    .serviceFeatureImgWrapper {
      padding-left: 8.33333%;
    }
    // padding-left: 8.33333%;
    &:nth-child(odd) {
      .serviceFeatureImgWrapper {
        padding-right: 8.33333%;
        padding-left: 12px;
      }
    }
  }
}

@include sm {
  .header {
    font-size: 36px;
  }
  .subheader {
    font-size: 18px;
  }
  .first-section {
    background-position: 70%;
  }
}
@include md {
  .first-section {
    background-position: center;
  }
}
@include lg {
  .header {
    font-size: 48px;
  }
}
</style>
<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";
// import ServiceFeature from "~/components/ServiceFeature.vue";
// import Steps from "~/components/Steps.vue";
// import Benefits from "~/components/Benefits.vue";

export default {
  components: {
    LazyHydrate,
    // ServiceFeature,
    // Steps,
    // Benefits,
  },
  async asyncData(ctx) {
    const client = ctx.app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: gql`
        {
          services(where: { isMain: true }) {
            name
            slug
            description
            icon {
              url
            }
            info {
              header
              content
              img {
                url
                formats
              }
            }
          }
          mainPage {
            title
            metaDescription
            content
            header
            subheader
            benefits {
              header
              content
              icon {
                url
              }
            }
            steps {
              header
              content
              icon {
                url
              }
              order
            }
          }
        }
      `,
    });
    if (!data.mainPage) {
      return ctx.error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }

    // return this.arrays;
    data.mainPage.steps = data.mainPage.steps.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    // console.log("🚀 ~ file: index.vue ~ line 265 ~ asyncData ~ data", data);
    return {
      page: data.mainPage,
      services: data.services,
    };
  },
  data() {
    return {
      // imageBaseUrl: this.$config.imageBaseUrl,
      showExample: false,
    };
  },
  methods: {
    handleOffer() {
      this.$store.dispatch("showDialog", {
        isShow: true,
      });
    },
  },
  head() {
    return {
      title: this.page.title || "GeoWorks",
      titleTemplate: "",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.metaDescription,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.siteUrl,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.page.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.page.metaDescription,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: this.$config.siteUrl + "/",
        },
      ],
    };
  },
};
</script>
