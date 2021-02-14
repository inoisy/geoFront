<template>
  <div>
    <LazyHydrate when-idle>
      <service-header
        :breadcrumbs="breadcrumbs"
        :header="service.name"
        :subheader="service.subheader"
        :icon="service.icon"
      ></service-header>
    </LazyHydrate>
    <section class="white">
      <v-container grid-list-lg class="pt-14 pb-12">
        <v-row>
          <v-col cols="12">
            <LazyHydrate when-visible>
              <mobile-aside-menu
                :services="service.child"
                :slug="service.slug"
              />
            </LazyHydrate>
            <LazyHydrate when-visible>
              <desktop-aside-menu
                :services="service.child"
                :slug="service.slug"
              />
            </LazyHydrate>
            <LazyHydrate never>
              <content-wrapper :content="service.content" />
            </LazyHydrate>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <LazyHydrate
      v-for="(service, i) in service.child"
      :key="`service-${i}`"
      when-visible
    >
      <service-feature
        :header="service.name"
        :content="service.description"
        :img="service.img"
        :slug="`/services/${service.parent[0].slug}/${service.slug}`"
        :is-with-gray="true"
        :name="service.name"
      />
    </LazyHydrate>
  </div>
</template>

<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";
// import ServiceHeader from "~/components/ServiceHeader.vue";
// import ServiceFeature from "~/components/ServiceFeature.vue";
// import MobileAsideMenu from "~/components/MobileAsideMenu.vue";
// import DesktopAsideMenu from "~/components/DesktopAsideMenu.vue";
// import ContentWrapper from "~/components/ContentWrapper.vue";

export default {
  components: {
    LazyHydrate,
    // ServiceHeader,
    // ServiceFeature,
    // MobileAsideMenu,
    // DesktopAsideMenu,
    // ContentWrapper,
  },
  async asyncData({ params, app, error }) {
    // const client = ;
    const {
      data: { services },
    } = await app.apolloProvider.defaultClient.query({
      variables: {
        slug: params.parent,
      },
      query: gql`
        query ServiceQuery($slug: String!) {
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
                formats
              }
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
    return {
      service: services[0], //Object.freeze(services[0]),
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
  head() {
    return {
      title: this.service.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.service.metaDescrtiption,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.$config.siteUrl + this.$route.path,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.service.name,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.service.metaDescrtiption,
        },
      ],
      link: [
        {
          rel: "canonical",
          href: `${this.$config.siteUrl}/services/${this.service.name}`,
        },
      ],
    };
  },
};
</script>
