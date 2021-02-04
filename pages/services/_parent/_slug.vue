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
      <v-container class="pt-14 pb-12" grid-list-lg>
        <v-row>
          <v-col :class="$style.contentWithImgWrapper">
            <v-card
              v-if="service.img"
              :class="$style.imgWrapper"
              hover
              @click="showDialog = true"
            >
              <LazyHydrate when-visible>
                <thumbnail :img="service.img" :alt="service.name" />
              </LazyHydrate>
            </v-card>
            <LazyHydrate never>
              <content-wrapper :content="service.content" />
            </LazyHydrate>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section :class="$style.othersWrapper">
      <v-container grid-list-lg style="padding-top: 6rem; padding-bottom: 6rem">
        <h2 class="mb-8" style="font-size: 2.5rem; font-weight: 600">
          Смотрите также
        </h2>
        <LazyHydrate when-visible>
          <lazy-service-slider
            v-if="isTooManyChilds"
            :items="child"
            :slug="parentSlug"
          />
          <lazy-service-cards v-else :items="child" :slug="parentSlug" />
        </LazyHydrate>
      </v-container>
    </section>
    <lazy-image-dialog
      v-if="showDialog"
      :img="service.img.url"
      :alt="service.name"
      :show="showDialog"
      @close="showDialog = false"
    />
  </div>
</template>

<style lang="scss" scoped module>
.contentWithImgWrapper {
  .imgWrapper {
    width: 100%;
    float: right;
    display: inline-flex;
    margin-bottom: 2rem;
    @include sm {
      width: 250px;
      margin-left: 1rem;
      margin-bottom: 1rem;
    }
    @include md {
      width: 350px;
    }
    @include lg {
      width: 400px;
    }
  }
}

.othersWrapper {
  background-color: $gray;
  color: $black;
}
</style>
<script>
import gql from "graphql-tag";
// import {
//   hydrateOnInteraction,
//   hydrateNever,
//   hydrateWhenIdle,
//   hydrateWhenVisible,
// } from "vue-lazy-hydration";
import LazyHydrate from "vue-lazy-hydration";
// import ContentWrapper from "~/components/ContentWrapper.vue";
// import ServiceHeader from "~/components/ServiceHeader.vue";
// import Thumbnail from "~/components/Thumbnail.vue";

export default {
  components: {
    LazyHydrate,

    // ContentWrapper: hydrateNever(() =>
    //   import("~/components/ContentWrapper.vue")
    // ),
    // ServiceHeader: hydrateWhenIdle(() =>
    //   import("~/components/ServiceHeader.vue")
    // ),
    // Thumbnail: hydrateWhenVisible(() => import("~/components/Thumbnail.vue")),
    // ImageDialog: hydrateOnInteraction(() =>
    //   import("~/components/ImageDialog.vue")
    // ),
    // ServiceCards: hydrateWhenVisible(() =>
    //   import("~/components/ServiceCards.vue")
    // ),
    // ServiceSlider: hydrateWhenVisible(() =>
    //   import("~/components/ServiceSlider.vue")
    // ),
  },
  async asyncData({ params, app, error }) {
    const client = app.apolloProvider.defaultClient;
    const { data } = await client.query({
      variables: {
        slug: params.slug,
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
            img {
              url
              formats
            }
            icon {
              url
            }
            parent {
              id
              name
              slug
              child {
                id
                name
                slug
                description
                img {
                  url
                  formats
                }
              }
            }
            child {
              id
              name
              slug
              description
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
      child: data.services[0].parent[0].child.filter(
        (item) => item.slug !== data.services[0].slug
      ),
    };
  },
  data() {
    return {
      showDialog: false,
    };
  },

  computed: {
    parentSlug() {
      if (this.service && this.service.parent && this.service.parent.length) {
        return this.service.parent[0].slug;
      } else {
        return "";
      }
    },
    breadcrumbs() {
      const base = [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Услуги",
          to: "/services",
        },
      ];
      if (this.parentSlug) {
        base.push({
          text: this.service.parent[0].name,
          to: `/services/${this.parentSlug}`,
        });
      }
      base.push({
        text: this.service.name,
        to: this.service.slug,
      });
      return base;
    },
    isTooManyChilds() {
      return this.child.length > 5;
    },
    // componentName() {
    //   return this.child.length > 5 ? "ServiceSlider" : "ServiceCards";
    // },
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
          href: `${this.$config.siteUrl}/services/${this.parentSlug}/${this.service.slug}`,
        },
      ],
    };
  },
};
</script>
