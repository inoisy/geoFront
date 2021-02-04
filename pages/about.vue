<template>
  <div>
    <LazyHydrate when-idle>
      <default-header :header="title" :breadcrumbs="breadcrumbs" />
    </LazyHydrate>
    <section class="white black--text">
      <v-container grid-list-lg>
        <v-row class="py-12">
          <!-- {{ page }} -->
          <v-col cols="12">
            <LazyHydrate never>
              <content-wrapper :content="page.content" />
            </LazyHydrate>
          </v-col>
          <!-- <v-col cols="12" v-html="page.content"> </v-col> -->
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
</style>
<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";

// import DefaultHeader from "~/components/DefaultHeader.vue";

const title = "О компании";
export default {
  components: { LazyHydrate },
  async asyncData(ctx) {
    const client = ctx.app.apolloProvider.defaultClient;
    const { data } = await client.query({
      query: gql`
        {
          aboutPage {
            metaDescription
            content
          }
        }
      `,
    });
    if (!data.aboutPage) {
      return ctx.error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }

    return {
      page: data.aboutPage,
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
  // methods: {
  //   handleOffer() {
  //     return true;
  //   },
  // },
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
