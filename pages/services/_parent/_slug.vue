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
          <!-- {{ service }} -->
          <v-col :class="$style.contentWithImgWrapper">
            <v-card
              v-if="service.img"
              :class="$style.imgWrapper"
              hover
              @click="showDialog = true"
            >
              <thumbnail :img="service.img" :alt="service.name" />
            </v-card>
            <div v-html="service.content"></div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section :class="$style.othersWrapper">
      <v-container grid-list-lg style="padding-top: 6rem; padding-bottom: 6rem">
        <h2 class="mb-8" style="font-size: 2.5rem; font-weight: 600">
          Смотрите также
        </h2>
        <v-row v-if="!isTooManyChilds">
          <v-col
            v-for="child in child"
            :key="child.id"
            cols="12"
            :sm="isFewChilds ? 12 : 6"
            :md="isFewChilds ? 6 : 4"
          >
            <service-card
              :item="child"
              :parent-slug="service.parent[0].slug"
            ></service-card>
          </v-col>
        </v-row>
        <v-slide-group v-else>
          <template v-slot:next>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="v-icon__svg"
            >
              <path
                fill="currentColor"
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
              ></path>
            </svg>
          </template>
          <template v-slot:prev>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="img"
              aria-hidden="true"
              class="v-icon__svg"
            >
              <path
                fill="currentColor"
                d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
              ></path>
            </svg>
          </template>
          <!-- {{ service }} -->
          <v-slide-item v-for="child in child" :key="child.id">
            <div class="pa-3" style="width: 350px">
              <service-card
                :item="child"
                :parent-slug="service.parent[0].slug"
              ></service-card>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-container>
    </section>
    <v-dialog v-if="service.img" v-model="showDialog">
      <v-card :class="$style.dialogImgWrapper">
        <div>
          <v-img
            :class="$style.dialogImg"
            :src="imageBaseUrl + service.img.url"
            :alt="service.name"
            :contain="true"
          />
        </div>

        <v-btn
          class="close-btn"
          fab
          outlined
          style="position: absolute; top: 16px; right: 16px; z-index: 10"
          @click="showDialog = false"
        >
          <svg-icon name="close" style="width: 24px; height: 24px" />
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped module>
.dialogImgWrapper {
  .dialogImg {
    max-height: calc(100vh - 64px);
    @include md {
      max-height: calc(90vh - 24px);
    }
  }
}
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
.carouselItem {
  height: 100%;
}
</style>
<script>
import gql from "graphql-tag";
import Thumbnail from "~/components/Thumbnail.vue";

export default {
  components: { Thumbnail },
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
      slide: "",
      imageBaseUrl: this.$config.imageBaseUrl,
      showDialog: false,
    };
  },

  computed: {
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
      if (this.service && this.service.parent && this.service.parent.length) {
        base.push({
          text: this.service.parent[0].name,
          to: `/services/${this.service.parent[0].slug}`,
        });
      }
      base.push({
        text: this.service.name,
        to: this.service.slug,
      });
      return base;
    },
    isFewChilds() {
      return this.child.length < 3;
    },
    isTooManyChilds() {
      return this.child.length > 6;
    },
  },
  methods: {
    handleOffer() {
      // TODO
      return true;
    },
  },
  head() {
    return {
      title: this.service.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.service.metaDescription,
        },
      ],
    };
  },
};
</script>
