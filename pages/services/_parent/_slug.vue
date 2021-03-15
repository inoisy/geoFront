<template>
  <div>
    <LazyHydrate when-idle>
      <service-header
        :breadcrumbs="breadcrumbs"
        :header="service.name"
        :subheader="service.subheader"
        :icon="icon"
        :price="service.price"
      />
    </LazyHydrate>
    <section :class="$style.section" class="sectionWrapper">
      <v-container>
        <div class="pa-3" style="min-height: 400px">
          <LazyHydrate when-visible>
            <lazy-thumbnail
              v-if="imgUrl"
              :imgUrl="thumbnailUrl"
              :alt="service.name"
              @show="showImageDialog = true"
            />
          </LazyHydrate>
          <LazyHydrate never>
            <content-wrapper :content="service.content" />
          </LazyHydrate>
        </div>
      </v-container>
    </section>
    <lazy-benefits
      v-if="benefits"
      :class="$style.section"
      class="sectionWrapper"
      :items="benefits"
    />

    <!--:key="`dynamic-${index}`" <template v-for="(item, index) in service.dynamicContent">
      <lazy-benefits
        v-if="item.__typename === 'ComponentGroupsAdvantages'"
        :class="$style.section"
        :items="item.advantage"
        :key="`dynamic-${index}`"
      />
      <lazy-steps
        v-else-if="item.__typename === 'ComponentGroupsStepsGroup'"
        :class="$style.section"
        :items="item.stepItem"
        :key="`dynamic-${index}`"
      />
    </template> -->
    <section
      :class="$style.section"
      class="sectionWrapper"
      v-if="!!service.prices"
    >
      <v-container>
        <h2 class="pageHeader mb-8 pa-3">Стоимость работ</h2>
        <lazy-prices class="pa-3" :content="service.prices" />
      </v-container>
    </section>
    <call-to-action />
    <section :class="$style.section" class="sectionWrapper">
      <v-container>
        <h2 class="pageHeader mb-12 pa-3">Смотрите также</h2>
        <LazyHydrate when-visible>
          <lazy-service-slider
            v-if="siblings.length > 4"
            :items="siblings"
            :parent-slug="parentSlug"
          />
          <lazy-service-cards
            v-else
            :items="siblings"
            :parent-slug="parentSlug"
          />
        </LazyHydrate>
      </v-container>
    </section>

    <lazy-image-dialog
      v-if="showImageDialog"
      v-bind="{
        imgUrl,
        imgWidth,
        imgHeight,
        alt: service.name,
        show: showImageDialog,
      }"
      @close="showImageDialog = false"
    />
    <!-- :img="imgUrl"
      imgWidth:0,
      imgHeight:0
      :alt="service.name"
      :show="showImageDialog" -->
  </div>
</template>

<style lang="scss" scoped module>
// .header {
//   font-size: 2.5rem;
//   font-weight: 600;
//   line-height: ;
// }
// .header {
//   // font-weight: 600;
//   // font-size: 18px;
//   // line-height: 125%;
//   // margin-bottom: 16px;
//   font-weight: 600;
//   font-size: 2.3rem;
//   line-height: 125%;

//   @include md {
//     font-size: 2.9rem;
//   }
// }
// .contentWithImgWrapper {

// }

// .othersWrapper {
//   background-color: $gray;
//   color: $black;
// }
.section {
  // padding-top: 6rem;
  // padding-bottom: 5rem;

  &:nth-child(2n + 1) {
    background-color: $gray;
    --content-color: white;
  }
}
// .section
</style>
<script>
import gql from "graphql-tag";
import LazyHydrate from "vue-lazy-hydration";
import { calculateImageUrl } from "~/utils/images";
// import CallToAction from '~/components/CallToAction.vue';
// function calculateImageUrl(img, imageBaseUrl) {
//   if (!img) {
//     return "/no-camera.svg";
//   }
//   if (img.formats && img.formats.small && img.formats.small.url) {
//     return imageBaseUrl + img.formats.small.url;
//   }
//   return imageBaseUrl + img.url;
// }

