<template>
    <div>
        <LazyHydrate when-idle>
            <ServiceHeader
                :breadcrumbs="breadcrumbs"
                :header="service.name"
                :subheader="service.subheader"
                :icon="icon"
                :price="service.price"
            />
        </LazyHydrate>
        <section :class="$style.section" class="sectionWrapper">
            <VContainer>
                <div class="pa-3" style="min-height: 400px;">
                    <LazyHydrate when-visible>
                        <LazyThumbnail
                            v-if="imgUrl"
                            :img-url="thumbnailUrl"
                            :alt="service.name"
                            @show="handleImageDialog"
                        />
                    </LazyHydrate>
                    <ContentWrapper><div v-html="service.content"/></ContentWrapper>
                </div>
            </VContainer>
        </section>
        <LazyBenefits
            v-if="benefits"
            id="benefits"
            :class="$style.section"
            class="sectionWrapper"
            :items="benefits"
        />
        <section
            v-if="!!pricesFind"
            id="prices"
            :class="$style.section"
            class="sectionWrapper"
        >
            <VContainer>
                <h2 class="pageHeader mb-8 pa-3">Стоимость работ</h2>
                <LazyPrices class="pa-3">
                    <div v-html="pricesFind"/>
                </LazyPrices>
            </VContainer>
        </section>
        <CallToAction />
        <section :class="$style.section" class="sectionWrapper">
            <VContainer>
                <h2 class="pageHeader mb-12 pa-3">Смотрите также</h2>
                <LazyHydrate when-visible>
                    <LazyServiceSlider
                        v-if="siblings.length > 4"
                        :items="siblings"
                        :parent-slug="parentSlug"
                    />
                    <LazyServiceCards
                        v-else
                        :items="siblings"
                        :parent-slug="parentSlug"
                    />
                </LazyHydrate>
            </VContainer>
        </section>

        <LazyImageDialog
            v-if="showImageDialog"
            v-bind="{
                imgUrl,
                imgWidth,
                imgHeight,
                alt: service.name,
                show: showImageDialog,
            }"
            @close="showImageDialog = false"
            @loaded="loadingEnd"
        />

    </div>
</template>


<script>
import gql from 'graphql-tag';
import LazyHydrate from 'vue-lazy-hydration';
import { calculateImageUrl } from '~/utils/images';

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
        prices
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
            fetchPolicy: 'no-cache',
        });
        if (!services || !services.length) {
            return error({
                statusCode: 404,
                message: 'Информацию не удалось получить',
            });
        }
        const [
            {
                parent: [parentData],
                img,
                icon,
                dynamicContent,
                prices,
                ...service
            },
        ] = services;
        let benefits;
        const advantagesObject = dynamicContent.find(item => item.__typename === 'ComponentGroupsAdvantages');
        if (advantagesObject && advantagesObject.advantage.length > 3) {
            benefits = advantagesObject.advantage;
        }

        if (!benefits) {
            const advantagesObject = parentData.dynamicContent.find(item => item.__typename === 'ComponentGroupsAdvantages');
            if (advantagesObject && advantagesObject.advantage.length > 3) {
                benefits = advantagesObject.advantage;
            }
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
        let iconFind;
        if (icon) {
            iconFind = icon;
        } else {
            iconFind = parentData.icon;
        }
        let pricesFind;
        if (prices) {
            pricesFind = prices;
        } else {
            pricesFind = parentData.prices;
        }
        const parentSlug = parentData.slug;
        let thumbnailUrl; let imgUrl; let imgWidth; let imgHeight;
        if (img) {
            thumbnailUrl = calculateImageUrl(img, $config.imageBaseUrl);
            imgUrl = $config.imageBaseUrl + img.url;
            imgWidth = img.width;
            imgHeight = img.height;
        }
        return {
            service,
            pricesFind,
            parentSlug,

            thumbnailUrl,
            imgUrl,
            imgWidth,
            imgHeight,
            benefits,
            icon: iconFind,
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
                    text: 'Главная',
                    to: '/',
                },
                {
                    text: 'Услуги',
                    to: '/services',
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
    },
    data() {
        return {
            showImageDialog: false,
            service: {},
            breadcrumbs: [],
            parentSlug: '',
            siblings: [],
            isTooManyChilds: false,
            thumbnailUrl: '',
            imgUrl: '',
            imgWidth: 0,
            imgHeight: 0,
        };
    },
    head() {
        return {
            title: this.service.name,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.service.metaDescrtiption,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: this.$config.siteUrl + this.$route.path,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.service.name,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.service.metaDescrtiption,
                },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `${this.$config.siteUrl}/services/${this.parentSlug}/${this.service.slug}`,
                },
            ],
        };
    },
    methods: {
        handleImageDialog() {
            this.loadingStart();
            this.showImageDialog = true;
        },
        loadingStart() {
            if (!process.client) {
                return;
            }
            this.$nuxt.$loading.start();
        },
        loadingEnd() {
            if (!process.client) {
                return;
            }
            this.$nuxt.$loading.finish();
        },
    },
};
</script>
<style lang="scss" module>
    .section {
        &:nth-child(2n + 1) {
            background-color: $gray;

            --content-color: white;
        }
    }
</style>
