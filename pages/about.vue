<template>
  <div>
    <LazyHydrate when-idle>
      <default-header :header="title" :breadcrumbs="breadcrumbs" />
    </LazyHydrate>
    <section class="white black--text">
      <v-container class="sectionWrapper">
        <v-row no-gutters>
          <v-col class="pa-3" cols="12">
            <LazyHydrate never>
              <content-wrapper :content="page.content" />
            </LazyHydrate>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";

const title = "О компании";
export default {
  components: { LazyHydrate },
  async asyncData({ app, error }) {
    const {
      data: { aboutPage },
    } = await app.apolloProvider.defaultClient.query({
      query: gql`
        {
          aboutPage {
            metaDescription
            content
          }
        }
      `,
    });
    if (!aboutPage) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }

    return {
      page: aboutPage,
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
          to: "/about",
        },
      ],
    };
  },
  head() {
    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.metaDescription || "О компании - GeoWorks",
        },
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
        {
          hid: "og:description",
          property: "og:description",
          content: this.page.metaDescription || "О компании - GeoWorks",
        },
      ],
      link: [
        {
          rel: "canonical",
          href: this.$config.siteUrl + "/about",
        },
      ],
    };
  },
};
</script>