const query = gql`
  query ServicesQuery($slug: String!) {
    services(where: { slug: $slug }) {
      _id
      name
      slug
      description
      subheader
      metaDescrtiption
      content
      prices
      price
      img {
        url
        width
        height
        formats
      }
      icon {
        url
      }
      dynamicContent {
        ... on ComponentGroupsAdvantages {
          advantage {
            header
            content
            icon {
              url
            }
          }
        }
        ... on ComponentGroupsStepsGroup {
          stepItem {
            header
            content
            icon {
              url
            }
          }
        }
      }

      parent {
        name
        slug
        icon {
          url
        }
        child(where: { slug_ne: $slug }) {
          name
          slug
          description
          img {
            url
            formats
          }
        }
        dynamicContent {
          ... on ComponentGroupsAdvantages {
            advantage {
              header
              content
              icon {
                url
              }
            }
          }
        }
      }
      child {
        name
        slug
        description
        img {
          url
        }
      }
    }
  }
`;
// console.log("🚀 ~ file: _slug.vue ~ line 91 ~ query", query);

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
    $config,
  }) {
    const {
      data: { services },
    } = await apolloClient.query({
      variables: {
        slug: params.slug,
      },
      query,
    });
    // if(!data)
    if (!services || !services.length) {
      return error({
        statusCode: 404,
        message: "Информацию не удалось получить",
      });
    }
    const [
      {
        parent: [parentData],
        img,
        icon,
        dynamicContent,
        ...service
      },
    ] = services;
    // console.log("🚀 ~ file: _slug.vue ~ line 243 ~ service", parentData);
    let benefits;
    benefits = dynamicContent.find(
      (item) => item.__typename === "ComponentGroupsAdvantages"
    );
    if (!benefits) {
      benefits = parentData.dynamicContent.find(
        (item) => item.__typename === "ComponentGroupsAdvantages"
      );
    }
    if (!benefits) {
      const {
        data: {
          mainPage: { benefits: mainPageBenefits },
        },
      } = await apolloClient.query({
        query: gql`
          {
            mainPage {
              benefits {
                header
                content
                icon {
                  url
                }
              }
              # steps {
              #   header
              #   content
              #   icon {
              #     url
              #   }
              #   order
              # }
            }
          }
        `,
      });
      benefits = mainPageBenefits;
    }
    // console.log("🚀 ~ file: _slug.vue ~ line 254 ~ benefits", benefits);
    let iconFind;
    if (icon) {
      iconFind = icon;
    } else {
      iconFind = parentData.icon;
    }
    // const siblings = ;

    // const service = service;
    // const breadcrumbs = ;

    // const siblings = siblings;
    // const isTooManyChilds = ;
    const parentSlug = parentData.slug;
    let thumbnailUrl, imgUrl, imgWidth, imgHeight;
    if (img) {
      thumbnailUrl = calculateImageUrl(img, $config.imageBaseUrl);
      imgUrl = $config.imageBaseUrl + img.url;
      imgWidth = img.width;
      imgHeight = img.height;
    }
    return {
      service,

      parentSlug,

      thumbnailUrl,
      imgUrl,
      imgWidth,
      imgHeight,
      benefits,
      icon: iconFind,
      // isTooManyChilds: siblings.length > 4,
      siblings: parentData.child.reduce((acc, sibling) => {
        const { img, ...siblingData } = sibling;
        acc.push({
          ...siblingData,
          img: calculateImageUrl(img, $config.imageBaseUrl),
        });
        return acc;
      }, []),
      breadcrumbs: [
        {
          text: "Главная",
          to: "/",
        },
        {
          text: "Услуги",
          to: "/services",
        },
        {
          text: parentData.name,
          to: `/services/${parentData.slug}`,
        },
        {
          text: service.name,
        },
      ],
    };
    // isTooManyChilds() {
    //   return this.child.length > 5;
    // },
    // breadcrumbs() {
    // const base = [
    //   {
    //     text: "Главная",
    //     to: "/",
    //   },
    //   {
    //     text: "Услуги",
    //     to: "/services",
    //   },
    // ];
    //   if (this.parentSlug) {
    //     base.push({
    //       text: this.service.parent[0].name,
    //       to: `/services/${this.parentSlug}`,
    //     });
    //   }
    //   base.push({
    //     text: this.service.name,
    //     to: this.service.slug,
    //   });
    //   return base;
    // },
    // this.parentSlug = service.parent[0].slug;
    // return {
    //   service: service,
    //   parentSlug: service.parent[0].slug,
    // };
    // } catch (err) {
    //   console.log("🚀 ~ file: _slug.vue ~ line 195 ~ fetch ~ err", err);

    // return this.$nuxt.error({
    //   statusCode: 404,
    //   message: "Информацию не удалось получить",
    // });
    // }
    // if (isLoading) {
    //   this.$nuxt.$loading.finish();
    // }
    // console.log("🚀 ~ file: _slug.vue ~ line 162 ~ asyncData ~ data", service);
    // if (!service) {
    //   return error({
    //     statusCode: 404,
    //     message: "Информацию не удалось получить",
    //   });
    // }
    // return {
    //   service: service,
    //   parentSlug: service.parent[0].slug,
    // };
  },
  data() {
    return {
      showImageDialog: false,
      service: {},
      breadcrumbs: [],
      parentSlug: "",
      siblings: [],
      isTooManyChilds: false,
      thumbnailUrl: "",
      imgUrl: "",
      imgWidth: 0,
      imgHeight: 0,
    };
  },

  // computed: {
  // child() {
  //   return this.service.parent[0].child;
  //   // .filter(
  //   //   (item) => item.slug !== this.service.slug
  //   // );
  // },
  // parentSlug() {
  //   if (this.service.parent && this.service.parent.length) {
  //     return this.service.parent[0].slug;
  //   } else {
  //     return "";
  //   }
  // },
  // breadcrumbs() {
  //   const base = [
  //     {
  //       text: "Главная",
  //       to: "/",
  //     },
  //     {
  //       text: "Услуги",
  //       to: "/services",
  //     },
  //   ];
  //   if (this.parentSlug) {
  //     base.push({
  //       text: this.service.parent[0].name,
  //       to: `/services/${this.parentSlug}`,
  //     });
  //   }
  //   base.push({
  //     text: this.service.name,
  //     to: this.service.slug,
  //   });
  //   return base;
  // },
  // isTooManyChilds() {
  //   return this.child.length > 5;
  // },
  // },
  // mounted() {
  //   console.log(this.service);
  // },
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
