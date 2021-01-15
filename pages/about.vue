<template>
  <div>
    <default-header
      header="О КОМПАНИИ"
      :breadcrumbs="breadcrumbs"
    ></default-header>
    <section class="white black--text">
      <v-container grid-list-lg>
        <v-row class="py-12">
          <!-- {{ page }} -->
          <v-col cols="12" v-html="page.content"> </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<style lang="scss" scoped module>
</style>
<script>
import gql from "graphql-tag";
export default {
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
      imageBaseUrl: this.$config.imageBaseUrl,
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "О компании",
          to: "/about",
        },
      ],
    };
  },
  methods: {
    handleOffer() {
      return true;
    },
  },
  head() {
    return {
      title: "О компании",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.page.metaDescription || "О компании - GeoWorks",
        },
      ],
    };
  },
};
</script>
