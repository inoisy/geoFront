<template>
    <div>
        <LazyHydrate when-visible>
            <section
                :class="$style.firstSection"
                :style="`background-image: url(${require('~/assets/bg1.jpg')})`"
            >
                <v-container
                    :class="$style.firstSectionInner"
                    fill-height
                    class="py-12"
                >
                    <v-row justify="center"
                           align="center"
                           no-gutters
                    >
                        <v-col class="pa-3"
                               cols="12"
                               sm="10"
                               md="10"
                               lg="7"
                        >
                            <h1 :class="$style.header" class="mb-5 text-center">
                                {{ page.header }}
                            </h1>
                            <p :class="$style.subheader" class="text-center mb-6">
                                {{ page.subheader }}
                            </p>
                            <v-btn
                                class="callToActionButton mx-auto d-flex"
                                outlined
                                dark
                                @click="handleOffer(false)"
                            >
                                Оставить заявку
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </section>
        </LazyHydrate>
        <LazyHydrate when-visible>
            <section>
                <v-container style="position: relative;">
                    <v-row
                        justify="center"
                        align="center"
                        :class="$style.serviceCardWrapper"
                        no-gutters
                    >
                        <v-col
                            v-for="(service, i) in services"
                            :key="`service-card-${i}`"
                            class="mb-3 pa-3"
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
                                        contain
                                        class="d-block mx-auto"
                                        width="55px"
                                        height="55px"
                                    />
                                </div>
                                <h2 :class="$style.serviceCardHeader" class="mb-2">
                                    {{ service.name }}
                                </h2>
                                <div :class="$style.serviceCardDescription">
                                    {{ service.description }}
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </section>
        </LazyHydrate>
        <LazyHydrate
            v-for="(service, i) in services"
            :key="`service-${i}`"
            when-visible
        >
            <service-feature
                :class="$style.section"
                class="sectionWrapper"
                :header="service.header"
                :content="service.content"
                :img-url="service.img"
                :slug="`/services/${service.slug}`"
                :name="service.name"
            />
        </LazyHydrate>
        <LazyHydrate when-visible>
            <steps
                :class="$style.section"
                class="sectionWrapper mt-12"
                :items="page.steps"
            />
        </LazyHydrate>
        <LazyHydrate when-visible>
            <benefits
                :class="$style.section"
                class="sectionWrapper"
                :items="page.benefits"
            />
        </LazyHydrate>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import LazyHydrate from 'vue-lazy-hydration';
import { calculateImageUrl } from '~/utils/images';

export default {
    components: {
        LazyHydrate,
    },
    async asyncData({ app, error }) {
        const {
            data: { services, mainPage },
        } = await app.apolloProvider.defaultClient.query({
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
        if (!mainPage || !services) {
            return error({
                statusCode: 404,
                message: 'Информацию не удалось получить',
            });
        }
        const servicesData = services.reduce((acc, service) => {
            acc.push({
                header: service.info.header,
                content: service.info.content,
                slug: service.slug,
                name: service.name,
                img: calculateImageUrl(service.info.img),
                icon: service.icon,
                description: service.description,
            });
            return acc;
        }, []);
        return {
            page: mainPage,
            services: servicesData,
        };
    },
    head() {
        return {
            title: this.page.title || 'GeoWorks',
            titleTemplate: '',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.page.metaDescription,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: this.$config.siteUrl,
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: this.page.title,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: this.page.metaDescription,
                },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: this.$config.siteUrl,
                },
            ],
        };
    },
    methods: {
        handleOffer() {
            this.$store.dispatch('showDialog', {
                isShow: true,
            });
        },
    },
};
</script>

<style lang="scss" module>
    .section {
        &:nth-child(2n) {
            background-color: $gray;

            --content-color: white;
        }
    }

    .firstSection {
        height: 610px;
        max-height: calc(100vh - var(--toolbar-height));
        background-color: #161616;
        background-position: 80%;
        background-repeat: no-repeat;
        background-size: cover;
        color: $white;

        .firstSectionInner {
            min-height: inherit;
        }

        @include sm {
            background-position: 70%;
        }

        @include md {
            background-position: center;
        }
    }

    .header {
        font-size: 2rem;
        line-height: 125%;

        @include sm {
            font-size: 36px;
        }

        @include lg {
            font-size: 48px;
        }
    }

    .subheader {
        font-size: 1rem;

        @include sm {
            font-size: 18px;
        }
    }

    .serviceCardWrapper {
        margin-top: -50px;
    }

    .serviceCard {
        box-sizing: inherit;
        display: flex;
        align-items: center;
        width: 100%;
        border-radius: 8px;
        text-align: center;
        color: #18191f;
        transition-duration: .6s;
        transition-property: all;
        transition-timing-function: ease;
        flex-direction: column;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, .24) !important;

        &:hover {
            transform: translateY(-5px);
            transform-origin: center;
            box-shadow: 4px 4px 25px 4px rgba(0, 0, 0, .25) !important;
        }

        .serviceImgWrapper {
            min-height: 80px;
        }

        .serviceCardHeader {
            text-transform: uppercase;
            font-size: 22px;
            font-weight: 600;
            color: #18191f;
        }

        .serviceCardDescription {
            margin: 0;
            font-size: 12px;
            font-weight: normal;
            font-weight: 300;
            line-height: 150%;
            color: #18191f;
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

</style>
